# compare-options

An agent skill to survey and compare options before choosing or building anything, in any domain:
software tools, libraries, web services, phone apps, hardware, furniture, cars, marketplace skills or extensions.

The agent frames the need (layers, hard and soft constraints), searches wide and checks the current status of each candidate,
rates every candidate on the relevant criteria with one shared scale, then reports the gaps, the ideas worth borrowing, and a recommendation.

| 🔵 | 🟢 | 🟡 | 🟠 | 🔴 | 🟣 | ⚪ | ⚫ |
|---|---|---|---|---|---|---|---|
| perfect | good | passing | weak | bad | incompatible | unknown | irrelevant |

Where the harness can show interactive views, the comparison renders as an interactive table:
sort and reorder criteria, hide marks or criteria, open the details of any rating, move with the arrow keys,
and export the view as markdown or as an artifact.


## Install

Clone it into the skills directory of your agent, as `compare-options`: the directory name must match the skill's name.

Claude Code:
```sh
git clone https://github.com/cryhot/agent-skill-compare-options ~/.claude/skills/compare-options
```

Codex, Gemini CLI, Cursor, GitHub Copilot, and other agents reading the shared `~/.agents/skills` directory:
```sh
git clone https://github.com/cryhot/agent-skill-compare-options ~/.agents/skills/compare-options
```

opencode reads both directories: install it in only one of them, or it loads the skill twice.

To update it later, run `git pull` in that directory.

For claude.ai, which has no skills directory, upload a zip in **Customize > Skills** instead.
The zip must hold a folder named `compare-options`, while GitHub's **Download ZIP** names it `agent-skill-compare-options-main`:
download it, extract it, rename that folder to `compare-options`, then zip the renamed folder itself (not its contents).


## Files

- [`SKILL.md`](SKILL.md): the method, read by the agent.
- [`assets/compare-table.html`](assets/compare-table.html): the interactive table template.
- [`assets/compare-table.md`](assets/compare-table.md): its data format, and what the user can do with it.


## Known limitations

- In the Claude desktop app, the table's action buttons may not reach the chat while the prompt bar has focus.
- The interactive table needs a harness that renders HTML widgets or artifacts; elsewhere, the agent writes markdown tables.


## License

[MIT](LICENSE)
