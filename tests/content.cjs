const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
const modules = [];
const context = vm.createContext({ window: {}, REVIEWER: { register: m => {
  context.window.REVIEWER_EXPAND(m);
  m.topics.forEach(t=>t.questions.forEach((q,i)=>q.id=`${m.id}/${t.id}/${i+1}`));
  modules.push(m);
} } });
for(const f of ['practice','expansion','fact-expansion','option-pools','true-false'])vm.runInContext(fs.readFileSync(path.join(root,`data/${f}.js`),'utf8'),context);
vm.runInContext('let seed=74261; Math.random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296)',context);
vm.runInContext(fs.readFileSync(path.join(root,'data/manifest.js'),'utf8'),context);
for (const f of context.window.REVIEWER_MANIFEST) vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),context,{filename:f});
assert.equal(modules.length,6);
const newModules=modules;
let count=0, diagrams=0, generatedSums=0;
for(const m of newModules){
  const ids=new Set(), prompts=new Set();
  for(const t of m.topics){
    assert(!ids.has(t.id),'Duplicate topic '+t.id);ids.add(t.id);
    assert(t.questions.length>=20,`Small bank ${m.id}/${t.id}`);
    let seen=[];
    const first=context.window.REVIEWER_PRACTICE.draw(t.questions,10,seen);
    const second=context.window.REVIEWER_PRACTICE.draw(t.questions,10,first.seen);
    assert.equal(first.questions.length,10);assert.equal(second.questions.length,10);
    assert.equal(new Set([...first.questions,...second.questions].map(q=>q.id)).size,20,'Repeated question before unseen bank is exhausted');
    for(let round=0;round<12;round++){
      const draw=context.window.REVIEWER_PRACTICE.draw(t.questions,10,seen);seen=draw.seen;
      assert.equal(new Set(draw.questions.map(q=>q.id)).size,10,'Duplicate within round');
    }
    for(const q of t.questions){
      count++; const label=`${m.id}/${t.id}: ${q.q}`;
      const signature=JSON.stringify([q.q,q.visual||null,q.passage||null,q.choices||null]);
      assert(!prompts.has(signature),'Duplicate prompt and visual '+label);prompts.add(signature);
      assert(q.q && (q.why || q.type==='reflect'), 'Missing explanation '+label);
      assert(['mc','tf','input','build','place','reflect'].includes(q.type));
      if(q.type==='mc'){
        assert(Number.isInteger(q.answer) && q.answer>=0 && q.answer<q.choices.length,label);
        assert.equal(new Set(q.choices.map(c=>c.trim())).size,q.choices.length,'Duplicate options '+label);
        const before=JSON.stringify(q),correct=q.choices[q.answer],positions=new Set(),options=new Set();
        let prepared=q;
        for(let i=0;i<160;i++){
          prepared=context.window.REVIEWER_PRACTICE.prepare(prepared); // Include repeated retries.
          assert.equal(prepared.choices[prepared.answer],correct,'Shuffle changed correct answer '+label);
          assert.equal(prepared.choices.filter(c=>c===correct).length,1);
          assert.equal(new Set(prepared.choices).size,prepared.choices.length);
          assert(prepared.choices.length>=2&&prepared.choices.length<=4);
          positions.add(prepared.answer);prepared.choices.forEach(c=>options.add(c));
        }
        assert(positions.size>=2,'Answer stuck in one position '+label);
        assert.equal(options.size,new Set(q.choices.concat(q.distractors||[])).size,'Retry lost an option from the pool '+label);
        assert.equal(JSON.stringify(q),before,'Canonical question mutated '+label);
      }
      if(q.type==='tf'){
        assert.equal(typeof q.answer,'boolean',label);
        assert(!/is this|would this|is the proposed|tama ba|mabuti bang|\?\s*$|\bis correct\b/i.test(q.q),'Use a statement, not a question-and-answer wrapper: '+label);
      }
      if(q.type==='input')assert(String(q.answer).trim(),label);
      if(q.type==='build'){
        const join=q.join===undefined?' ':q.join;
        const possible=(remaining,tiles)=>tiles.some((tile,i)=>remaining===tile || remaining.startsWith(tile+join)&&possible(remaining.slice(tile.length+join.length),tiles.filter((_,j)=>j!==i)));
        for(const answer of [q.answer,...(q.alt||[])])assert(possible(answer,q.tiles),'Unbuildable '+label);
      }
      if(q.type==='place'){
        assert.equal(new Set(q.pieces.map(p=>p.at)).size,q.pieces.length,label);
        q.pieces.forEach(p=>assert(['Hilaga','Timog','Silangan','Kanluran'].includes(p.at),label));
      }
      if(q.type==='reflect')assert(q.example && q.rubric.length>=2,label);
      if(m.subject==='ap')assert(q.en && q.whyEn,'Missing English explanation '+label);
      if(q.visual){diagrams++;if(q.visual.kind==='ruler'){
        const length=q.visual.end-(q.visual.start||0), unit=q.visual.unit==='cm'?'centimeters':'inches';
        const correct=q.choices[q.answer].replace(/\bcm\b/,'centimeters');
        assert.equal(correct,`${length} ${unit}`,'Wrong ruler answer '+label);
      }}
      if(q.calculation){
        // Independent column addition oracle including carried tens/hundreds.
        const a=String(q.calculation[0]).padStart(3,'0'),b=String(q.calculation[1]).padStart(3,'0');
        let carry=0, answer='';for(let i=2;i>=0;i--){const n=Number(a[i])+Number(b[i])+carry;answer=String(n%10)+answer;carry=n>=10?1:0;}if(carry)answer='1'+answer;
        assert.equal(Number(q.type==='mc'?q.choices[q.answer]:q.answer),Number(answer),'Wrong sum '+label);generatedSums++;
      }
    }
  }
  console.log(`${m.title}: ${m.topics.reduce((n,t)=>n+t.questions.length,0)} questions/activities across ${m.topics.length} topics`);
}
// Independent checks transcribed from the school Math answer key and photographed quizzes.
const math=modules.find(m=>m.subject==='math');
const all=math.topics.flatMap(t=>t.questions);
for(const [prompt,expected] of [
  ['Write four hundred twenty-six in figures.','426'],
  ['What is the VALUE of the digit 7 in 574?','70'],
  ['What is 432 + 215?','647'],
  ['Ana saved ₱275 and her brother saved ₱158. How many pesos did they save in all?','433'],
  ['The class gave ₱265 last week and ₱178 this week. Its target is ₱500. How many MORE pesos are needed?','57'],
  ['Which number has a tens digit with a VALUE of 30?','435'],
  ['Lara celebrated her 16th birthday two years ago. Which birthday will she celebrate this year?','18th'],
]) {const q=all.find(q=>q.q===prompt);assert(q,prompt);assert.equal(q.type==='mc'?q.choices[q.answer]:q.answer,expected,prompt);}
// Independent visual answer oracles: count the actual depicted objects.
for(const q of all){
 const correct=q.type==='mc'?q.choices[q.answer]:q.answer;
 if(q.visual?.kind==='blocks')assert.equal(Number(correct),q.visual.values.reduce((n,v,i)=>n+v*[100,10,1][i],0));
 if(q.visual?.kind==='money')assert.equal(Number(correct),q.visual.notes.reduce((a,b)=>a+b,0));
 if(q.visual?.kind==='line'){
   const position=Number(q.q.match(/(\d+)(?:st|nd|rd|th)/)[1]);
   assert.equal(correct.toLowerCase(),q.visual.items[position-1][1]);
 }
}
const activitySource=fs.readFileSync(path.join(root,'data/activities.js'),'utf8');
assert(!activitySource.includes('${i+1}'),'Numbered animal labels returned');
assert(!activitySource.includes('${v.values[i]} ${label'),'Block count labels returned');
console.log(`PASS: ${count} items, ${diagrams} diagrams, ${generatedSums} sums; every topic >=20; rotation, sampled options, retries, visual answers and source-key checks.`);
let rewritten=0;
for(const [subject,topics,length] of [
 ['cl',['baptism','jesus-prayer','kindness','creation'],8],
 ['science',['process','classify','properties','changes'],10],
 ['science',['care'],8],
 ['ap',['community','institutions','helpers','care'],8],
])for(const topic of topics){
 const statements=Array.from({length},(_,i)=>context.window.REVIEWER_STATEMENT(subject,topic,i));
 assert.equal(statements.filter(q=>q.answer).length,length/2,'Unbalanced authored statements '+subject+'/'+topic);
 for(const q of statements){assert(q.q.endsWith('.'),'Statement must be a complete sentence');assert(q.why.length>20,'Explain the fact or misconception');}
 rewritten+=length;
}
console.log(`PASS: ${rewritten} authored replacements with balanced truth values; ${modules.flatMap(m=>m.topics.flatMap(t=>t.questions)).filter(q=>q.type==='tf').length} total true/false statements checked.`);
