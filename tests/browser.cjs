/* Run with playwright available through NODE_PATH. Optional CDP_URL attaches
   to the isolated agent-browser test profile. All writes use a fresh context. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const base = process.env.REVIEWER_URL || 'http://127.0.0.1:8123';
const out = path.resolve(__dirname,'../../source-review'); fs.mkdirSync(out,{recursive:true});
(async()=>{
  const browser=process.env.CDP_URL?await chromium.connectOverCDP(process.env.CDP_URL):await chromium.launch({channel:'chrome',args:['--no-sandbox']});
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const page=await context.newPage(); const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  await page.goto(base);await page.waitForFunction(()=>document.querySelectorAll('.subject').length===6);
  await page.screenshot({path:path.join(out,'home-phone.png'),fullPage:true});
  const counts=await page.evaluate(()=>REVIEWER.modules.map(m=>({subject:m.subject,topics:m.topics.length,count:m.topics.reduce((n,t)=>n+t.questions.length,0)})));
  let passed=0;const screenshots=new Set();
  for(const module of counts.filter(m=>['cl','ap','math','science'].includes(m.subject))){
    for(let ti=0;ti<module.topics;ti++){
      await page.locator(`.subject[data-subject="${module.subject}"]`).click();
      await page.selectOption('#round-size','all');
      const expected=await page.evaluate(({subject,ti})=>REVIEWER.modules.find(m=>m.subject===subject).topics[ti].questions.length,{subject:module.subject,ti});
      await page.locator('.topic').nth(ti).click();
      assert.equal(await page.locator('.pill').innerText(),`1 / ${expected}`);
      for(let qi=0;qi<expected;qi++){
        const q=await page.evaluate(()=>REVIEWER.modules.flatMap(m=>m.topics.flatMap(t=>t.questions)).find(q=>q.id===document.querySelector('[data-question-id]').dataset.questionId));
        assert(q,'Question ID must resolve');
        assert.equal(await page.locator('.feedback').count(),0);
        if(module.subject==='ap'){
          assert.equal(await page.locator('.translate-word,.translation-panel').count(),0,'AP English must be locked');
          assert.equal(await page.locator('.translation-lock').count(),1);
        }
        if((q.type==='place'||q.visual?.kind==='ruler'||q.visual?.kind==='blocks')&&!screenshots.has(q.type==='place'?'map':q.visual.kind)){
          const kind=q.type==='place'?'map':q.visual.kind;screenshots.add(kind);
          await page.screenshot({path:path.join(out,`${kind}-phone.png`),fullPage:true});
        }
        if(q.type==='mc')await page.locator(`.choice[data-k="${q.answer}"]`).click();
        else if(q.type==='tf')await page.locator(`.choice[data-k="${q.answer}"]`).click();
        else if(q.type==='input'){
          assert(await page.locator('.check-btn').isDisabled());
          await page.fill('#written-answer',q.answer);await page.locator('.check-btn').click();
        } else if(q.type==='build'){
          const values=q.answer.split(q.join===undefined?' ':q.join);
          for(const v of values)await page.locator('.tiles .tile:not(.used)').filter({hasText:new RegExp('^'+v.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$')}).first().click();
          await page.locator('.check-btn').click();
        } else if(q.type==='place'){
          assert(await page.locator('.check-btn').isDisabled());
          for(let i=0;i<q.pieces.length;i++){await page.locator(`[data-piece="${i}"]`).click();await page.locator(`[data-dir="${q.pieces[i].at}"]`).click();}
          await page.locator('.check-btn').click();
        } else if(q.type==='reflect'){
          assert(await page.locator('.check-btn').isDisabled());
          await page.fill('#reflection','I can share my books and help a friend learn.');await page.locator('.check-btn').click();
          assert.equal(await page.locator('.feedback.neutral').count(),1);
        }
        assert.equal(await page.locator(q.type==='reflect'?'.feedback.neutral':'.feedback.ok').count(),1,'Correct answer rejected: '+q.id);
        if(module.subject==='ap'){
          assert.equal(await page.locator('.translation-lock').count(),0);
          assert.equal(await page.locator('.translation-panel').count(),1);
          const word=page.locator('.translate-word').first();assert(await word.count(),'Missing word help '+q.id);
          await word.click();assert((await page.locator('.word-meaning').innerText()).includes('→'));
          if(!screenshots.has('translation')){screenshots.add('translation');await page.locator('.translation-panel summary').click();await page.screenshot({path:path.join(out,'ap-help-phone.png'),fullPage:true});}
        }
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
        assert(!overflow,'Horizontal overflow '+q.id);
        await page.locator('.next-btn').click();passed++;
      }
      const score=await page.locator('.score').innerText();assert(['100%','🌟'].includes(score),`Unexpected score ${score}`);
      await page.locator('.home').click();
    }
    console.log(`PASS full-topic correct paths: ${module.subject} (${module.count})`);
  }
  // Wrong answers, guarded scoring, retry only mistakes, AP reset, and coverage.
  await page.locator('.subject[data-subject="ap"]').click();await page.locator('.exam-btn').click();
  const topics=new Set();let wrong=0;
  for(let i=0;i<20;i++){
    const q=await page.evaluate(()=>REVIEWER.modules.flatMap(m=>m.topics.flatMap(t=>t.questions)).find(q=>q.id===document.querySelector('[data-question-id]').dataset.questionId));
    topics.add(q.id.split('/')[1]);assert.notEqual(q.type,'reflect');
    assert.equal(await page.locator('.translation-panel').count(),0);
    if(q.type==='mc')await page.locator(`.choice[data-k="${(q.answer+1)%q.choices.length}"]`).click();
    else {for(let j=0;j<q.pieces.length;j++){await page.locator(`[data-piece="${j}"]`).click();await page.locator(`[data-dir="${j===0?'Gitna':'Hilaga'}"]`).click();}await page.locator('.check-btn').click();}
    assert.equal(await page.locator('.feedback.bad').count(),1);wrong++;
    await page.locator('.next-btn').click();
  }
  assert.equal(topics.size,5,'Mock exam should cover every scored AP topic');
  assert.equal(await page.locator('.score').innerText(),'0%');
  await page.locator('.retry').click();assert.equal(await page.locator('.pill').innerText(),'1 / 20');
  // One-question fixtures use actual question objects with the normal navigation and engine.
  async function fixture(subject,type){
    await page.goto(base);await page.waitForSelector('.subject');
    await page.evaluate(({subject,type})=>{const m=REVIEWER.modules.find(m=>m.subject===subject);const q=m.topics.flatMap(t=>t.questions).find(q=>q.type===type);m.topics=[{id:'test',title:'Test topic',icon:'question',questions:[q]}];},{subject,type});
    await page.locator(`.subject[data-subject="${subject}"]`).click();await page.locator('.topic').click();
  }
  for(const subject of ['english','filipino'])for(const type of ['mc','tf','build']){
    await fixture(subject,type);
    if(type==='mc')await page.locator('.choice').first().click();
    else if(type==='tf')await page.locator('.choice').first().click();
    else {await page.locator('.tiles .tile').first().click();await page.locator('.check-btn').click();}
    assert.equal(await page.locator('.feedback').count(),1);await page.locator('.next-btn').click();assert.equal(await page.locator('.result').count(),1);
  }
  await fixture('math','input');await page.fill('#written-answer','99999');await page.locator('.check-btn').click();assert.equal(await page.locator('.feedback.bad').count(),1);await page.locator('.next-btn').click();assert.equal(await page.locator('.score').innerText(),'0%');
  await fixture('cl','tf');
  const ans=await page.evaluate(()=>REVIEWER.modules.find(m=>m.subject==='cl').topics[0].questions[0].answer);
  await page.locator(`.choice[data-k="${!ans}"]`).click();assert.equal(await page.locator('.feedback.bad').count(),1);
  await fixture('cl','reflect');await page.locator('.draw-details summary').click();
  const box=await page.locator('canvas.drawing').boundingBox();await page.mouse.move(box.x+20,box.y+30);await page.mouse.down();await page.mouse.move(box.x+100,box.y+80);await page.mouse.up();
  assert(!(await page.locator('.check-btn').isDisabled()));await page.locator('.clear-drawing').click();assert(await page.locator('.check-btn').isDisabled());
  await page.fill('#reflection','Thank you for my family because they care for me.');await page.locator('.check-btn').click();await page.locator('.next-btn').click();assert.equal(await page.locator('.score').innerText(),'🌟');
  assert(!(await page.locator('.result').innerText()).includes('0 / 0'));
  // Mobile width and dark mode.
  await page.setViewportSize({width:320,height:740});await page.emulateMedia({colorScheme:'dark'});
  await page.goto(base);await page.waitForSelector('.subject');assert(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)));
  await page.screenshot({path:path.join(out,'home-dark-small.png'),fullPage:true});
  assert.deepEqual(errors,[]);
  console.log(`PASS: ${passed} new question/activity correct paths; ${wrong} wrong AP answers; translation gating; mock coverage; wrong written/TF answers; retry; drawing; English/Filipino compatibility; mobile overflow and dark mode.`);
  await context.close();if(!process.env.CDP_URL)await browser.close();else browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
