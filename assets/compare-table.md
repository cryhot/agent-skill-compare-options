# Interactive comparison table

[`compare-table.html`](compare-table.html) renders the comparison as a sortable, filterable table.
Replace `__DATA__` in it with the JSON described below, written on one line,
with every `</` _inside the JSON_ escaped as `<\/`, and nothing else touched:
keep the rest of the file as is, its `</script>` tags included.
The line "Loading the table…" stays until the script has mounted the table:
if it stays, the script did not run (blocked, offline, failed to load, or swallowed as above).

The table itself is [`compare-table.js`](compare-table.js), which the wrapper loads from jsDelivr:
it renders every `.ct` element of the page that holds its data as `<script type="application/json">`.
For several tables on one page, repeat the first line of the wrapper, and load the script once, after them.
Where the script can't be loaded (offline, or a page that must stand alone),
replace the `<script src="…">` line with `<script>`, the content of `compare-table.js`, and `</script>`.

- **Inline widget** (desktop app, claude.ai): pass the result as the widget code.
  The action buttons then send a prompt back to the chat, and show whether it was sent.
  The table is limited in height (to 60% of the window's minus 100px, when the widget can tell, and 600px otherwise), and scrolls inside,
  with its header row and its first column kept in place.
- **Artifact or local HTML file**: wrap it in a full HTML document, with a `<title>`,
  `:root{color-scheme:light dark}` and a `body` background (eg. `Canvas`), so that the table colors match the page.
  Without `sendPrompt`, the markdown button shows the markdown under the table, and the other action buttons are not shown.
  The table then takes the height of the page, except for the details (which scroll inside when long) and the actions.
- To restore a view, put the state sent by the artifact button in `view`.


## Data

```json
{
  "type": "options-table",
  "usage": "Visualize with the compare-options skill: https://github.com/cryhot/agent-skill-compare-options",
  "version": "x.y.z",
  "lang": "en",
  "date": "YYYY-MM-DD",
  "prompt": "the user's request, in their words",
  "title": "Name of this table in the report",
  "criteria": [
    {"id": "fit", "label": "Fit", "type": "grade", "info": "what it measures", "soft": true},
    {"id": "offline", "label": "Works offline", "type": "check", "hard": true},
    {"id": "free", "label": "Free tier", "type": "bool"},
    {"id": "origin", "label": "Origin", "type": "cat",
     "options": {"official": {"emoji": "🏛️", "label": "official"}, "self": {"emoji": "🛠️", "label": "self-developed"}}}
  ],
  "candidates": [
    {"name": "Foo", "sub": "short line under the name", "url": "https://…", "info": "shown when clicking its mark",
     "src": ["https://…"],
     "cells": {"fit": {"v": "good", "t": "short text", "d": "longer justification", "src": [{"t": "label", "u": "https://…"}]}},
     "variants": [
       {"name": "Foo Pro", "sub": "…", "url": "https://…", "info": "…", "cells": {"offline": {"v": true, "t": "…"}}},
       {"name": "Foo Lite", "cells": {"offline": {"v": false, "t": "…"}}}
     ]}
  ],
  "view": {"order": ["origin", "fit"], "hidden": ["free"], "off": ["incompatible", "cat:origin:self"],
           "sort": [{"id": "fit", "dir": "down"}]}
}
```

Criterion types, and the values of `v`:

| type | `v` | shown as |
|---|---|---|
| `grade` | `perfect` `good` `passing` `weak` `bad` `incompatible` `unknown` `irrelevant` | the scale emojis |
| `check` | `true` `false` `null` | 🟢 🔴 ⚪, or 🔵 🟣 ⚪ with `"hard": true` |
| `bool` (no preferred answer) | `true` `false` `null` | ✅ ❌ ❔, not rated |
| `cat` | a key of `options`, or `null` | the option's emoji, not rated |

- The fields before `title` describe the data itself, are all optional, and come first, in that order:
  - `type`: always `"options-table"`, so that whoever opens the JSON alone knows what it is.
  - `usage`: one sentence telling an agent that finds the JSON alone how to display it, with the link of the skill.
  - `version`: `x.y.z` stands for the `metadata.version` of this skill, in the frontmatter of [`SKILL.md`](../SKILL.md): write that value, not the placeholder.
  - `lang`: the language of the texts of the table (`title`, `info`, `t`, `d`, labels), as a BCP 47 tag, lowercase: `fr`, `en`, `pt-BR`.
    It becomes the `lang` of the table. The view's own texts (hint, buttons, legend, box about the skill...) come in that language if it has been translated,
    which English and French are so far, and are marked with their language when it differs.
  - `date`: the day of the survey, as `YYYY-MM-DD` (the user's day), as facts like stars or releases hold for that day.
    It shows in grey after the title, in the markdown export, and when hovering the data version in the box about the skill.
  - `prompt`: the user's request that this table answers, in their words, to regenerate a similar table. It shows when hovering the title.
- A `grade` criterion can also be `"hard": true`: use `incompatible` for the candidates that break it.
  `"soft": true` marks a soft constraint given by the user.
- `info` of a criterion shows in its header tooltip and in the details title.
- A variant's cells override the candidate's cells; the shared ones go on the candidate.
  Its `sub` and `url` default to the candidate's.
- A missing cell counts as unknown.
- `info`, `d` and `t` accept basic markdown: `**bold**`, `_italic_`, `` `code` ``, `[links](…)`, bare URLs,
  and, except in `t`, paragraphs, `#` headings, `> ` quotes, `---` rules, `- ` lists and fenced code blocks.
  A fenced block that names its language (```` ```sh ````) gets syntax coloring, from highlight.js loaded off cdnjs on first use.
  Keep `t` short: it is the cell text; the details show it, then `d`, the longer justification, below a separator.

`view` restores what the user had set; every field is optional, and an empty list is the same as no field:
- `order`: the global column order, hidden criteria included; the criteria it omits follow, in their data order.
- `hidden`: the hidden criteria.
- `off`: the legend marks whose candidates are hidden (a scale key, `unknown`, or `cat:<criterion>:<option>`).
- `sort`: the sort keys, primary first; `_sum` sorts by the summary, and a `cat` sorts in the order of its options.


## What the user can do

- **Legend**: click a mark to hide or show the candidates (or variants) having it, middle click to hide them;
  click a line label to show all of its marks if some are hidden, or hide them all otherwise; middle click to hide them all.
- **Criteria**: click a header to make it the primary sort key, or to stop sorting by it if it already is;
  click its arrow to flip the direction, middle click the arrow to stop sorting by it.
  Hide one with the `×` on its header, with a middle click, or by dropping it on the legend.
  Drag headers and hidden criteria anywhere in the table or the legend to reorder, show or hide them.
- **Details**: click an emoji for its details, then use the arrow keys to move between cells; `Esc` closes.
  Moving left or right keeps the variant line that was last chosen in that row.
- **About**: the GitHub button, at the right of the hint, opens a box about the skill and its repository, in place of the details,
  with its version and an _Update_ link that loads the latest version of the table script, and shows the table again in the same view.
- **Actions**: export the view as markdown or as an artifact,
  and, when details are open, ask Claude to explore the candidate or that evaluation.
