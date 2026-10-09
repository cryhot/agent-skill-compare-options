---
name: compare-options
description: Survey and compare options before choosing or building anything, in any domain — software tools, libraries, web services, phone apps, hardware, furniture, cars, marketplace skills or extensions. Use it whenever the user asks for a state of the art, for alternatives, "is there something that…", "which X should I pick", how X compares to similar things, or before building something that may already exist. Use it also when the user gives a set of options to compare.
metadata:
  authors: Jean-Raphaël Gaglione, Claude Opus 5.5
---

# Compare options

Find what already exists, rate it honestly against the user's need, and say what to adopt, combine or build.
The method is domain-agnostic: keep the criteria that make sense for the domain, and drop the others.
When the user already gives the options, still search for close alternatives they may have missed, unless told not to.

Before you start, decide how you will report, as it changes what to collect:
- check whether this harness can render an inline widget or an HTML artifact,
- if so, read [`assets/compare-table.md`](assets/compare-table.md) now:
  the data format shows what each cell can hold (text, details, sources, variants),
  and the [report](#4-report) can afford more criteria than a markdown table,
- plan to use it, unless the user asks for markdown.


## 1. Frame the need

- Restate the need, then split it into **layers** (functions, roles, sub-needs).
  Candidates often cover only some layers, and the comparison is done per layer.
- List the **hard constraints** given by the user (specs, budget, platform, size…), and the **soft** ones (preferences).
  A candidate failing a hard constraint is 🟣, but keep researching it:
  the user may have been too picky, and may agree to relax the constraint once they see what it costs.
- Check what the user **already has** (their config, setup, installed apps, owned devices).
  Reusing or extending it is often the best candidate.
- State the assumptions you make.
  Ask only when a constraint would change the search drastically.


## 2. Search wide, then verify

- Run several searches **in parallel**, one per angle:
  generic category, domain-specific tools, the user's ecosystem (distribution packages, app store, marketplace, brand compatibility…), and the "build it yourself" route.
- Look where the domain lives: package registries, app stores, marketplaces, manufacturer sites, review and comparison sites, forums (Reddit, Discourse, HN), repair sites.
- Include **standards, conventions and protocols**, not only products.
  Adopting a standard keeps the options open.
- **Never trust memory for the status.**
  Check the current state of each serious candidate: last release, archived, discontinued, sunset, recalled, acquired, license changed, price changed.
  Date these facts.
- Prefer primary sources (official site, repository, changelog, datasheet).
  Treat marketing, affiliate reviews and vendor-written comparisons as biased.


## 3. Rate

### Scale
Rate each candidate on each criterion with:

| | label | meaning |
|---|---|---|
| 🔵 | perfect | perfect fit to the need |
| 🟢 | good | |
| 🟡 | passing | |
| 🟠 | weak | |
| 🔴 | bad | |
| 🟣 | incompatible | breaks a hard constraint |
| ⚪ | unknown | could not be verified, or was skipped |
| ⚫ | irrelevant | does not apply to this candidate |

Each emoji keeps this same label everywhere, whatever the kind of criterion.
⚪ and ⚫ are for rated criteria only; elsewhere, write ❔ for unknown and — for not applicable.


### Kinds of criteria
**Graded criteria** use the whole scale, from 🔵 to 🔴.

**Boolean criteria** (a yes/no question, eg. "works offline"):
phrase them so that _yes_ is the preferred answer, then write:

| | yes | no | unknown |
|---|---|---|---|
| soft constraint | 🟢 | 🔴 | ⚪ |
| hard constraint | 🔵 | 🟣 | ⚪ |
| no preferred answer (not a rating) | ✅ | ❌ | ❔ |

**Hard constraints** can be graded criteria too (eg. a maximum budget):
grade the candidates that meet it as usual, and write 🟣 for those that break it.
**Soft constraints** never give 🟣: they are rated like any other criterion, only weighed more.


### Summary of a candidate
Put in its name cell the worst color of its rated cells,
in the order 🔵 🟢 🟡 🟠 🔴 🟣 (🟣 being the worst).
Ignore ⚪, ⚫, and the cells that are not ratings (✅ ❌ ❔ —).
Do not average: one 🔴 on a criterion that matters outweighs many 🟢.
Weigh the criteria with the user's priorities, and ask for them when they are unclear and decisive.


### Common criteria
Keep the relevant ones, and add those specific to the need:

- **Fit for the use case**: which layers it covers, and how well; what is missing or awkward.
- **Integration with the user's setup**: how it fits what they already have.
- **Maturity**: age, version, track record, product generation.
- **Adoption**: users, stars, contributors, installs, sales, number of reviews, notable users.
- **Lock-in**: cost of leaving, data ownership.
- **Maintenance**: still developed / supported, last release, update cadence, announced end of life.
- **Maintainability**: size and health of the maintainer community or company, bus factor, risk of abandonment.
- **Trust in the authors**: reputation, track record, security history, ownership and funding, telemetry, dark patterns, authenticity of the reviews.
- **Cost and license**: price, total cost of ownership, subscriptions, open source or not, open core, recent license changes.
- **Ease of use**: learning curve, configuration, ergonomics, and **time to first working setup**.
- **Interoperability**: APIs, open standards and formats, integrations, data export.
- **Portability**: platforms, operating systems, devices, regions.
- **Lifetime and repairability** (physical products): expected lifetime, warranty, spare parts, repairability score, resale value.
- **Footprint**: resources, size, weight, energy, noise.
- **Privacy and security**: what leaves the user's hands, attack surface.


## 4. Report

1. The **hard and soft constraints**, restated.
2. The **layers** of the need, in a few lines.
3. **Tables** per category or layer: one row per candidate, one column per criterion, each cell an emoji and a few words.
   Transpose when there are few candidates and many criteria.
   - Before the tables, a **legend**: the [scale](#scale) emojis with their labels, in the same order, as a horizontal table
     (emojis as the header row, labels as the single row), skipping the emojis that do not matter here.
     Eg. `| 🔵 | 🟢 | 🟡 | 🟠 | 🔴 | 🟣 |`, then `|---|…|`, then `| perfect | good | passing | weak | bad | incompatible |`.
     Keep 🔵 🟢 🟡 🟠 🔴 if a criterion is graded, 🟢 🔴 if a soft constraint is boolean, 🔵 🟣 if a hard constraint is boolean, 🟣 if any hard constraint is given,
     and ⚪ ⚫ if they appear.
     Append any custom emoji used (eg. for categories), and leave ✅ ❌ ❔ — out.
   - Write the candidate's name in **bold**, as a link to its most relevant page when there is one
     (official site, repository, product page, store listing…): `**[name](url)**`.
   - Wrap long cell content with `<br>`.
   - When a candidate has close variants that differ on some criteria, keep one row,
     and in those cells put one line per variant, each starting with its own emoji and naming the variant.
   - **Render the tables as an interactive view by default**, instead of markdown.
     The files are in this skill's [`assets/`](assets/) directory: before rendering, read with your file tool
     [`assets/compare-table.md`](assets/compare-table.md) (the data format) and [`assets/compare-table.html`](assets/compare-table.html) (the template),
     then show the result with the harness's inline widget tool (eg. `show_widget`) or an HTML artifact.
     Fall back to markdown tables only if the user asks for markdown, the harness cannot show HTML, or rendering fails.
     Say which format you used, in one line.
     Prefer an inline widget, shown in the conversation;
     publish an artifact or write an HTML file only when the user asks, or wants to share or keep the comparison.
     Its export button gives them the markdown when they need it.
     Showing a column costs the user a click, so research more of the [common criteria](#common-criteria) than for a markdown table,
     and hide the less important ones by default (`view.hidden`) when there are many.
4. The **gaps**: what no candidate covers.
5. **Ideas to borrow**: good concepts found in candidates, even rejected ones, worth reusing if building, or worth asking about other candidates.
6. A **recommendation**: adopt, combine, or build, with the reason.
   When a 🟣 candidate would otherwise be the best, say which constraint to relax, and what it would gain.
7. **Open questions** whose answer would change the recommendation, including the hard constraints worth relaxing.
8. **Sources**, as links, with dates for status-related facts.

The user may then drill into one candidate.
Apply the same criteria, deeper, against its closest peers.
