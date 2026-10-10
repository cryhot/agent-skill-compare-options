// Demo data for demo/index.html and demo/demo.js: a list of tables, in the format of assets/compare-table.md.
// The first one is the table of the README's screenshot.
window.COMPARE_TABLE_DEMO = [
  {
    "title": "Tools for comparing options",
    "criteria": [
      {
        "id": "kind",     "label": "Kind",
        "type": "cat",
        "options": {
          "ai":     {"emoji": "🤖", "label": "AI assistant"    },
          "site":   {"emoji": "🌐", "label": "comparison site"},
          "dev":    {"emoji": "📦", "label": "dev metrics"     },
          "matrix": {"emoji": "🧮", "label": "decision matrix"}
        }
      },
      {
        "id": "has",      "label": "Already yours", "info": "Available in your current setup (Claude skill, connected Google Sheets / Notion)",
        "type": "bool"
      },
      {
        "id": "breadth",  "label": "Domain breadth", "info": "Software, apps, hardware, furniture, cars, extensions… all of them?",
        "type": "grade"
      },
      {
        "id": "discover", "label": "Finds candidates", "info": "Surfaces options you did not know about",
        "type": "grade"
      },
      {
        "id": "facts",    "label": "Fresh facts", "info": "Up-to-date, verified specs, prices, status",
        "type": "grade"
      },
      {
        "id": "personal", "label": "Your criteria", "info": "Rates against your own constraints and weights",
        "type": "grade"
      },
      {
        "id": "trust",    "label": "Independence", "info": "Free of affiliate, ad or vendor bias",
        "type": "grade"
      },
      {
        "id": "cost",     "label": "Cost",
        "type": "grade"
      },
      {
        "id": "output",   "label": "Reusable output", "info": "Table you can sort, share, export, revisit",
        "type": "grade"
      }
    ],
    "candidates": [
      {
        "name": "Claude + compare-options",
        "sub": "the skill you just ran",
        "url": "https://github.com/cryhot/agent-skill-compare-options",
        "cells": {
          "kind":     {"v": "ai"},
          "has":      {"v": true,      "t": "installed"},
          "breadth":  {"v": "perfect", "t": "any domain"},
          "discover": {"v": "good",    "t": "parallel searches per angle"},
          "facts":    {"v": "good",    "t": "checks status, dates facts", "d": "Relies on web search quality; can still misread a source."},
          "personal": {"v": "perfect", "t": "hard/soft constraints, layers"},
          "trust":    {"v": "good",    "t": "no affiliate links", "d": "LLM errors possible; sources are listed for checking."},
          "cost":     {"v": "good",    "t": "within your plan"},
          "output":   {"v": "perfect", "t": "sortable table, markdown, artifact"}
        }
      },
      {
        "name": "ChatGPT shopping research",
        "sub": "OpenAI, Nov 2025",
        "url": "https://www.techradar.com/ai-platforms-assistants/chatgpt/chatgpts-new-shopping-research-tool-compares-products-for-you-so-you-dont-have-to-open-20-tabs",
        "cells": {
          "kind":     {"v": "ai"},
          "has":      {"v": false},
          "breadth":  {"v": "weak",    "t": "consumer products only"},
          "discover": {"v": "good",    "t": "buyer's guide from web"},
          "facts":    {"v": "passing", "t": "OpenAI warns of price errors"},
          "personal": {"v": "good",    "t": "clarifying questions, memory"},
          "trust":    {"v": "passing", "t": "checkout ambitions"},
          "cost":     {"v": "perfect", "t": "free tier"},
          "output":   {"v": "passing", "t": "guide in chat"}
        }
      },
      {
        "name": "Google AI Mode / Gemini",
        "sub": "Shopping Graph",
        "url": "https://blog.google/intl/en-in/products/explore-communicate/new-ways-google-is-using-ai-to-make-shopping-easier/",
        "cells": {
          "kind":     {"v": "ai"},
          "has":      {"v": false},
          "breadth":  {"v": "weak",    "t": "shopping products"},
          "discover": {"v": "perfect", "t": "50B-product graph"},
          "personal": {"v": "passing", "t": "conversational refinement"},
          "trust":    {"v": "weak",    "t": "ads, seller choice varies"},
          "cost":     {"v": "perfect", "t": "free"},
          "output":   {"v": "passing", "t": "auto comparison table"}
        },
        "variants": [
          {
            "name": "AI Mode in Search",
            "cells": {
              "facts": {"v": "weak", "t": "prices ~21.6% higher than Search (Aug 2026 study)"}
            }
          },
          {
            "name": "AI Mode in Chrome",
            "sub": "multi-tab compare",
            "cells": {
              "facts": {"v": "passing", "t": "reads your open tabs"}
            }
          }
        ]
      },
      {
        "name": "AlternativeTo",
        "sub": "crowd-sourced",
        "url": "https://alternativeto.net",
        "cells": {
          "kind":     {"v": "site"},
          "has":      {"v": false},
          "breadth":  {"v": "passing", "t": "software and apps"},
          "discover": {"v": "perfect", "t": "150k+ apps"},
          "facts":    {"v": "passing", "t": "crowd-maintained"},
          "personal": {"v": "weak",    "t": "OS/license filters only"},
          "trust":    {"v": "good",    "t": "crowd votes"},
          "cost":     {"v": "perfect", "t": "free"},
          "output":   {"v": "weak",    "t": "lists only"}
        }
      },
      {
        "name": "G2 / Capterra",
        "sub": "B2B software reviews",
        "url": "https://www.capterra.com",
        "cells": {
          "kind":     {"v": "site"},
          "has":      {"v": false},
          "breadth":  {"v": "passing", "t": "business software"},
          "discover": {"v": "good",    "t": "big category directories"},
          "facts":    {"v": "passing", "t": "vendor-edited profiles"},
          "personal": {"v": "weak",    "t": "filters only"},
          "trust":    {"v": "passing", "t": "vendor-funded lead-gen"},
          "cost":     {"v": "perfect", "t": "free"},
          "output":   {"v": "passing", "t": "side-by-side pages"}
        }
      },
      {
        "name": "Slant",
        "sub": "community rankings",
        "url": "https://www.slant.co",
        "cells": {
          "kind":     {"v": "site"},
          "has":      {"v": false},
          "breadth":  {"v": "passing", "t": "mostly tech"},
          "discover": {"v": "good",    "t": "ranked lists with pros/cons"},
          "facts":    {"v": "unknown", "t": "freshness not verified"},
          "personal": {"v": "weak",    "t": "crowd ranking"},
          "trust":    {"v": "good",    "t": "no financial ties claimed"},
          "cost":     {"v": "perfect", "t": "free"},
          "output":   {"v": "passing", "t": "versus pages"}
        }
      },
      {
        "name": "Versus.com",
        "sub": "spec comparisons",
        "url": "https://versus.com",
        "cells": {
          "kind":     {"v": "site"},
          "has":      {"v": false},
          "breadth":  {"v": "good",    "t": "90+ categories, even cities"},
          "discover": {"v": "passing", "t": "by category"},
          "facts":    {"v": "weak",    "t": "accuracy complaints"},
          "personal": {"v": "weak",    "t": "crowd-weighted score"},
          "trust":    {"v": "weak",    "t": "Trustpilot 2.3/5"},
          "cost":     {"v": "perfect", "t": "free, ads"},
          "output":   {"v": "passing", "t": "versus pages"}
        }
      },
      {
        "name": "RTINGS",
        "sub": "lab tests",
        "url": "https://www.rtings.com",
        "cells": {
          "kind":     {"v": "site"},
          "has":      {"v": false},
          "breadth":  {"v": "weak",    "t": "electronics only"},
          "discover": {"v": "good",    "t": "table tool filters"},
          "facts":    {"v": "perfect", "t": "own lab measurements"},
          "personal": {"v": "good",    "t": "custom ratings in table tool"},
          "trust":    {"v": "perfect", "t": "buys own units, no ads"},
          "cost":     {"v": "passing", "t": "full results paywalled since Mar 2026"},
          "output":   {"v": "good",    "t": "shareable tables"}
        }
      },
      {
        "name": "npm trends / StackShare",
        "sub": "library adoption",
        "url": "https://npmtrends.com",
        "cells": {
          "kind":     {"v": "dev"},
          "has":      {"v": false},
          "breadth":  {"v": "bad",     "t": "JS / tech stacks"},
          "discover": {"v": "passing", "t": "suggests related packages"},
          "facts":    {"v": "good",    "t": "registry download API"},
          "personal": {"v": "bad",     "t": "none"},
          "trust":    {"v": "good",    "t": "raw metrics"},
          "cost":     {"v": "perfect", "t": "free"},
          "output":   {"v": "passing", "t": "trend charts"}
        }
      },
      {
        "name": "1000minds",
        "sub": "MCDA, PAPRIKA",
        "url": "https://1000minds.com/decision-making",
        "cells": {
          "kind":     {"v": "matrix"},
          "has":      {"v": false},
          "breadth":  {"v": "perfect", "t": "any decision"},
          "discover": {"v": "bad",     "t": "you bring the options"},
          "facts":    {"v": "bad",     "t": "manual entry"},
          "personal": {"v": "perfect", "t": "pairwise weighting, groups"},
          "trust":    {"v": "good",    "t": "peer-reviewed method"},
          "cost":     {"v": "weak",    "t": "paid, 15-day trial"},
          "output":   {"v": "good",    "t": "value-for-money charts"}
        }
      },
      {
        "name": "Good Decision",
        "sub": "iPhone, iPad, Mac",
        "url": "https://apps.apple.com/app/id1485292223",
        "cells": {
          "kind":     {"v": "matrix"},
          "has":      {"v": false},
          "breadth":  {"v": "perfect", "t": "any decision"},
          "discover": {"v": "weak",    "t": "AI suggests options"},
          "facts":    {"v": "passing", "t": "extracts specs from a pasted link"},
          "personal": {"v": "good",    "t": "weighted matrix"},
          "trust":    {"v": "good",    "t": "no data collected, on-device AI"},
          "cost":     {"v": "good",    "t": "free + in-app purchases"},
          "output":   {"v": "good",    "t": "exports as spreadsheet", "d": "Requires iOS/macOS 26."}
        }
      },
      {
        "name": "Sheets / Notion matrix",
        "sub": "your connected apps",
        "url": "https://docs.google.com/spreadsheets",
        "cells": {
          "kind":     {"v": "matrix"},
          "has":      {"v": true,      "t": "connected"},
          "breadth":  {"v": "perfect", "t": "any decision"},
          "discover": {"v": "bad",     "t": "none"},
          "facts":    {"v": "bad",     "t": "manual"},
          "personal": {"v": "perfect", "t": "any formula"},
          "trust":    {"v": "perfect", "t": "yours"},
          "cost":     {"v": "perfect", "t": "free"},
          "output":   {"v": "good",    "t": "shareable, editable"}
        }
      }
    ],
    "view": {
      "sort": [
        {"id": "_sum", "dir": "down"}
      ]
    }
  },
  {
    "title": "Existing similar skills",
    "criteria": [
      {
        "id": "fit",    "label": "Fit", "info": "Covers any domain, with layers and a fit scale",
        "type": "grade"
      },
      {
        "id": "oc",     "label": "Works in opencode", "info": "Must load in both Claude Code and opencode",
        "type": "check",
        "hard": true
      },
      {
        "id": "origin", "label": "Origin",
        "type": "cat",
        "options": {
          "official": {"emoji": "🏛️", "label": "official"       },
          "third":    {"emoji": "👥", "label": "third-party"    },
          "self":     {"emoji": "🛠️", "label": "self-developed"}
        }
      },
      {
        "id": "maint",  "label": "Maintenance",
        "type": "grade"
      },
      {
        "id": "trust",  "label": "Trust",
        "type": "grade"
      },
      {
        "id": "ease",   "label": "Ease of use",
        "type": "grade"
      },
      {
        "id": "port",   "label": "Portability",
        "type": "grade"
      },
      {
        "id": "cost",   "label": "Cost, license", "info": "Prefer free and open source",
        "type": "grade",
        "soft": true
      }
    ],
    "candidates": [
      {
        "name": "compare-options",
        "sub": "ours",
        "info": "The skill written in this session, stowed from the dotfiles.",
        "cells": {
          "fit":    {"v": "perfect", "t": "Any domain, layers, **fit scale**"},
          "origin": {"v": "self",    "t": "Written with you"},
          "trust":  {"v": "perfect", "t": "Written by us"},
          "ease":   {"v": "good",    "t": "Auto-invoked"},
          "cost":   {"v": "perfect", "t": "Free"}
        },
        "variants": [
          {
            "name": "dotfiles copy",
            "info": "Edited in place, linked by stow into both harnesses.",
            "cells": {
              "oc":    {"v": true,      "t": "Stowed into `~/.config/opencode`"},
              "maint": {"v": "passing", "t": "You maintain it, edits are live"},
              "port":  {"v": "good",    "t": "Claude Code, opencode"}
            }
          },
          {
            "name": "claude.ai upload",
            "info": "A zip uploaded to claude.ai, synced back to the desktop app.",
            "cells": {
              "oc":    {"v": false,  "t": "Not synced to opencode", "d": "claude.ai skills only reach ~/.claude/skills/synced, which opencode does not read."},
              "maint": {"v": "weak", "t": "Re-upload after each edit"},
              "port":  {"v": "good", "t": "claude.ai, desktop app sync"}
            },
            "sub": "zip on claude.ai"
          }
        ]
      },
      {
        "name": "vendor-evaluation",
        "sub": "rampstackco",
        "url": "https://github.com/rampstackco/claude-skills/blob/main/skills/vendor-evaluation/SKILL.md",
        "info": "A B2B procurement method: needs brief, shortlist, weighted 1–5 scorecard, negotiation, rollout.",
        "cells": {
          "fit":    {"v": "weak",    "t": "B2B purchasing only", "d": "Weighted 1–5 rubric (fit 40%, integration 15%…) built around procurement: demos, negotiation, renewal dates.",
                                                                 "src": ["https://github.com/rampstackco/claude-skills/blob/main/skills/vendor-evaluation/SKILL.md"]},
          "oc":     {"v": true,      "t": "Plain SKILL.md"},
          "origin": {"v": "third",   "t": "rampstackco"},
          "maint":  {"v": "unknown", "t": "Not checked", "d": "Not verified yet. To check the last commit:\n\n```sh\ngh api repos/rampstackco/claude-skills --jq .pushed_at\n```\n\nA date older than a year would make it `weak`."},
          "trust":  {"v": "passing", "t": "Unknown author, sound method"},
          "ease":   {"v": "good",    "t": "Plain instructions"},
          "port":   {"v": "good",    "t": "Plain SKILL.md"},
          "cost":   {"v": "good",    "t": "Free, license unverified"}
        }
      },
      {
        "name": "buyer-eval",
        "sub": "Salespeak",
        "url": "https://feedbagel.com/post/claude-skill-for-automated-b2b-software-vendor-evaluation",
        "info": "Evaluates B2B software vendors over 7 weighted dimensions, questioning vendor AI agents.",
        "cells": {
          "fit":    {"v": "weak",    "t": "B2B SaaS only"},
          "oc":     {"v": true,      "t": "Plain SKILL.md"},
          "origin": {"v": "third",   "t": "Salespeak"},
          "maint":  {"v": "unknown", "t": "Not checked"},
          "trust":  {"v": "weak",    "t": "Vendor-sourced evidence", "d": "It questions **vendors' own AI agents** through _Salespeak Frontdoor_:\n- part of the evidence comes from the vendors themselves\n- claims are then cross-checked against G2 and analyst reports",
                                                                     "src": [{"t": "feedbagel", "u": "https://feedbagel.com/post/claude-skill-for-automated-b2b-software-vendor-evaluation"}, {"t": "ColdIQ", "u": "https://coldiq.com/skills/buyer-eval"}]},
          "ease":   {"v": "good",    "t": "No API key", "d": "Installs as a plain skill folder:\n\n```json\n{\"name\": \"buyer-eval\", \"license\": \"MIT\", \"apiKey\": null}\n```"},
          "port":   {"v": "good",    "t": "Plain SKILL.md"},
          "cost":   {"v": "perfect", "t": "MIT"}
        }
      },
      {
        "name": "deep-research",
        "sub": "Anthropic, enabled",
        "info": "# deep-research\nMulti-source research synthesized into a narrative report, using subagents.\n\n> Best when a question needs many sources and a written synthesis, not a rating grid.\n\n---\n\n## Compared to compare-options\n- broader research, longer output\n- no criteria, no fit scale",
        "cells": {
          "fit":    {"v": "passing",  "t": "Generic reports, no ratings or layers"},
          "oc":     {"v": false,      "t": "Only in `~/.claude/skills/synced`", "d": "Distributed through the claude.ai skills sync into ~/.claude/skills/synced, which opencode does not read."},
          "origin": {"v": "official", "t": "Anthropic"},
          "maint":  {"v": "good",     "t": "Anthropic"},
          "trust":  {"v": "perfect",  "t": "Anthropic"},
          "ease":   {"v": "good",     "t": "Already enabled"},
          "port":   {"v": "weak",     "t": "Claude only"},
          "cost":   {"v": "good",     "t": "Included in plan"}
        }
      },
      {
        "name": "product-comparison",
        "sub": "finsilabs",
        "url": "https://skillselion.com/skills/finsilabs/awesome-ecommerce-skills/product-comparison",
        "info": "Builds side-by-side comparison tables and selectors for online shops.",
        "cells": {
          "fit":    {"v": "bad",     "t": "Builds shop comparison UIs"},
          "origin": {"v": "third",   "t": "finsilabs"},
          "maint":  {"v": "unknown", "t": "Not checked"},
          "trust":  {"v": "unknown", "t": "Not checked"},
          "ease":   {"v": "unknown", "t": "Not checked"},
          "port":   {"v": "unknown", "t": "Not checked"},
          "cost":   {"v": "unknown", "t": "Not checked"}
        }
      }
    ],
    "view": {
      "hidden": [
        "trust",
        "ease"
      ]
    }
  },
  {
    "title": "Small table",
    "criteria": [
      {
        "id": "q",       "label": "Quality",
        "type": "grade"
      },
      {
        "id": "free",    "label": "Free", "info": "No preferred answer",
        "type": "bool"
      },
      {
        "id": "offline", "label": "Works offline",
        "type": "check"
      },
      {
        "id": "kind",    "label": "Kind",
        "type": "cat",
        "options": {
          "app": {"emoji": "📱", "label": "app"},
          "web": {"emoji": "🌐", "label": "web"}
        }
      }
    ],
    "candidates": [
      {
        "name": "Alpha",
        "cells": {
          "q":       {"v": "good", "t": "Fine"},
          "free":    {"v": true,   "t": "Free"},
          "offline": {"v": true,   "t": "Yes"},
          "kind":    {"v": "app",  "t": "Mobile app"}
        }
      },
      {
        "name": "Beta",
        "cells": {
          "q":       {"v": "bad", "t": "Poor, with a `</script>` in its text"},
          "free":    {"v": false, "t": "Paid"},
          "offline": {"v": false, "t": "No"},
          "kind":    {"v": "web", "t": "Web service"}
        }
      },
      {
        "name": "Gamma",
        "cells": {
          "q":       {"v": "irrelevant", "t": "Not applicable"},
          "offline": {"v": null,         "t": "Unknown"}
        }
      }
    ]
  },
  {
    "title": "Constraint types",
    "criteria": [
      {
        "id": "gh_i", "label": "grade-hard-info", "info": "Foo bar baz, shown in the header tooltip",
        "type": "grade",
        "hard": true
      },
      {
        "id": "gh",   "label": "grade-hard",
        "type": "grade",
        "hard": true
      },
      {
        "id": "gs_i", "label": "grade-soft-info", "info": "Foo bar baz, shown in the header tooltip",
        "type": "grade",
        "soft": true
      },
      {
        "id": "gs",   "label": "grade-soft",
        "type": "grade",
        "soft": true
      },
      {
        "id": "g_i",  "label": "grade-info", "info": "Foo bar baz, shown in the header tooltip",
        "type": "grade"
      },
      {
        "id": "g",    "label": "grade",
        "type": "grade"
      },
      {
        "id": "ch",   "label": "check-hard",
        "type": "check",
        "hard": true
      },
      {
        "id": "cs",   "label": "check-soft",
        "type": "check",
        "soft": true
      },
      {
        "id": "c",    "label": "check",
        "type": "check"
      },
      {
        "id": "b",    "label": "bool",
        "type": "bool"
      },
      {
        "id": "cat",  "label": "cat",
        "type": "cat",
        "options": {
          "foot":  {"emoji": "👣", "label": "foot"  },
          "bike":  {"emoji": "🚲", "label": "bike"  },
          "car":   {"emoji": "🚗", "label": "car"   },
          "train": {"emoji": "🚆", "label": "train"},
          "plane": {"emoji": "✈️", "label": "plane"}
        }
      }
    ],
    "candidates": [
      {
        "name": "Alpha",
        "sub": "meets every constraint",
        "cells": {
          "gh_i": {"v": "perfect", "t": "foo"},
          "gh":   {"v": "good",    "t": "v5"},
          "gs_i": {"v": "good",    "t": "quux corge"},
          "gs":   {"v": "passing", "t": "grault"},
          "g_i":  {"v": "good",    "t": "wonderful"},
          "g":    {"v": "good",    "t": "xyzzy"},
          "ch":   {"v": true,      "t": "pass"},
          "cs":   {"v": true},
          "c":    {"v": true,      "t": "="},
          "b":    {"v": true},
          "cat":  {"v": "bike"}
        }
      },
      {
        "name": "Beta",
        "sub": "breaks hard constraints",
        "cells": {
          "gh_i": {"v": "incompatible", "t": "foo bar"},
          "gh":   {"v": "incompatible", "t": "v1"},
          "gs_i": {"v": "perfect",      "t": "garply"},
          "gs":   {"v": "good",         "t": "waldo fred"},
          "g_i":  {"v": "weak",         "t": "questionable"},
          "g":    {"v": "weak",         "t": "thud"},
          "ch":   {"v": false,          "t": "fail"},
          "cs":   {"v": false},
          "c":    {"v": false,          "t": "≠"},
          "b":    {"v": false},
          "cat":  {"v": "car"}
        }
      },
      {
        "name": "Gamma",
        "sub": "unknowns and missing justifications",
        "cells": {
          "gh_i": {"v": "unknown"},
          "gh":   {"v": "good",       "t": "v5"},
          "gs_i": {"v": "weak",       "t": "garply fred"},
          "gs":   {"v": "unknown",    "t": "plugh thud"},
          "g_i":  {"v": "irrelevant", "t": "N/A"},
          "g":    {"v": "unknown"},
          "ch":   {"v": null,         "t": "unknown"},
          "cs":   {"v": false},
          "c":    {"v": null,         "t": "≟"},
          "cat":  {"v": "train",      "t": "metro"}
        }
      }
    ],
    "view": {
      "hidden": [
        "gh_i",
        "gs",
        "g",
        "cs"
      ]
    }
  },
  {
    "title": "Column widths",
    "criteria": [
      {
        "id": "kind",   "label": "Kind",
        "type": "cat",
        "options": {
          "app": {"emoji": "📱", "label": "app"}
        }
      },
      {
        "id": "short",  "label": "Short texts", "info": "Narrower than the cap: the column fits its widest text",
        "type": "grade"
      },
      {
        "id": "wraps",  "label": "Wrapped texts", "info": "Wider than the cap: with a scrollbar, the texts wrap and the column fits its longest line; without one, the table takes the full width",
        "type": "grade"
      },
      {
        "id": "wraps2", "label": "More wrapped texts",
        "type": "grade"
      },
      {
        "id": "wraps3", "label": "Even more wrapped texts", "info": "Gamma, hidden by default (show the incompatible mark): a name and a word that cannot wrap are wider than the cap, so the columns grow to fit them",
        "type": "grade"
      }
    ],
    "candidates": [
      {
        "name": "Alpha",
        "cells": {
          "kind":   {"v": "app"},
          "short":  {"v": "perfect", "t": "perfect"},
          "wraps":  {"v": "good",    "t": "cross-referencing"},
          "wraps2": {"v": "perfect", "t": "i18n, a11y"},
          "wraps3": {"v": "good",    "t": "docs lacking"}
        }
      },
      {
        "name": "Beta",
        "cells": {
          "kind":   {"v": "app"},
          "short":  {"v": "good",    "t": "fine"},
          "wraps":  {"v": "good",    "t": "comprehensive cross-referencing"},
          "wraps2": {"v": "good",    "t": "internationalization, accessibility"},
          "wraps3": {"v": "passing", "t": "documentation underwhelming"}
        }
      },
      {
        "name": "Gamma",
        "cells": {
          "kind":   {"v": "app"},
          "short":  {"v": "weak", "t": "a bit slow"},
          "wraps":  {"v": "weak", "t": "occasional misattributions"},
          "wraps2": {"v": "weak", "t": "unmaintained dependencies"},
          "wraps3": {"v": "weak", "t": "incomprehensible configuration"}
        }
      },
      {
        "name": "DeltaWithAVeryLongUnbreakableName",
        "cells": {
          "wraps3": {"v": "bad", "t": "see org.example.plugins.RegistryFactoryBuilder for details"}
        }
      },
      {
        "name": "ZetaWithAVeryVeryVeryVeryVeryVeryVeryLongUnbreakableName",
        "cells": {
          "wraps3": {"v": "incompatible", "t": "ConfigurationFactoryBuilderImpl"}
        }
      }
    ],
    "view": {
      "off": [
        "bad",
        "incompatible"
      ]
    }
  },
  {
    "title": "Long details",
    "criteria": [
      {
        "id": "maint", "label": "Maintenance", "info": "Click a mark of this column to open a details box of each length",
        "type": "grade"
      }
    ],
    "candidates": [
      {
        "name": "1 · No details",
        "sub": "text of the cell only",
        "cells": {
          "maint": {"v": "good", "t": "active, with quarterly releases"}
        }
      },
      {
        "name": "2 · A few lines",
        "sub": "fits anywhere",
        "cells": {
          "maint": {"v": "good", "t": "slowing down", "d": "Releases came every quarter until 2024, then slowed down.\n\nThe maintainers explained the gap in the changelog, and the issue tracker stayed active."}
        }
      },
      {
        "name": "3 · Long",
        "sub": "scrolls in a short window",
        "cells": {
          "maint": {"v": "good", "t": "slowing down", "d": "## Findings\n\nReleases came roughly every quarter until 2024, then slowed down, with a long gap before the latest one. The maintainers explained the gap in the changelog, and the issue tracker stayed active.\n\n- Releases: 14 in 2022, 9 in 2023, 4 in 2024, 2 in 2025\n- Open issues: 212, of which 31 are labeled as bugs\n- Median time to a first answer: 2 days\n\n## Caveats\n\nThe documentation covers the common cases well, but the advanced configuration is only described in the issue tracker, and in a few blog posts, some of them outdated."}
        }
      },
      {
        "name": "4 · Very long",
        "sub": "always scrolls in a page",
        "cells": {
          "maint": {
            "v": "good", "t": "slowing down", "d": "## Findings\n\nThe first review looked at the project's **maintenance** over several years: releases came roughly every quarter until 2024, then slowed down, with a long gap before the latest one. The maintainers explained the gap in the changelog, and the issue tracker stayed active.\n\n- Releases: 14 in 2022, 9 in 2023, 4 in 2024, 2 in 2025\n- Open issues: 212, of which 31 are labeled as bugs\n- Median time to a first answer on an issue: 2 days\n- Contributors with more than 10 commits: 6\n- Open pull requests: 18, the oldest from 2023\n\n## What the tests showed\n\nRunning the same scenario on three machines gave consistent results, apart from the first start, which took much longer on the slowest one because of the initial indexing. The command below reproduces it:\n\n```bash\nmytool index --all ~/documents && mytool search \"invoice 2025\" --limit 20\n```\n\nThe second run, once the index existed, took under a second on every machine. Deleting the index and running again gave the same timings, so the slowness is not caused by a stale cache.\n\n## Caveats\n\nThe documentation covers the common cases well, but the advanced configuration is only described in the issue tracker and in a few blog posts, some of which are outdated. Several options silently ignore unknown values instead of reporting an error, which makes typos hard to notice.\n\n> The maintainers said they plan a rewrite of the configuration layer, with no date given.\n\n## Compatibility\n\n- Linux: packaged by most distributions, with the previous major version in the stable ones\n- macOS: available through the usual package manager, with a native build for recent chips\n- Windows: only through a compatibility layer, unsupported by the maintainers\n\n## Security\n\nNo vulnerability has been reported in the last three years, but the project has no policy for reporting one, and its dependencies are updated by hand, a few times a year. One dependency was flagged by an audit tool during the review, without a known way to exploit it here.\n\n## Cost\n\nFree and open source, with an optional paid plan for the hosted synchronization service. The plan's price changed twice since 2023, each time announced a month ahead.\n\n## Recommendation\n\nFine for personal use today. For a team, check first that the missing options are not needed, pin the version in the setup scripts to avoid surprises when the rewrite lands, and plan to review the choice again after it.",
            "src": [{"u": "https://example.com/changelog", "t": "Changelog"}, {"u": "https://example.com/issues", "t": "Issue tracker"}, "https://example.com/blog/2025/review"]}
        }
      }
    ]
  }
];
