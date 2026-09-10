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
  function sumHTML(values) {
    const width=Math.max(...values.map(n=>String(n).length));
    return `<pre class="vertical-sum" role="img" aria-label="${esc(values.join(' plus '))}">${String(values[0]).padStart(width+2)}\n+ ${String(values[1]).padStart(width)}<span class="sum-rule" aria-hidden="true"></span></pre>`;
  }
  function worksheetHTML(q) {
    return `${q.calculation?sumHTML(q.calculation):''}<button type="button" class="worksheet-open">✏️ Open my worksheet</button>
      <dialog class="worksheet-dialog" aria-labelledby="worksheet-title"><h2 id="worksheet-title">My scratch worksheet</h2><p>Write with your finger, pen or mouse. Work it out here, then enter your answer.</p>
      <canvas class="scratch-canvas" width="600" height="480" aria-label="Scratch paper for working out this question. You can type notes below instead."></canvas>
      <div class="worksheet-tools"><button type="button" class="scratch-undo">↶ Undo</button><button type="button" class="scratch-clear">Clear writing</button></div>
      <details><summary>⌨️ Type notes instead</summary><label for="scratch-notes">My working notes</label><textarea id="scratch-notes" rows="2" maxlength="2000"></textarea></details>
      <button type="button" class="worksheet-close" autofocus>Back to my answer</button></dialog>`;
  }
  function bindWorksheet(app,q) {
    const dialog=app.querySelector('.worksheet-dialog'),canvas=dialog.querySelector('canvas'),ctx=canvas.getContext('2d');
    const strokes=[];let active=null;
    const redraw=()=>{
      ctx.lineCap='butt';ctx.lineJoin='miter';ctx.clearRect(0,0,600,480);ctx.fillStyle='#fff';ctx.fillRect(0,0,600,480);
      ctx.strokeStyle='#e4eaf1';ctx.lineWidth=1;
      for(let x=20;x<600;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,480);ctx.stroke();}
      for(let y=20;y<480;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(600,y);ctx.stroke();}
      if(q.calculation){
        ctx.fillStyle='#243548';ctx.font='38px monospace';ctx.textAlign='center';
        q.calculation.forEach((n,row)=>[...String(n)].reverse().forEach((digit,i)=>ctx.fillText(digit,340-i*40,96+row*60)));
        const width=Math.max(...q.calculation.map(n=>String(n).length));ctx.fillText('+',340-width*40,156);
        ctx.strokeStyle='#243548';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(320-width*40,174);ctx.lineTo(365,174);ctx.stroke();
      }
      ctx.strokeStyle='#2054a0';ctx.fillStyle='#2054a0';ctx.lineWidth=5;ctx.lineCap='round';ctx.lineJoin='round';
      for(const points of strokes){ctx.beginPath();ctx.arc(points[0][0],points[0][1],1.5,0,2*Math.PI);ctx.fill();ctx.beginPath();ctx.moveTo(...points[0]);points.slice(1).forEach(p=>ctx.lineTo(...p));ctx.stroke();}
      dialog.querySelector('.scratch-undo').disabled=!strokes.length;
    };
    const point=e=>{const r=canvas.getBoundingClientRect();return [(e.clientX-r.left)*600/r.width,(e.clientY-r.top)*480/r.height];};
    canvas.onpointerdown=e=>{if(active!==null)return;e.preventDefault();active=e.pointerId;canvas.setPointerCapture(active);strokes.push([point(e)]);redraw();};
    canvas.onpointermove=e=>{if(e.pointerId!==active)return;strokes[strokes.length-1].push(point(e));redraw();};
    canvas.onpointerup=canvas.onpointercancel=canvas.onlostpointercapture=e=>{if(e.pointerId===active)active=null;};
    dialog.querySelector('.scratch-undo').onclick=()=>{strokes.pop();redraw();};
    dialog.querySelector('.scratch-clear').onclick=()=>{strokes.length=0;dialog.querySelector('textarea').value='';redraw();};
    app.querySelector('.worksheet-open').onclick=()=>dialog.showModal();
    dialog.querySelector('.worksheet-close').onclick=()=>dialog.close();
    dialog.onclose=()=>{active=null;const answer=app.querySelector('#written-answer:not(:disabled),.choice:not(:disabled)');(answer||app.querySelector('.worksheet-open'))?.focus();};
    redraw();
  }
  window.REVIEWER_ACTIVITIES={visual,placeHTML,bindPlace,reflectHTML,bindReflect,unlockAP,sumHTML,worksheetHTML,bindWorksheet};
})();
