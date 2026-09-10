/* Local, deterministic activities. No pupil responses leave this browser. */
(function () {
  'use strict';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dirs = ['Hilaga','Kanluran','Gitna','Silangan','Timog'];
  function visual(v) {
    if (v.kind === 'ruler') {
      const x = n => 25 + n * 38;
      return `<figure class="learning-visual"><svg viewBox="0 0 440 145" role="img" aria-label="${esc(`Ruler marked in ${v.unit}. Pencil begins at ${v.start || 0} and ends at ${v.end}.`)}"><rect x="15" y="65" width="410" height="75" rx="8" fill="#ffe299"/>${Array.from({length:11},(_,n)=>`<path d="M${x(n)} 65v15" stroke="#243548"/><text x="${x(n)}" y="104" text-anchor="middle" fill="#243548" font-size="22">${n}</text>`).join('')}<text x="415" y="134" text-anchor="end" fill="#243548" font-size="20">${esc(v.unit)}</text><path d="M${x(v.start || 0)} 27H${x(v.end)-16}l16 12-16 12H${x(v.start || 0)}Z" fill="#388ee3" stroke="#243548"/><path d="M${x(v.end)-16} 27l16 12-16 12Z" fill="#e4b38e"/><path d="M${x(v.end)-5} 35l5 4-5 4Z" fill="#243548"/></svg><figcaption>Read the marked ruler, not the size on your screen.</figcaption></figure>`;
    }
    if (v.kind === 'map') return `<figure class="learning-visual"><div class="map-guide">↑ Hilaga · Silangan → · ↓ Timog · ← Kanluran</div><div class="town-map">${v.cells.map(c=>`<div>${esc(c)}</div>`).join('')}</div><figcaption>${esc(v.caption || 'Mapa para sa pagsasanay')}</figcaption></figure>`;
    if (v.kind === 'blocks') return `<figure class="learning-visual"><div class="blocks">${['Hundreds','Tens','Ones'].map((label,i)=>`<div><b>${label}</b><div class="block-icons">${Array.from({length:v.values[i]},()=>`<span class="block-${i}" aria-hidden="true">${['▦','▮','▪'][i]}</span>`).join('') || '—'}</div></div>`).join('')}</div></figure>`;
    if (v.kind === 'money') return `<figure class="learning-visual"><div class="money-pile">${v.notes.map(n=>`<span class="play-money">₱${n}<small>PLAY MONEY</small></span>`).join('')}</div><figcaption>Count every bill or coin shown.</figcaption></figure>`;
    if (v.kind === 'line') return `<figure class="learning-visual"><figcaption>START → Count from left to right. Swipe to see the whole line.</figcaption><div class="animal-line" tabindex="0" aria-label="Animal line, scroll horizontally">${v.items.map(a=>`<span><b aria-hidden="true">${esc(a[0])}</b><small>${esc(a[1])}</small></span>`).join('')}</div></figure>`;
    return '';
  }
  function placeHTML(q) {
    return `<p class="activity-help">Piliin ang larawan, tapos pindutin ang lugar sa mapa. Puwedeng palitan bago suriin.</p><div class="map-pieces">${q.pieces.map((p,i)=>`<button class="map-piece" data-piece="${i}" aria-pressed="false">${esc(p.label)}</button>`).join('')}</div><div class="place-map">${dirs.map(d=>`<button class="map-cell" data-dir="${d}" aria-label="${({Hilaga:"Itaas",Timog:"Ibaba",Kanluran:"Kaliwa",Silangan:"Kanan",Gitna:"Gitna"})[d]}"><small>${d==='Gitna'?'Gitna':''}</small><span></span></button>`).join('')}</div><button class="check-btn" disabled>Suriin ang mapa</button>`;
  }
  function bindPlace(app,q,finish) {
    let selected = 0, done = false; const positions = {};
    const pieces = [...app.querySelectorAll('.map-piece')], cells=[...app.querySelectorAll('.map-cell')], check=app.querySelector('.check-btn');
    const sync=()=>{pieces.forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===selected));});cells.forEach(b=>{b.querySelector('span').textContent = q.pieces.filter((p,i)=>positions[i]===b.dataset.dir).map(p=>p.label).join(' ');});check.disabled=Object.keys(positions).length!==q.pieces.length;};
    pieces.forEach((b,i)=>b.onclick=()=>{if(done)return;selected=i;sync();});
    cells.forEach(b=>b.onclick=()=>{if(done)return;Object.keys(positions).forEach(k=>{if(positions[k]===b.dataset.dir)delete positions[k];});positions[selected]=b.dataset.dir;selected=(selected+1)%pieces.length;sync();});
    check.onclick=()=>{if(done)return;done=true;pieces.concat(cells,[check]).forEach(b=>b.disabled=true);finish(q.pieces.every((p,i)=>positions[i]===p.at),q.pieces.map(p=>`${p.label}: ${p.at}`).join('; '));};sync();
  }
  function reflectHTML(q) {
    return `<p class="activity-help">${esc(q.instructions || 'Write your own answer. You may add a drawing. There is more than one good answer.')}</p><label for="reflection">My answer / Ang sagot ko</label><textarea id="reflection" rows="4" maxlength="2000" placeholder="My ideas…"></textarea><details class="draw-details"><summary>🎨 Add a drawing / Gumuhit</summary><canvas class="drawing" width="600" height="300" aria-label="Drawing area. You may write your idea in the text box instead."></canvas><button class="clear-drawing" type="button">Clear drawing</button></details><button class="check-btn" disabled>Done · show my guide</button>`;
  }
  function bindReflect(app,q,finish) {
    const text=app.querySelector('textarea'),canvas=app.querySelector('.drawing'),ctx=canvas.getContext('2d'),check=app.querySelector('.check-btn');
    let drawing=false,marked=false,done=false;
    const sync=()=>{check.disabled=!(text.value.trim() || marked);};
    const point=e=>{const r=canvas.getBoundingClientRect();return [(e.clientX-r.left)*canvas.width/r.width,(e.clientY-r.top)*canvas.height/r.height];};
    ctx.strokeStyle='#244f8f';ctx.fillStyle='#244f8f';ctx.lineWidth=4;ctx.lineCap='round';
    canvas.onpointerdown=e=>{if(done)return;e.preventDefault();drawing=true;marked=true;canvas.setPointerCapture(e.pointerId);const [x,y]=point(e);ctx.beginPath();ctx.arc(x,y,2,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(x,y);sync();};
    canvas.onpointermove=e=>{if(!drawing||done)return;ctx.lineTo(...point(e));ctx.stroke();};
    canvas.onpointerup=canvas.onpointercancel=()=>drawing=false;
    text.oninput=sync;
    app.querySelector('.clear-drawing').onclick=()=>{if(done)return;ctx.clearRect(0,0,600,300);marked=false;sync();};
    check.onclick=()=>{if(done)return;done=true;text.readOnly=true;check.disabled=true;app.querySelector('.clear-drawing').disabled=true;finish();};
  }
  function unlockAP(app,q,glossary={}) {
    app.querySelector('.translation-lock')?.remove();
    const panel=document.createElement('section');panel.className='translation-panel';
    panel.innerHTML=`<h3>🔓 English help is ready!</h3><p>Tap an underlined word to learn its meaning.</p><div class="word-meaning" role="status" aria-live="polite">Pumili ng salita · Choose a word</div><details><summary>🌏 Understand the question in English</summary><p>${esc(q.en || '')}</p><p>${esc(q.whyEn || '')}</p></details>`;
    app.querySelector('.next-btn').before(panel);
    const dictionary={...glossary,...q.glossary};
    const lookup=word=>dictionary[word.toLocaleLowerCase('fil-PH')];
    // Replace answered choice buttons with static cards so word buttons can be used.
    app.querySelectorAll('.choice').forEach(b=>{const card=document.createElement('div');card.className=b.className+' answered-choice';card.innerHTML=b.innerHTML;b.replaceWith(card);});
    const containers=[...app.querySelectorAll('.qtext,.passage,.answered-choice,.feedback p,.activity-help')];
    const seen=new Set();
    containers.forEach(container=>{
      const walker=document.createTreeWalker(container,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
      nodes.forEach(node=>{
        const fragment=document.createDocumentFragment();
        node.textContent.split(/([\p{L}]+(?:[-’'][\p{L}]+)*)/u).forEach(word=>{
          const meaning=lookup(word);
          if(!meaning){fragment.append(document.createTextNode(word));return;}
          const b=document.createElement('button');b.className='translate-word';b.textContent=word;b.type='button';b.setAttribute('aria-label',`Translate ${word}`);
          b.onclick=()=>{panel.querySelector('.word-meaning').textContent=`${word} → ${meaning}`;panel.querySelector('.word-meaning').scrollIntoView({behavior:'smooth',block:'nearest'});};fragment.append(b);seen.add(word.toLowerCase());
        });node.replaceWith(fragment);
      });
    });
    if(!seen.size)panel.querySelector('p').textContent='Open the English explanation below.';
  }
  window.REVIEWER_ACTIVITIES={visual,placeHTML,bindPlace,reflectHTML,bindReflect,unlockAP};
})();
