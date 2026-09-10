# September 2026 reviewer expansion

The source folder was `alamat reviewer 09042026`, with CL, AP, Math, Science and Filipino & English subfolders. No nested Subjects folder was visible during this update. Coverage below is based on the materials inspected.

| Subject | Class sources | Coverage | Answer formats |
| --- | --- | --- | --- |
| CL | Activity Sheet 1, Quizzes 1 and 2, Reflection Logs 1 and 2 (IMG_5420–5434); ten Baptism screenshots | Baptism, original sin, grace, Church membership; Jesus and Mary; prayer and worship; sharing and good intentions; Kasiyana; CLAYGO; creation; thanksgiving | Multiple choice, true/false, own prayer/reflection, optional drawing |
| AP | AP2 1st Trim Reviewer Part 1 and AP2 First Trim Reviewer Part 2, including illustrated answer keys | Human communities; livelihood; Mandaluyong and LSGH; institutions and needs; workers; cardinal directions and maps; cooperation and the Lasallian mission | Multiple choice, named word banks, map placement as a digital counterpart to drawing, actual drawing and written explanation |
| Math | 1st Trim REVIEWER.pdf (20 items and answer key); Quizzes 1.1, 2 and 3 (IMG_5407–5418) | Numbers to 1,000; names, place and value, expanded form and blocks; ordinals through 20th; comparing and ordering; skip-counting by 2, 5, 10, 20, 50 and 100; pesos; addition properties, regrouping and money stories | Multiple choice as in class, plus numerical entry and ordering tiles for practice |
| Science | Science 2 Reviewer.docx (2) (1).pdf, all seven pages | Observing, inferring, predicting, classifying; rulers and units; materials; states of matter; heating/cooling; care and safety | Multiple choice including scenarios, classification and precise diagrams |

## Editorial decisions

- The AP folder JPEGs were byte-for-byte duplicates of the Math photos. They informed Math only. AP content comes from the AP PDFs.
- Source images were inspected where text extraction omitted choices, answer highlights or measurements. New ruler diagrams have exact marked endpoints and units; screen size does not change the answer.
- Fresh examples practise the same skills; not every item is a verbatim worksheet question. Extension tasks include written Math answers, an offset-ruler challenge and clearer everyday scenarios.
- Mandaluyong’s approximately 21-square-kilometer area and central NCR location are explicitly attributed to the class reviewer. Area and location are asked separately. An original item referred to an absent map; its replacement is a clear text question.
- The original AP geography-effect item used pictures with an unclear connection to its wording. That ambiguous causal comparison was not copied. Clear livelihood, place and community questions cover related ideas.
- New AP practice maps use labelled 3-by-3 diagrams. Questions specify a start point and only direct horizontal or vertical travel. They do not pretend to reproduce the worksheet’s street map.
- The source worker question showing clothing was rewritten to explicitly ask who makes/repairs clothes, so tailor is uniquely correct.
- CL’s response after the baptismal formula (“Amen”) is explicitly attributed to the classroom review, not presented as a universal liturgical instruction.
- Inferences use “probably” or “may”; clues suggest an explanation without proving it. Observations distinguish direct evidence from assumed causes.
- Science’s steam example is phrased as water vapour (gas), with an explanation that visible white mist contains tiny liquid droplets.
- Skip-counting specifies the start when needed. For example, 65 is excluded from “start at 0 and add 10”; other starting points can produce numbers ending in 5.
- Personal prayers and reflections have examples and criteria rather than exact-match grading. They are excluded from test scores, mock exams and available score stars.
- AP offers static word meanings and a full English prompt/explanation after an attempt. The next question starts locked. Proper names are generally left as names.

## Checks

`tests/content.cjs` checks answer indices, unique options, feasible tiles, map positions, bilingual explanations, arithmetic and ruler lengths. Independent school-key checks include 426, 70, 647, 433, 57, the tens value in 435 and Lara’s 18th birthday.

`tests/browser.cjs` exercises all 1,219 items through the normal UI, correct/incorrect answers, AP gating, mock coverage, unscored responses, drawing/clear, retry and existing English/Filipino modes. Screenshot checks cover phone layouts and dark mode. Original student worksheets/photos are not published.

## September 10 question audit

- Reviewed the existing six-subject banks and new templates for missing context, multiple valid answers, explanation errors, and visual answer cues. Fresh variants are practice for the listed class skills, not additional claimed worksheet transcriptions.
- Removed animal position numbers and displayed block totals. Animals stay in one scrollable left-to-right line. Map-placement cells no longer print the answer directions. Ruler labels are enlarged for phones.
- Scored question headers now use neutral subject icons. Actual evidence diagrams remain; decorative pictures no longer reveal which word or object to choose.
- Corrected the unnamed Green Garden proper-noun assumption, Miguel’s unspecified role, animal pronouns, a plural question with two valid sentences, and adjective questions that accepted subjective judgments as a single answer. Complete subject/predicate tasks explicitly request the complete phrase.
- Corrected silent-e and diphthong explanations, the bumbero vowel, missing story/image references, and explanations that referred to a fixed answer position. Constrained sentence-tile tasks where modifiers could otherwise move; accepted either parent order in the Filipino family list.
- Added varied vowel/syllable counts, reviewed rhyme distractors, exact arithmetic and ordinal variants. AP caring actions use concrete responses instead of overlapping values as competing answers. Classification pools avoid treating length and size as mutually exclusive.
- Every topic has at least 20 items. Practice draws ten and prioritizes the remaining bank; mock exams still contain twenty items covering all scored topics. Correct answers remain attached to their text when options shuffle. Retry retains the entire wrong-answer pool.
- AP vocabulary help and complete English explanations remain locked until submission, including new questions and wrong-answer feedback. Open writing/drawing stays unscored.
- Content checks exercise 160 repeated preparations per multiple-choice item, verify source-key answers and diagram arithmetic, and check bank/round sizes. Browser checks cover all correct answers, normal persistent rotation, wrong-answer retries, changing option sets, AP gating, drawing, mobile overflow and mock coverage. These checks supplement editorial review; they do not prove that every possible interpretation is unambiguous.

## True/false wording revision

Replaced 112 generated question-and-label prompts with individually authored statements in `data/true-false.js`. Each has a clear truth value and a matching explanation; false statements target a specific misconception. The new statements are evenly split between true and false within each topic. All 155 true/false items were reviewed, including clearer article, pronoun and greeting statements in the older banks. AP translations and word help match the new wording. Question IDs, overall bank sizes and worksheet features are preserved. Automated checks reject the old question-and-answer wrappers and verify the authored statement balance.
