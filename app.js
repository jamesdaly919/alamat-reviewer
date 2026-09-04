/* Alamat's Reviewer — engine
   Screens: home → topics → quiz → results. Data modules call REVIEWER.register(). */
(function () {
  'use strict';

  const REVIEWER = window.REVIEWER = { modules: [], register(m) { this.modules.push(m); } };
  const SUBJECTS = {
    english:  { label: 'English',  letter: 'E', lang: 'en-US', ui: { correct: 'Correct!', wrong: 'Not quite.', next: 'Next', finish: 'See my score', check: 'Check', hint: 'Tap the tiles in order', tf: ['True', 'False'], read: 'Read to me', mc: 'Multiple choice', tfl: 'True or false', build: 'Build it', practice: 'Practice', exam: 'Mock exam', qs: 'questions' } },
    filipino: { label: 'Filipino', letter: 'F', lang: 'fil-PH', ui: { correct: 'Tama!', wrong: 'Hindi tama.', next: 'Susunod', finish: 'Tingnan ang iskor', check: 'Suriin', hint: 'Pindutin ang mga tile sa tamang ayos', tf: ['Tama', 'Mali'], read: 'Basahin', mc: 'Pagpipilian', tfl: 'Tama o Mali', build: 'Buuin', practice: 'Pagsasanay', exam: 'Pagsubok', qs: 'tanong' } },
  };
  const PRAISE = ['Galing!', 'Great job!', 'Ang galing mo!', 'Awesome!', 'Super!', 'Magaling!', 'You got it!', 'Wow!'];
  const ENCOURAGE = ['Keep going!', 'Kaya mo yan!', 'Almost!', 'Try the next one!', 'Good try!'];
  const PRACTICE_SIZE = 10, EXAM_SIZE = 20;

  const app = document.getElementById('app');
  let state = { screen: 'home' };

  /* ---------- storage (best scores per topic) ---------- */
  const store = {
    get() { try { return JSON.parse(localStorage.getItem('alamat-reviewer') || '{}'); } catch (e) { return {}; } },
    set(o) { try { localStorage.setItem('alamat-reviewer', JSON.stringify(o)); } catch (e) {} },
    best(key) { return this.get()[key] || 0; },
    save(key, pct) { const o = this.get(); if (pct > (o[key] || 0)) { o[key] = pct; this.set(o); } },
  };

  /* ---------- helpers ---------- */
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const rich = s => esc(s).replace(/&lt;u&gt;/g, '<u>').replace(/&lt;\/u&gt;/g, '</u>').replace(/\n/g, '<br>').replace(/_{3,}/g, '<span class="blank"></span>');
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const stars = pct => pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0;
  const starHtml = n => `<span class="stars">${[1, 2, 3].map(i => `<span class="${i <= n ? 'on' : 'off'}">★</span>`).join('')}</span>`;
  const art = q => q.art && window.REVIEWER_ART && window.REVIEWER_ART[q.art] ? window.REVIEWER_ART[q.art] : (q.emoji ? `<span>${q.emoji}</span>` : '');
  const iconFor = t => (window.REVIEWER_ART && window.REVIEWER_ART[t.icon]) || window.REVIEWER_ART.question;
  const norm = s => s.replace(/\s+/g, ' ').trim().toLowerCase();

  function speak(text, lang) {
    try {
      if (!('speechSynthesis' in window)) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.replace(/<[^>]+>/g, '').replace(/_{2,}/g, 'blank'));
      u.lang = lang; u.rate = 0.9;
      const v = speechSynthesis.getVoices().find(v => v.lang.replace('_', '-').toLowerCase().startsWith(lang.slice(0, 2)));
      if (v) u.voice = v;
      speechSynthesis.speak(u);
    } catch (e) {}
  }

  function topicKey(mod, topic) { return `${mod.id}/${topic.id}`; }

  /* ---------- screens ---------- */
  function render() {
    window.scrollTo(0, 0);
    if (state.screen === 'home') renderHome();
    else if (state.screen === 'topics') renderTopics();
    else if (state.screen === 'quiz') renderQuestion();
    else if (state.screen === 'results') renderResults();
  }

  function renderHome() {
    const mods = REVIEWER.modules;
    let totalQ = 0, totalStars = 0, maxStars = 0;
    mods.forEach(m => m.topics.forEach(t => { totalQ += t.questions.length; totalStars += stars(store.best(topicKey(m, t))); maxStars += 3; }));
    app.innerHTML = `
      <section class="screen">
        <div class="hero">
          <div class="mascot">${window.REVIEWER_ART.star}</div>
          <div><h1>Alamat's Reviewer</h1><p>LSGH · Grade 2 · Let's practice!</p></div>
        </div>
        <div class="subjects">
          ${mods.map((m, i) => {
            const s = SUBJECTS[m.subject] || SUBJECTS.english;
            const got = m.topics.reduce((a, t) => a + stars(store.best(topicKey(m, t))), 0);
            return `<button class="subject" data-subject="${m.subject}" data-i="${i}">
              <div class="badge">${s.letter}</div>
              <div><h2>${esc(m.title)}</h2><div class="meta">${esc(m.subtitle || '')} · ${m.topics.length} topics · ${starHtml(Math.round(got / m.topics.length))}</div></div>
              <div class="arrow">›</div></button>`;
          }).join('')}
        </div>
        <div class="totals">
          <div class="total"><b>${totalQ}</b><span>questions</span></div>
          <div class="total"><b>${totalStars} / ${maxStars}</b><span>stars earned</span></div>
        </div>
        <p class="footer-note">Tip: add this page to the Home Screen for a full-screen app.</p>
      </section>`;
    app.querySelectorAll('.subject').forEach(b => b.onclick = () => { state = { screen: 'topics', mod: mods[+b.dataset.i] }; render(); });
  }

  function renderTopics() {
    const m = state.mod, s = SUBJECTS[m.subject] || SUBJECTS.english;
    app.innerHTML = `
      <section class="screen">
        <div class="topbar"><button class="back" aria-label="Back">‹</button><div class="title">${esc(m.title)} <span style="color:var(--ink-2);font-weight:500">· ${esc(m.subtitle || '')}</span></div></div>
        <div class="topics">
          ${m.topics.map((t, i) => {
            const best = store.best(topicKey(m, t));
            return `<button class="topic" data-i="${i}">
              <div class="icon">${iconFor(t)}</div>
              <div><h3>${esc(t.title)}</h3><div class="meta">${t.questions.length} ${s.ui.qs} · ${starHtml(stars(best))}</div></div>
              <div class="best">${best ? best + '%' : ''}</div></button>`;
          }).join('')}
        </div>
        <button class="exam-btn" data-subject="${m.subject}">🎯 ${s.ui.exam} · ${Math.min(EXAM_SIZE, m.topics.reduce((a, t) => a + t.questions.length, 0))} ${s.ui.qs}</button>
      </section>`;
    app.querySelector('.back').onclick = () => { state = { screen: 'home' }; render(); };
    app.querySelectorAll('.topic').forEach(b => b.onclick = () => startQuiz(m, m.topics[+b.dataset.i]));
    app.querySelector('.exam-btn').onclick = () => startQuiz(m, null);
  }

  function startQuiz(mod, topic) {
    let qs;
    if (topic) qs = shuffle(topic.questions).slice(0, PRACTICE_SIZE).map(q => ({ q, topic }));
    else {
      // mock exam: spread across topics, then shuffle
      const per = Math.ceil(EXAM_SIZE / mod.topics.length);
      qs = shuffle(mod.topics.flatMap(t => shuffle(t.questions).slice(0, per).map(q => ({ q, topic: t })))).slice(0, EXAM_SIZE);
    }
    state = { screen: 'quiz', mod, topic, items: qs, i: 0, answers: [], streak: 0, bestStreak: 0 };
    render();
  }

  function renderQuestion() {
    const { mod, topic, items, i } = state, s = SUBJECTS[mod.subject] || SUBJECTS.english, ui = s.ui;
    const it = items[i], q = it.q;
    const typeLabel = q.type === 'mc' ? ui.mc : q.type === 'tf' ? ui.tfl : ui.build;
    const showIntro = topic && i === 0 && topic.intro;
    let body = '';
    if (q.type === 'mc') {
      body = `<div class="choices">${q.choices.map((c, k) => `<button class="choice" data-k="${k}"><span class="key">${String.fromCharCode(65 + k)}</span><span>${rich(c)}</span></button>`).join('')}</div>`;
    } else if (q.type === 'tf') {
      body = `<div class="choices tf"><button class="choice" data-k="true">✅ ${ui.tf[0]}</button><button class="choice" data-k="false">❌ ${ui.tf[1]}</button></div>`;
    } else {
      const tiles = shuffle(q.tiles.map((t, k) => ({ t, k })));
      body = `<div class="answer-row" data-hint="${esc(ui.hint)}"></div>
              <div class="tiles">${tiles.map(o => `<button class="tile" data-k="${o.k}">${esc(o.t)}</button>`).join('')}</div>
              <button class="check-btn" disabled>${ui.check}</button>`;
    }
    app.innerHTML = `
      <section class="screen">
        <div class="topbar"><button class="back" aria-label="Quit">✕</button><div class="title">${esc(topic ? topic.title : ui.exam)}</div><div class="pill">${i + 1} / ${items.length}</div></div>
        <div class="progress"><i style="width:${(i / items.length) * 100}%"></i></div>
        ${showIntro ? `<div class="intro"><span class="bulb">💡</span><span>${esc(topic.intro)}</span></div>` : ''}
        <div class="card">
          <div class="qhead">
            ${art(q) ? `<div class="qart">${art(q)}</div>` : ''}
            <div style="flex:1;min-width:0">
              <span class="qtype">${typeLabel}${!topic ? ' · ' + esc(it.topic.title) : ''}</span>
              ${q.passage ? `<div class="passage">${rich(q.passage)}</div>` : ''}
              <p class="qtext">${rich(q.q)}</p>
              <button class="speak">🔊 ${ui.read}</button>
            </div>
          </div>
          ${body}
          <div class="fb-slot"></div>
        </div>
        ${state.streak >= 2 ? `<div class="streak">🔥 ${state.streak} in a row</div>` : ''}
      </section>`;
    app.querySelector('.back').onclick = () => { if (confirm('Quit this quiz?')) { state = { screen: 'topics', mod }; render(); } };
    app.querySelector('.speak').onclick = () => speak((q.passage ? q.passage + '. ' : '') + q.q + (q.type === 'mc' ? '. ' + q.choices.join('. ') : ''), s.lang);

    if (q.type === 'mc') {
      app.querySelectorAll('.choice').forEach(b => b.onclick = () => {
        const k = +b.dataset.k, ok = k === q.answer;
        app.querySelectorAll('.choice').forEach(c => { c.disabled = true; if (+c.dataset.k === q.answer) c.classList.add('correct'); });
        if (!ok) b.classList.add('wrong');
        finish(ok, q.choices[q.answer]);
      });
    } else if (q.type === 'tf') {
      app.querySelectorAll('.choice').forEach(b => b.onclick = () => {
        const v = b.dataset.k === 'true', ok = v === q.answer;
        app.querySelectorAll('.choice').forEach(c => { c.disabled = true; if ((c.dataset.k === 'true') === q.answer) c.classList.add('correct'); });
        if (!ok) b.classList.add('wrong');
        finish(ok, q.answer ? ui.tf[0] : ui.tf[1]);
      });
    } else {
      const row = app.querySelector('.answer-row'), check = app.querySelector('.check-btn'), join = q.join === undefined ? ' ' : q.join;
      const placed = [];
      const sync = () => { check.disabled = placed.length === 0; };
      app.querySelectorAll('.tiles .tile').forEach(b => b.onclick = () => {
        if (b.classList.contains('used') || row.classList.contains('done')) return;
        b.classList.add('used'); placed.push(b);
        const t = document.createElement('button'); t.className = 'tile'; t.textContent = b.textContent; t.dataset.k = b.dataset.k;
        t.onclick = () => { if (row.classList.contains('done')) return; t.remove(); b.classList.remove('used'); placed.splice(placed.indexOf(b), 1); sync(); };
        row.appendChild(t); sync();
      });
      check.onclick = () => {
        const got = placed.map(b => b.textContent).join(join);
        const accepted = [q.answer].concat(q.alt || []).map(norm);
        const ok = accepted.includes(norm(got));
        row.classList.add('done', ok ? 'correct' : 'wrong'); check.remove();
        finish(ok, q.answer);
      };
    }

    function finish(ok, correctText) {
      state.answers.push({ q, topic: it.topic, ok, correctText });
      state.streak = ok ? state.streak + 1 : 0; state.bestStreak = Math.max(state.bestStreak, state.streak);
      const last = i === items.length - 1;
      app.querySelector('.fb-slot').innerHTML = `
        <div class="feedback ${ok ? 'ok' : 'bad'}">
          <div class="face">${ok ? pick(['🎉', '⭐', '🌟', '👏', '🏆']) : '🤔'}</div>
          <div><b>${ok ? ui.correct + ' ' + pick(PRAISE) : ui.wrong + ' ' + pick(ENCOURAGE)}</b>
            ${!ok ? `<p>✅ ${rich(correctText)}</p>` : ''}
            ${q.why ? `<p>${rich(q.why)}</p>` : ''}</div>
        </div>
        <button class="next-btn">${last ? ui.finish : ui.next + ' →'}</button>`;
      const st = app.querySelector('.streak'); if (st) st.remove();
      if (ok && state.streak >= 2) app.querySelector('.screen').insertAdjacentHTML('beforeend', `<div class="streak">🔥 ${state.streak} in a row</div>`);
      const nb = app.querySelector('.next-btn');
      nb.onclick = () => { if (last) { state.screen = 'results'; } else { state.i++; } render(); };
      nb.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  function renderResults() {
    const { mod, topic, answers } = state, s = SUBJECTS[mod.subject] || SUBJECTS.english;
    const right = answers.filter(a => a.ok).length, pct = Math.round((right / answers.length) * 100), n = stars(pct);
    if (topic) store.save(topicKey(mod, topic), pct);
    else { // exam: credit each topic touched with its own %
      const by = {}; answers.forEach(a => { const k = topicKey(mod, a.topic); by[k] = by[k] || [0, 0]; by[k][1]++; if (a.ok) by[k][0]++; });
      Object.keys(by).forEach(k => store.save(k, Math.round((by[k][0] / by[k][1]) * 100)));
    }
    const msg = pct === 100 ? 'Perfect! Wala kang mali!' : pct >= 90 ? 'Excellent! Handa ka na!' : pct >= 70 ? 'Very good! Konting practice pa.' : pct >= 50 ? 'Good start. Ulitin natin!' : 'Practice makes perfect. Try again!';
    const missed = answers.filter(a => !a.ok);
    app.innerHTML = `
      <section class="screen">
        <div class="card result">
          <div class="big-stars">${[1, 2, 3].map(k => `<span style="color:${k <= n ? 'var(--sun)' : 'var(--line)'}">★</span>`).join('')}</div>
          <h2>${esc(msg)}</h2>
          <div class="score">${pct}%</div>
          <p>${right} / ${answers.length} correct${state.bestStreak >= 3 ? ` · 🔥 best streak ${state.bestStreak}` : ''}</p>
          <div class="result-actions">
            <button class="btn primary again">🔁 ${topic ? 'Play again' : 'New ' + s.ui.exam.toLowerCase()}</button>
            <button class="btn ghost topics">📚 ${esc(mod.title)} topics</button>
            <button class="btn ghost home">🏠 Home</button>
          </div>
        </div>
        ${missed.length ? `<div class="review"><h3>Let's look at these again 🔎</h3>${missed.map(a => `<div class="item"><b>${rich(a.q.q)}</b><span class="a">✅ ${rich(a.correctText)}</span>${a.q.why ? `<div>${rich(a.q.why)}</div>` : ''}</div>`).join('')}</div>` : ''}
      </section>`;
    app.querySelector('.again').onclick = () => startQuiz(mod, topic);
    app.querySelector('.topics').onclick = () => { state = { screen: 'topics', mod }; render(); };
    app.querySelector('.home').onclick = () => { state = { screen: 'home' }; render(); };
    if (pct >= 80) confetti();
  }

  /* ---------- confetti ---------- */
  function confetti() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = document.createElement('canvas'); c.className = 'confetti'; document.body.appendChild(c);
    const ctx = c.getContext('2d'); c.width = innerWidth; c.height = innerHeight;
    const colors = ['#FFC93C', '#1B7F4E', '#2F6FDB', '#E4572E', '#E75A7C', '#FFFFFF'];
    const ps = Array.from({ length: 120 }, () => ({ x: Math.random() * c.width, y: -20 - Math.random() * c.height * .5, r: 4 + Math.random() * 6, vy: 2 + Math.random() * 3, vx: -1.5 + Math.random() * 3, rot: Math.random() * 6, col: pick(colors) }));
    let t = 0;
    (function frame() {
      ctx.clearRect(0, 0, c.width, c.height);
      ps.forEach(p => { p.y += p.vy; p.x += p.vx; p.rot += .1; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.col; ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * .6); ctx.restore(); });
      if (++t < 220) requestAnimationFrame(frame); else c.remove();
    })();
  }

  /* ---------- boot: load modules from manifest (or use bundled) ---------- */
  function boot() {
    if (!REVIEWER.modules.length) { app.innerHTML = '<p style="padding:40px;text-align:center">No reviewer modules loaded. Check data/manifest.js.</p>'; return; }
    render();
  }
  function loadScripts(list, done) {
    let n = 0; if (!list.length) return done();
    list.forEach(src => { const s = document.createElement('script'); s.src = src; s.onload = s.onerror = () => { if (++n === list.length) done(); }; document.head.appendChild(s); });
  }
  if (window.REVIEWER_BUNDLED) { document.addEventListener('DOMContentLoaded', boot); if (document.readyState !== 'loading') boot(); }
  else loadScripts(['data/illustrations.js', 'data/manifest.js'], () => loadScripts(window.REVIEWER_MANIFEST || [], boot));
})();
