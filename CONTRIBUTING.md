# Contributing


## Development

Serve the repository, then open <http://localhost:8000/demo/>:
```sh
python3 -m http.server 8000
```
The demo renders [`demo/data.js`](demo/data.js) with your local [`assets/compare-table.js`](assets/compare-table.js): reload it after each change.
Its bar changes one key of the address at a time, and leaves the others untouched:
- `mode=widget|artifact` simulates where the tables are shown: an inline widget, which is the default, with an editable prompt bar that the action buttons fill, or an artifact, a page of its own,
- `v=<version>` loads that release of the table script from jsDelivr, eg. `v=1` for the latest one,
- `title=<text>` renders only the tables whose title contains it,
- `theme=light|dark` forces the colors, instead of following the system,
- `full`, which the _full page_ link next to each table sets, renders only the first matching table, as a page of its own: no bar and no margin.


## Commit messages

Write the subject as `tag(scope): Message`, as in `feat(view): Fit the columns to their content`.
The message is a capitalized imperative, without a final period, like the rest of the history.

The _tag_ is the kind of change:

| Tag        | Kind of change |
|------------|----------------|
| `feat`     | a new capability, or a change in what something does |
| `fix`      | a bug fix |
| `refactor` | a change of the code, not of what it does |
| `docs`     | documentation only |
| `chore`    | anything else: dependencies, tooling, releases |

The _scope_ is what the change affects:

| Scope            | What it affects | Example of files |
|------------------|-----------------|------------------|
| `view-interface` | the data format of the widget | documentation in [`assets/compare-table.md`](assets/compare-table.md), parsing in [`assets/compare-table.js`](assets/compare-table.js) |
| `prompt`         | what the agent reads or pastes | [`SKILL.md`](SKILL.md), [`assets/compare-table.md`](assets/compare-table.md), [`assets/compare-table.html`](assets/compare-table.html) ... |
| `view`           | the interactive widgets, their look and behavior | [`assets/compare-table.js`](assets/compare-table.js) ... |
| `repo`           | what users do not see | [`README.md`](README.md), [`demo/`](demo/), [`.github/`](.github/), the license ... |

Leave out the scope when none fits, as in `chore: Update the license year`.

Split a change into one commit per scope, preferably.
Otherwise, separate the scopes with a comma, preferably in table order, as in `feat(prompt,view): …`.

A change of the interface edits its documentation and its parser together, so it is a single commit.
Add `prompt` after it only when the prompt changes for another reason than how to use the interface, as in `feat(view-interface,prompt): …`.
When another change cannot be split, list its scopes separated by commas too.

A change that breaks the data format of tables already written adds a `BREAKING CHANGE:` line at the end of the commit body.
It calls for a new major version, as widgets load the table script from the latest release of their major version.


## Releases

Pushing a tag `vX.Y.Z` runs [`release.yml`](.github/workflows/release.yml), which attaches the skill's zip to the release.
The zip leaves out what only matters to the repository: [`.gitattributes`](.gitattributes) lists it with the `skill-ignore` attribute, so mark a new file that is not part of the skill there.
It also gets a tiny `README.md` of its own, which links back to the repository at the release's version.
GitHub's own _Source code_ archives keep everything.
