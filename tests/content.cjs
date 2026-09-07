const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
const modules = [];
const context = vm.createContext({ window: {}, REVIEWER: { register: m => modules.push(m) } });
vm.runInContext(fs.readFileSync(path.join(root,'data/manifest.js'),'utf8'),context);
for (const f of context.window.REVIEWER_MANIFEST) vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),context,{filename:f});
assert.equal(modules.length,6);
const newModules=modules.filter(m=>['cl','ap','math','science'].includes(m.subject));
let count=0, diagrams=0, generatedSums=0;
for(const m of newModules){
  const ids=new Set(), prompts=new Set();
  for(const t of m.topics){
    assert(!ids.has(t.id),'Duplicate topic '+t.id);ids.add(t.id);
    assert(t.questions.length>0);
    for(const q of t.questions){
      count++; const label=`${m.id}/${t.id}: ${q.q}`;
      const signature=JSON.stringify([q.q,q.visual||null,q.passage||null]);
      assert(!prompts.has(signature),'Duplicate prompt and visual '+label);prompts.add(signature);
      assert(q.q && (q.why || q.type==='reflect'), 'Missing explanation '+label);
      assert(['mc','tf','input','build','place','reflect'].includes(q.type));
      if(q.type==='mc'){
        assert(Number.isInteger(q.answer) && q.answer>=0 && q.answer<q.choices.length,label);
        assert.equal(new Set(q.choices.map(c=>c.trim().toLowerCase())).size,q.choices.length,'Duplicate options '+label);
      }
      if(q.type==='tf')assert.equal(typeof q.answer,'boolean',label);
      if(q.type==='input')assert(String(q.answer).trim(),label);
      if(q.type==='build'){
        const result=q.answer.split(q.join===undefined?' ':q.join).sort();
        assert.equal(JSON.stringify(result),JSON.stringify([...q.tiles].sort()),'Unbuildable '+label);
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
        assert.equal(Number(q.answer),Number(answer),'Wrong sum '+label);generatedSums++;
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
console.log(`PASS: ${count} new items, ${diagrams} diagrams, ${generatedSums} sums, source-key checks and content invariants.`);
