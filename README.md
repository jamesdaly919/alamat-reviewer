# Alamat’s Reviewer

Interactive Grade 2 practice in English, Filipino, Christian Living, Araling Panlipunan, Math and Science. Plain HTML/CSS/JavaScript; no production build step.

## Study modes

- Choose a subject and topic. Pick a 10-question round or all questions in that topic.
- Each subject has a 20-question mock exam spread across all scored topics.
- Multiple choice, true/false, numerical entry, ordered tiles and map placement give immediate explanations.
- **Practise my mistakes** revisits missed questions without replacing topic best scores.
- CL/AP writing and drawing have examples and a guide for a grown-up’s review. Many answers are possible; these activities are unscored and excluded from mock exams.
- AP English help is absent from the question UI until an answer is submitted. Afterwards, underlined words become tappable and a full English explanation is available. The next question starts locked again. This is a study aid, not a secure exam: the static bank is available in page source.
- Best scores remain in the existing `alamat-reviewer` localStorage key on that device/browser. Drawings and written reflections stay in the current activity; they are not uploaded or retained after navigation.

The September expansion adds **235 questions and activities**: CL 46, AP 46, Math 83, Science 60. Existing English and Filipino banks are retained. See [SOURCE_NOTES.md](SOURCE_NOTES.md) for coverage and editorial decisions.

## Run, check and deploy

```sh
python -m http.server 8123
node tests/content.cjs
python build.py
```

Open `http://localhost:8123`. The optional bundler creates `dist/reviewer.html` with all subjects and activities inlined. Fonts may require a connection; system fonts are the fallback.

`tests/browser.cjs` uses Playwright and installed Chrome. With Playwright in Node’s module path, run `node tests/browser.cjs` while the server runs. `REVIEWER_URL` selects another base URL; `CDP_URL` can attach to an isolated agent-browser session. Tests create their own browser context, separate from real study progress.

Vercel serves this repo directly with preset **Other**. Pushes to the linked production branch redeploy it. No translation API, API keys or backend are required.

## Files

| File | Purpose |
| --- | --- |
| `app.js` | Navigation, rounds, scoring, speech and progress |
| `styles.css` | Responsive light/dark interface |
| `data/manifest.js` | Subject loading order |
| `data/activities.js` | Diagrams, map placement, drawing and AP help |
| `data/*-1t.js` | Subject banks |
| `data/illustrations.js` | Existing SVG pictures |
| `tests/content.cjs` | Content invariants, school-key checks, arithmetic and rulers |
| `tests/browser.cjs` | Answer paths, translation gating, scoring and layouts |

To add a subject, add its entry to `SUBJECTS` in `app.js`, list its data file in the manifest and add its colors in CSS. Module registration assigns question IDs from module, topic and item position.
