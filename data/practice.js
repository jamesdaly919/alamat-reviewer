/* Pure practice helpers: rotate unseen questions and sample vetted options. */
(function(){
  const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  function prepare(q){
    if(q.type==='tf')return {...q,order:shuffle([true,false])};
    if(q.type!=='mc')return {...q};
    const correct=q.choices[q.answer];
    const wrong=[...new Set(q.choices.filter((_,i)=>i!==q.answer).concat(q.distractors||[],q.wrongPool||[]))].filter(c=>c!==correct);
    // Binary grammar distinctions remain binary. Never invent filler choices.
    const n=wrong.length<2?2:wrong.length===2?3:(Math.random()<.5?3:4);
    const choices=shuffle([correct,...shuffle(wrong).slice(0,n-1)]);
    return {...q,choices,answer:choices.indexOf(correct),wrongPool:wrong};
  }
  function draw(questions,size,seen=[]){
    const valid=new Set(questions.map(q=>q.id));seen=seen.filter(id=>valid.has(id));
    const fresh=shuffle(questions.filter(q=>!seen.includes(q.id)));
    let selected=fresh.slice(0,size),next=seen.concat(selected.map(q=>q.id));
    if(selected.length<size){
      const picked=new Set(selected.map(q=>q.id));
      const refill=shuffle(questions.filter(q=>!picked.has(q.id))).slice(0,size-selected.length);
      selected=selected.concat(refill);next=selected.map(q=>q.id);
    }
    return {questions:shuffle(selected),seen:next};
  }
  window.REVIEWER_PRACTICE={prepare,draw};
})();
