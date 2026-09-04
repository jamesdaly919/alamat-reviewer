# Alamat's Reviewer

Interactive English + Filipino practice app for Alamat (LSGH Grade 2). Plain HTML/CSS/JS — no build step, no framework. Works on iPhone/iPad Safari; add to Home Screen for a full-screen app.

## Run it

- **Vercel:** import this repo → Framework preset "Other" → deploy. Nothing else to configure.
- **Locally:** `python3 -m http.server 8000` in this folder, open http://localhost:8000
- **Single file:** `python3 build.py` → `dist/reviewer.html` (everything inlined; can be AirDropped or opened directly).

## Folder layout

```
index.html            app shell (fonts, meta, loads app.js)
styles.css            design tokens + components (light/dark)
app.js                engine: screens, scoring, tiles, speech, confetti
data/manifest.js      WHICH reviewer modules to load (one line per file)
data/illustrations.js small SVG pictures, keyed by name
data/english-1t.js    English 2 · 1st Trimester question bank
data/filipino-1t.js   Filipino 2 · Unang Trimester question bank
build.py              optional single-file bundler
```

## Adding a new reviewer (new trimester / new subject)

1. Copy `data/english-1t.js` → `data/english-2t.js` (or `science-1t.js`, etc.).
2. Change `id`, `title`, `subtitle`, and the topics/questions.
3. Add `'data/english-2t.js',` to `data/manifest.js`. Remove old lines to retire old reviewers.
4. Commit + push → Vercel redeploys.

`subject` must be `english` or `filipino` (controls colour, UI language and read-aloud voice). To add a subject, add an entry to `SUBJECTS` in `app.js`.

## Question format

```js
{ type:'mc',    q:'Which word is CVCe?', choices:['cake','cat'], answer:0, why:'…', art:'cake' }
{ type:'tf',    q:'“Sun” is a CVCe word.', answer:false, why:'…', emoji:'☀️' }
{ type:'build', q:'Build the sentence.', tiles:['The','cat','sat.'], answer:'The cat sat.', alt:['…'], why:'…' }
{ type:'build', q:'Pantigin: bundok', tiles:['bun','dok'], join:'-', answer:'bun-dok' }   // join '' or '-' for syllables
```

- `q`, `choices`, `why` accept `<u>underline</u>` and line breaks (`\n`). `______` renders as a blank.
- `art` = a key from `data/illustrations.js`; `emoji` is the quick alternative. Both optional.
- `passage` (optional) = short context shown above the question.
- Each topic: `{ id, title, icon, intro, questions:[…] }` — `intro` is the tip shown on the first question.

Practice sessions draw 10 random questions from a topic; the mock exam draws 20 spread across all topics. Best % per topic is saved on the device (localStorage) and shown as stars.
