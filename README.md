# Alamat’s Reviewer

Interactive Grade 2 practice in English, Filipino, Christian Living, Araling Panlipunan, Math and Science. Plain HTML/CSS/JavaScript; no production build step.

## Study modes

- Choose a subject and topic for a 10-question quest. Previously unselected questions are drawn first; rotation history persists on this device.
- Each subject has a 20-question mock exam spread across all scored topics.
- Multiple choice, true/false, numerical entry, ordered tiles and map placement give immediate explanations.
- Math sums use vertically aligned numbers. **Open my worksheet** provides scratch paper with the problem, finger/pen/mouse writing, Undo, Clear and optional typed notes. Work stays when reopening the same question and resets on the next question.
- **Practise my mistakes** revisits missed questions without replacing topic best scores.
- CL/AP writing and drawing have examples and a guide for a grown-up’s review. Many answers are possible; these activities are unscored and excluded from mock exams.
- AP English help is absent from the question UI until an answer is submitted. Afterwards, underlined words become tappable and a full English explanation is available. The next question starts locked again. This is a study aid, not a secure exam: the static bank is available in page source.
- Best scores remain in the existing `alamat-reviewer` localStorage key on that device/browser. Drawings and written reflections stay in the current activity; they are not uploaded or retained after navigation.

The September 10 update contains **1,219 questions and activities across 38 topics**: English 305, Filipino 213, CL 126, AP 152, Math 233, Science 190. Every topic has at least 20 items. Multiple-choice positions are shuffled each round and retry; reviewed wrong-answer pools supply 3–4 choices where the task allows it. Genuine two-way distinctions such as a/an remain binary, and true/false button positions also shuffle. See [SOURCE_NOTES.md](SOURCE_NOTES.md) for coverage and editorial decisions.

## Run, check and deploy

```sh
python -m http.server 8123
node tests/content.cjs
node tests/worksheet.cjs
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
| `data/*-1t.js` | Source-based subject banks |
| `data/expansion.js`, `data/fact-expansion.js` | Reviewed extra questions and scenarios |
| `data/true-false.js` | Authored true/false statements and explanations |
| `data/option-pools.js` | Additional reviewed distractors and AP vocabulary |
| `data/practice.js` | Rotation, option sampling and shuffling |
| `data/illustrations.js` | Existing SVG pictures |
| `tests/content.cjs` | Content invariants, school-key checks, arithmetic and rulers |
| `tests/browser.cjs` | Answer paths, translation gating, scoring and layouts |

To add a subject, add its entry to `SUBJECTS` in `app.js`, list its data file in the manifest and add its colors in CSS. Module registration assigns question IDs from module, topic and item position.
