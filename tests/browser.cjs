/* Exhaustive tests use DOM clicks through real UI handlers in an isolated
   context. Representative flows also use Playwright clicks and drawing. */
const {chromium}=require('playwright'),assert=require('node:assert/strict');
const path=require('node:path'),fs=require('node:fs');
const base=process.env.REVIEWER_URL||'http://127.0.0.1:8123';
const out=path.resolve(__dirname,'../../source-review');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=process.env.CDP_URL?await chromium.connectOverCDP(process.env.CDP_URL):await chromium.launch({channel:'chrome',args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)errors.push(r.status()+' '+r.url());});
 const home=async()=>{await page.goto(base);await page.waitForFunction(()=>document.querySelectorAll('.subject').length===6);};
 await home();const banks=await page.evaluate(()=>REVIEWER.modules);
 assert.equal(banks.flatMap(m=>m.topics.flatMap(t=>t.questions)).length,1219);
 await page.screenshot({path:path.join(out,'sep10-home-phone.png'),fullPage:true});
 for(const module of banks){
  const count=await page.evaluate(subject=>{
   const check=(ok,msg)=>{if(!ok)throw Error(msg);},m=REVIEWER.modules.find(m=>m.subject===subject),norm=s=>s.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();let count=0;
   for(let ti=0;ti<m.topics.length;ti++){
    const t=m.topics[ti],original=t.questions;
    // Fixtures preserve the real round limit and exercise every item once.
    for(let start=0;start<original.length;start+=10){
     t.questions=original.slice(start,start+10);document.querySelector(`.subject[data-subject="${subject}"]`).click();document.querySelectorAll('.topic')[ti].click();
     check(document.querySelector('.pill').textContent===`1 / ${t.questions.length}`,'Wrong round size');
     for(let i=0;i<t.questions.length;i++){
      const id=document.querySelector('[data-question-id]').dataset.questionId,q=t.questions.find(q=>q.id===id);check(q,'Missing ID');
      if(subject==='ap')check(!document.querySelector('.translate-word,.translation-panel'),'Early translation '+id);
      if(q.type==='mc'){
       const b=[...document.querySelectorAll('.choice')].find(b=>norm(b.lastElementChild.textContent)===norm(q.choices[q.answer]));check(b,'Missing correct option '+id);b.click();
      }else if(q.type==='tf')document.querySelector(`.choice[data-k="${q.answer}"]`).click();
      else if(q.type==='input'){
       const f=document.querySelector('input');f.value=q.answer;f.dispatchEvent(new Event('input'));document.querySelector('.check-btn').click();
      }else if(q.type==='build'){
       const join=q.join===undefined?' ':q.join;
       const solve=(left,tiles)=>{for(let i=0;i<tiles.length;i++){const t=tiles[i];if(left===t.textContent)return[t];if(left.startsWith(t.textContent+join)){const r=solve(left.slice(t.textContent.length+join.length),tiles.filter((_,j)=>j!==i));if(r)return[t,...r];}}};
       const tiles=solve(q.answer,[...document.querySelectorAll('.tiles .tile')]);check(tiles,'Unbuildable '+id);tiles.forEach(t=>t.click());document.querySelector('.check-btn').click();
      }else if(q.type==='place'){
       q.pieces.forEach((p,i)=>{document.querySelector(`[data-piece="${i}"]`).click();document.querySelector(`[data-dir="${p.at}"]`).click();});document.querySelector('.check-btn').click();
      }else if(q.type==='reflect'){
       const f=document.querySelector('textarea');f.value='I can share my books with a friend.';f.dispatchEvent(new Event('input'));document.querySelector('.check-btn').click();
      }
      check(document.querySelector(q.type==='reflect'?'.feedback.neutral':'.feedback.ok'),'Correct answer rejected '+id);
      if(subject==='ap'){
       check(document.querySelector('.translation-panel')&&!document.querySelector('.translation-lock'),'Missing unlock '+id);
       const word=document.querySelector('.translate-word');check(word,'Missing word help '+id);word.click();check(document.querySelector('.word-meaning').textContent.includes('→'),'Word not translated');
      }
      check(document.documentElement.scrollWidth<=innerWidth+1,'Overflow '+id);document.querySelector('.next-btn').click();count++;
     }
     check(['100%','🌟'].includes(document.querySelector('.score').textContent),'Wrong score');document.querySelector('.home').click();
    }t.questions=original;
   }return count;
  },module.subject);console.log(`PASS all correct paths: ${module.subject} ${count}`);
 }
 for(const module of banks){
  await home();await page.evaluate(()=>localStorage.clear());const ids=[];
  for(let round=0;round<2;round++){
   if(round)await home();await page.locator(`.subject[data-subject="${module.subject}"]`).click();await page.locator('.topic').first().click();assert.equal(await page.locator('.pill').innerText(),'1 / 10');
   for(let i=0;i<10;i++){
    ids.push(await page.locator('[data-question-id]').getAttribute('data-question-id'));
    if(await page.locator('.choice').count())await page.locator('.choice').first().click();else if(await page.locator('.tiles').count()){await page.locator('.tiles .tile').first().click();await page.locator('.check-btn').click();}else{await page.fill('#written-answer','0');await page.locator('.check-btn').click();}await page.locator('.next-btn').click();
   }
  }assert.equal(new Set(ids).size,20,'Rotation failed '+module.subject);
 }
 async function fixture(subject,predicate){
  await home();const q=banks.find(m=>m.subject===subject).topics.flatMap(t=>t.questions).find(predicate);assert(q);
  await page.evaluate(({subject,q})=>{REVIEWER.modules.find(m=>m.subject===subject).topics=[{id:'test',title:'Test topic',icon:'question',questions:[q]}];},{subject,q});
  await page.locator(`.subject[data-subject="${subject}"]`).click();await page.locator('.topic').click();return q;
 }
 const positions=new Set(),sets=new Set(),q=await fixture('english',q=>q.type==='mc'&&q.choices.length>6),answer=q.choices[q.answer];
 for(let i=0;i<12;i++){
  const labels=await page.locator('.choice > span:last-child').allTextContents();positions.add(labels.indexOf(answer));sets.add(JSON.stringify([...labels].sort()));
  await page.locator('.choice').nth(labels.findIndex(t=>t!==answer)).click();assert.equal(await page.locator('.feedback.bad').count(),1);await page.locator('.next-btn').click();assert.equal(await page.locator('.score').innerText(),'0%');await page.locator('.retry').click();
 }assert(positions.size>1);assert(sets.size>1);
 const labels=await page.locator('.choice > span:last-child').allTextContents();await page.locator('.choice').nth(labels.indexOf(answer)).click();assert.equal(await page.locator('.feedback.ok').count(),1);
 await fixture('ap',q=>q.type==='mc');assert.equal(await page.locator('.translate-word').count(),0);await page.locator('.choice').first().click();await page.locator('.translate-word').first().click();await page.locator('.translation-panel summary').click();await page.screenshot({path:path.join(out,'sep10-ap-translation.png'),fullPage:true});
 await fixture('math',q=>q.visual?.kind==='line');assert.equal(await page.locator('.animal-line small').filter({hasText:/^\d+$/}).count(),0);await page.screenshot({path:path.join(out,'sep10-animals.png'),fullPage:true});
 await page.setViewportSize({width:320,height:740});assert(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)));await page.locator('.animal-line').evaluate(el=>el.scrollLeft=el.scrollWidth);assert((await page.locator('.animal-line').evaluate(el=>el.scrollLeft))>0);
 for(const [subject,kind] of [['math','blocks'],['science','ruler']]){await fixture(subject,q=>q.visual?.kind===kind);await page.screenshot({path:path.join(out,`sep10-${kind}.png`),fullPage:true});}
 await fixture('ap',q=>q.type==='place');await page.screenshot({path:path.join(out,'sep10-map-placement.png'),fullPage:true});assert.equal((await page.locator('.map-cell small').allTextContents()).filter(Boolean).join(),'Gitna');
 await fixture('cl',q=>q.type==='reflect');assert(await page.locator('.check-btn').isDisabled());await page.locator('.draw-details summary').click();const box=await page.locator('canvas').boundingBox();await page.mouse.move(box.x+20,box.y+20);await page.mouse.down();await page.mouse.move(box.x+70,box.y+60);await page.mouse.up();assert(!(await page.locator('.check-btn').isDisabled()));await page.locator('.clear-drawing').click();assert(await page.locator('.check-btn').isDisabled());await page.fill('textarea','Thank you for my family.');await page.locator('.check-btn').click();await page.locator('.next-btn').click();assert.equal(await page.locator('.score').innerText(),'🌟');
 for(const module of banks){
  await home();await page.locator(`.subject[data-subject="${module.subject}"]`).click();await page.locator('.exam-btn').click();
  const covered=await page.evaluate(()=>{
   const topics=new Set();for(let i=0;i<20;i++){
    const id=document.querySelector('[data-question-id]').dataset.questionId,q=REVIEWER.modules.flatMap(m=>m.topics.flatMap(t=>t.questions)).find(q=>q.id===id);topics.add(id.split('/')[1]);if(q.type==='reflect')throw Error('Reflection in exam');
    if(document.querySelector('.choice'))document.querySelector('.choice').click();
    else if(q.type==='input'){const el=document.querySelector('input');el.value='9999';el.dispatchEvent(new Event('input'));document.querySelector('.check-btn').click();}
    else if(q.type==='build'){document.querySelector('.tile').click();document.querySelector('.check-btn').click();}
    else if(q.type==='place'){q.pieces.forEach((p,i)=>{document.querySelector(`[data-piece="${i}"]`).click();document.querySelector(`[data-dir="${p.at}"]`).click();});document.querySelector('.check-btn').click();}
    document.querySelector('.next-btn').click();
   }return topics.size;
  });assert.equal(covered,module.topics.filter(t=>t.questions.some(q=>q.type!=='reflect')).length);
 }
 await page.emulateMedia({colorScheme:'dark'});await home();await page.screenshot({path:path.join(out,'sep10-dark-phone.png'),fullPage:true});assert.deepEqual(errors,[]);
 console.log('PASS: 1219 correct paths; persistent ten-question rotation in all subjects; randomized retries/options; AP gating; unlabelled animals/blocks/maps; drawing; mobile; mock topic coverage.');
 await context.close();await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
