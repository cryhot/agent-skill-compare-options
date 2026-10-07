// Renders every comparison table on the page: each `.ct` element holding its data as
// `<script type="application/json">`. See compare-table.md for the data format.
(() => {
  const CSS = `
/* Theme tokens: the host's variables when it has them, with light fallbacks here and dark ones below. */
.ct {
  --ct-border: var(--border, rgba(0, 0, 0, .12));
  --ct-border-strong: var(--border-strong, rgba(0, 0, 0, .25));
  --ct-text-2: var(--text-secondary, #5f5e5a);
  --ct-text-3: var(--text-muted, #888780);
  --ct-accent: var(--text-accent, #378ADD);
  --ct-halo: color-mix(in srgb, var(--ct-accent) 45%, transparent);
  --ct-halo-fade: color-mix(in srgb, var(--ct-accent) 20%, transparent);
  --ct-highlight: color-mix(in srgb, var(--ct-accent) 55%, transparent);
  --ct-surface: var(--surface-0, #fff);
  --ct-tint: color-mix(in srgb, var(--text-primary, #1f1f1d) 8%, var(--ct-surface));
  --ct-tint-strong: color-mix(in srgb, var(--text-primary, #1f1f1d) 14%, var(--ct-surface));
  --ct-first-col: 190px;
  --ct-col: 150px;
  /* syntax coloring, after Atom One Light */
  --ct-syntax-keyword: #a626a4;
  --ct-syntax-string: #50a14f;
  --ct-syntax-comment: #a0a1a7;
  --ct-syntax-number: #986801;
  --ct-syntax-title: #4078f2;
  --ct-syntax-attr: #e45649;
  --ct-syntax-builtin: #c18401;
  position: relative;
  font-size: 13px;
  color: var(--text-primary, #1f1f1d);
}
/* Dark mode follows the OS, unless the host page sets its own theme attribute. */
@media (prefers-color-scheme: dark) {
  :root:where(:not([data-mode=light]):not([data-theme=light])) .ct {
    --ct-border: var(--border, rgba(255, 255, 255, .14));
    --ct-border-strong: var(--border-strong, rgba(255, 255, 255, .3));
    --ct-text-2: var(--text-secondary, #b4b2a9);
    --ct-surface: var(--surface-0, #1f1f1d);
    --ct-tint: color-mix(in srgb, var(--text-primary, #f1efe8) 8%, var(--ct-surface));
    --ct-tint-strong: color-mix(in srgb, var(--text-primary, #f1efe8) 14%, var(--ct-surface));
    /* after Atom One Dark */
    --ct-syntax-keyword: #c678dd;
    --ct-syntax-string: #98c379;
    --ct-syntax-comment: #7f848e;
    --ct-syntax-number: #d19a66;
    --ct-syntax-title: #61afef;
    --ct-syntax-attr: #e06c75;
    --ct-syntax-builtin: #e5c07b;
    color: var(--text-primary, #f1efe8);
  }
}
:root[data-mode=dark] .ct,
:root[data-theme=dark] .ct {
  --ct-border: var(--border, rgba(255, 255, 255, .14));
  --ct-border-strong: var(--border-strong, rgba(255, 255, 255, .3));
  --ct-text-2: var(--text-secondary, #b4b2a9);
  --ct-surface: var(--surface-0, #1f1f1d);
  --ct-tint: color-mix(in srgb, var(--text-primary, #f1efe8) 8%, var(--ct-surface));
  --ct-tint-strong: color-mix(in srgb, var(--text-primary, #f1efe8) 14%, var(--ct-surface));
  --ct-syntax-keyword: #c678dd;
  --ct-syntax-string: #98c379;
  --ct-syntax-comment: #7f848e;
  --ct-syntax-number: #d19a66;
  --ct-syntax-title: #61afef;
  --ct-syntax-attr: #e06c75;
  --ct-syntax-builtin: #e5c07b;
  color: var(--text-primary, #f1efe8);
}
.ct:focus { outline: none; }
.ct .ct-title { font-size: 15px; font-weight: 500; margin: 0 0 8px; }
.ct .ct-muted { color: var(--ct-text-3); }
.ct .ct-dim { color: var(--ct-text-3); font-weight: 400; }

/* Legend: one line per kind of mark, then the hidden criteria. */
.ct .ct-legend { padding-bottom: 2px; }
.ct .ct-legend-line { display: flex; flex-wrap: wrap; gap: 4px 8px; align-items: center; margin: 0 0 6px; font-size: 12px; color: var(--ct-text-2); }
.ct .ct-group { font-weight: 500; cursor: pointer; }
.ct .ct-chip { display: inline-flex; gap: 4px; align-items: center; padding: 1px 6px; border: 1px solid transparent; border-radius: var(--radius, 8px); cursor: pointer; }
.ct .ct-chip.ct-off { border-color: var(--ct-border-strong); text-decoration: line-through; }

/* Table: clipped instead of scrolling; the cells after the name column shift by --ct-scroll. */
.ct .ct-wrap { overflow-x: hidden; overflow-x: clip; }
.ct table { border-collapse: collapse; table-layout: fixed; }
.ct th, .ct td { padding: 6px 8px; border-bottom: 0.5px solid var(--ct-border); vertical-align: top; text-align: left; line-height: 1.35; }
.ct td:not(.ct-name), .ct th:not(.ct-name) { transform: translateX(calc(var(--ct-scroll, 0px) * -1)); }
.ct .ct-name, .ct thead th { background: var(--ct-tint); }
.ct .ct-name { position: relative; z-index: 2; }
.ct .ct-scrollbar { position: sticky; bottom: 0; z-index: 5; overflow-x: auto; overflow-y: hidden; background: var(--ct-surface); }
.ct .ct-scrollbar div { height: 1px; }

/* Header row: sticky, sortable, draggable, with a hide cross on hover. */
.ct th { font-weight: 500; font-size: 12px; color: var(--ct-text-2); }
.ct th:not(.ct-name) { padding-right: 16px; }
.ct thead th { position: sticky; top: 0; z-index: 3; }
.ct thead th.ct-name { position: sticky; top: 0; z-index: 4; background: var(--ct-tint-strong); }
.ct th.ct-sortable { cursor: pointer; }
.ct .ct-head { display: flex; gap: 6px; }
.ct .ct-sort-slot { flex: none; width: 18px; position: relative; text-align: center; line-height: 1.35; }
.ct .ct-sort-slot small { position: absolute; left: -3px; top: 10px; font-size: 10px; font-weight: 400; line-height: 1; color: var(--ct-text-3); }
.ct .ct-sort-arrow { font-weight: 400; cursor: pointer; }
.ct .ct-sort-arrow:hover { color: var(--ct-accent); }
.ct th .ct-hide { display: none; position: absolute; top: 2px; right: 4px; font-size: 16px; font-weight: 400; line-height: 1; color: var(--ct-text-3); cursor: pointer; }
.ct th:hover .ct-hide { display: block; }
.ct th .ct-hide:hover { color: #E53935; }
.ct .ct-constraint { display: block; font-size: 11px; font-weight: 400; color: var(--ct-text-3); }
.ct .ct-hard { color: color-mix(in srgb, #9C27B0 65%, var(--ct-text-3)); }
.ct .ct-soft { color: color-mix(in srgb, #FB8C00 65%, var(--ct-text-3)); }

/* Dragging criteria: the dragged item, the drop line, the drag image. */
.ct .ct-dragged { background: color-mix(in srgb, var(--ct-accent) 25%, var(--ct-tint)) !important; }
.ct .ct-drop-line { display: none; position: absolute; z-index: 10; width: 2px; margin-left: -1px; background: var(--ct-accent); pointer-events: none; }
.ct .ct-ghost { position: absolute; top: -1000px; left: 0; padding-left: 5px; font-size: 12px; }
.ct .ct-ghost .ct-chip { background: var(--ct-tint-strong); border-color: var(--ct-border-strong); }

/* Cells: one line per mark, the mark being an emoji with a larger invisible hit area. */
.ct .ct-line { display: flex; gap: 6px; align-items: flex-start; }
.ct .ct-line + .ct-line { margin-top: 4px; }
.ct .ct-mark { flex: none; width: 18px; position: relative; z-index: 0; text-align: center; line-height: 1.35; cursor: pointer; }
.ct .ct-mark::after { content: ''; position: absolute; inset: -4px -3px; }

/* Selection halos, in the color of the selected mark (--ct-halo-color) when it has one. */
.ct .ct-selected, .ct .ct-details, .ct .ct-halo-button {
  --ct-halo: color-mix(in srgb, var(--ct-halo-color, var(--ct-accent)) 50%, transparent);
  --ct-halo-fade: color-mix(in srgb, var(--ct-halo-color, var(--ct-accent)) 22%, transparent);
}
.ct .ct-mark.ct-selected::before { content: ''; position: absolute; inset: -7px -6px; z-index: -1; border-radius: 50%; background: radial-gradient(circle closest-side, var(--ct-halo) 45%, var(--ct-halo-fade) 75%, transparent); }
.ct td.ct-cell-selected { box-shadow: inset 0 0 6px 1px var(--ct-highlight); }
.ct tr.ct-row-selected > td::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background:
    linear-gradient(var(--ct-highlight), transparent) top / 100% 5px no-repeat,
    linear-gradient(transparent, var(--ct-highlight)) bottom / 100% 5px no-repeat;
}
.ct tr.ct-row-selected > td:first-child::after {
  background:
    linear-gradient(var(--ct-highlight), transparent) top / 100% 5px no-repeat,
    linear-gradient(transparent, var(--ct-highlight)) bottom / 100% 5px no-repeat,
    linear-gradient(90deg, var(--ct-highlight), transparent) left / 5px 100% no-repeat;
}

/* Details box, below the table. Its close button is centered on the box's rounded corner. */
.ct .ct-hint { margin: 8px 8px 0; font-size: 11px; color: var(--ct-text-3); }
.ct .ct-details { position: relative; margin: 16px 8px 10px; padding: 10px 40px 12px 14px; border: 0.5px solid var(--ct-border-strong); border-radius: 16px; font-size: 13px; box-shadow: 0 0 6px 1px var(--ct-halo); }
.ct .ct-details hr { border: none; border-top: 0.5px solid var(--ct-border-strong); margin: 6px -26px 6px 0; }
.ct .ct-close { position: absolute; top: 3.5px; right: 3.5px; width: 24px; height: 24px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 0.5px solid var(--ct-border-strong); border-radius: 50%; font-size: 15px; line-height: 1; color: var(--ct-text-2); cursor: pointer; }
.ct .ct-close:hover { background: #E53935; border-color: #E53935; color: #fff; }
.ct .ct-link { cursor: pointer; }
.ct .ct-link:hover { text-decoration: underline; }

/* Markdown, in cells and details. */
.ct b { font-weight: 500; }
.ct code { padding: 0 .25em; border: 0.5px solid var(--ct-border-strong); border-radius: .4em; background: color-mix(in srgb, currentColor 5%, transparent); font-family: var(--font-mono, monospace); font-size: .9em; color: var(--text-danger, #c4372f); white-space: pre-wrap; overflow-wrap: anywhere; }
.ct .ct-markdown > :first-child { margin-top: 0; }
.ct .ct-markdown p { margin: 0 0 4px; }
.ct .ct-markdown ul { margin: 0 0 4px; padding-left: 18px; }
.ct .ct-markdown blockquote { margin: 0 0 4px; padding-left: 8px; border-left: 3px solid var(--ct-border-strong); border-radius: 0; color: var(--ct-text-2); }
.ct .ct-heading { font-weight: 500; margin: 6px 0 4px; }
.ct .ct-heading-1 { font-size: 15px; }
.ct .ct-heading-2 { font-size: 14px; }
.ct .ct-heading-3 { font-size: 13px; }
.ct .ct-code-block { margin: 0 0 6px; padding: 8px 10px; border: 0.5px solid var(--ct-border-strong); border-radius: 8px; background: color-mix(in srgb, var(--text-primary, #1f1f1d) 5%, transparent); font-size: 12px; white-space: pre; overflow-x: auto; }
.ct .ct-code-block code { padding: 0; border: none; background: none; font-size: inherit; color: inherit; white-space: inherit; }

/* Syntax coloring, applied by highlight.js. */
.ct .hljs-keyword, .ct .hljs-selector-tag, .ct .hljs-doctag { color: var(--ct-syntax-keyword); }
.ct .hljs-string, .ct .hljs-regexp, .ct .hljs-addition { color: var(--ct-syntax-string); }
.ct .hljs-comment, .ct .hljs-quote { color: var(--ct-syntax-comment); font-style: italic; }
.ct .hljs-number, .ct .hljs-literal, .ct .hljs-symbol { color: var(--ct-syntax-number); }
.ct .hljs-title, .ct .hljs-section, .ct .hljs-meta { color: var(--ct-syntax-title); }
.ct .hljs-attr, .ct .hljs-attribute, .ct .hljs-variable, .ct .hljs-template-variable, .ct .hljs-name, .ct .hljs-deletion { color: var(--ct-syntax-attr); }
.ct .hljs-built_in, .ct .hljs-type, .ct .hljs-params { color: var(--ct-syntax-builtin); }

/* Action buttons, and the markdown export shown when there is no chat to send it to. */
.ct .ct-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; padding: 0 8px 6px; }
.ct button { font-size: 12px; cursor: pointer; }
.ct button.ct-halo-button { box-shadow: 0 0 6px 1px var(--ct-halo); }
.ct .ct-markdown-export { margin: 4px 8px 6px; padding: 8px; border: 0.5px solid var(--ct-border); border-radius: var(--radius, 8px); font-size: 11px; white-space: pre-wrap; }
`;

  const CODE_TO_COLOR = '.ct-code-block code[class*="language-"]:not(.hljs)';

  // highlight.js, loaded on first need and shared by all tables.
  let highlighter = null;
  function loadHighlighter() {
    if (window.hljs) return Promise.resolve(window.hljs);
    if (!highlighter) {
      highlighter = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
        script.onload = () => {
          try { window.hljs.configure({ ignoreUnescapedHTML: true }); } catch (e) {}
          resolve(window.hljs);
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    return highlighter;
  }

  function mount(root, DATA) {

    // The rating scale; `level` orders the ratings, and is null for the marks that are not ratings.
    const SCALE = {
      perfect:      { level: 5,    color: '#1E6FD9', label: 'perfect',      emoji: '🔵' },
      good:         { level: 4,    color: '#7CB342', label: 'good',         emoji: '🟢' },
      passing:      { level: 3,    color: '#FDD835', label: 'passing',      emoji: '🟡' },
      weak:         { level: 2,    color: '#FB8C00', label: 'weak',         emoji: '🟠' },
      bad:          { level: 1,    color: '#E53935', label: 'bad',          emoji: '🔴' },
      incompatible: { level: 0,    color: '#9C27B0', label: 'incompatible', emoji: '🟣' },
      unknown:      { level: null, color: '#E0E0E0', label: 'unknown',      emoji: '⚪' },
      irrelevant:   { level: null, color: '#424242', label: 'irrelevant',   emoji: '⚫' },
    };
    const SCALE_KEYS = Object.keys(SCALE);
    const HINT = 'Click an emoji for info, then arrows to navigate  ·  Click a criterion to sort, drag to reorder  ·  Click a label or group to hide';

    const canPrompt = typeof sendPrompt === 'function';
    const title = DATA.title || 'comparison';
    const criterionIds = DATA.criteria.map(c => c.id);
    const asList = x => Array.isArray(x) ? x : [];
    const initialView = DATA.view || {};

    const state = {
      hidden: new Set(asList(initialView.hidden)),   // hidden criteria
      off: new Set(asList(initialView.off)),         // legend marks whose candidates are hidden
      sort: asList(initialView.sort).filter(s => s && (s.id === '_sum' || criterionIds.includes(s.id))),
      order: [                                       // global column order, hidden criteria included
        ...asList(initialView.order).filter(id => criterionIds.includes(id)),
        ...criterionIds.filter(id => !asList(initialView.order).includes(id)),
      ],
      open: null,              // key of the selected mark, see "Mark keys"
      variantMemory: null,     // variant to keep when moving left or right…
      variantMemoryRow: null,  // …in this candidate's row
      drag: null,              // id of the criterion being dragged
      x: 0,                    // horizontal scroll
      showMarkdown: false,     // markdown export shown under the table
      flash: null,             // error message from the last action
    };


    // ── Markdown ──────────────────────────────────────────────────────────

    const escapeHtml = s => String(s ?? '').replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
    const link = (url, text) => `<a href="${url}" target="_blank" rel="noopener">${text}</a>`;

    // Inline syntax, on text already escaped.
    function inlineMarkdown(html) {
      return html
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
        .replace(/(^|[^\w*])[_*]([^_*\s][^_*]*)[_*](?![\w*])/g, '$1<i>$2</i>')
        .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, (m, text, url) => link(url, text))
        .replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, (m, before, url) => before + link(url, url));
    }

    // Paragraphs, lists, quotes, headings and rules, on text already escaped.
    function markdownBlocks(text) {
      let html = '', kind = null, lines = [];
      const flush = () => {
        if (lines.length) {
          if (kind === 'list') html += '<ul>' + lines.map(l => '<li>' + inlineMarkdown(l) + '</li>').join('') + '</ul>';
          else if (kind === 'quote') html += '<blockquote>' + lines.map(inlineMarkdown).join('<br>') + '</blockquote>';
          else html += '<p>' + lines.map(inlineMarkdown).join('<br>') + '</p>';
        }
        kind = null;
        lines = [];
      };
      for (const line of text.split('\n')) {
        let m;
        if (!line.trim()) { flush(); continue; }
        if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) { flush(); html += '<hr>'; continue; }
        if ((m = line.match(/^(#{1,6})\s+(.*)/))) {
          flush();
          html += `<div class="ct-heading ct-heading-${Math.min(m[1].length, 3)}">${inlineMarkdown(m[2])}</div>`;
          continue;
        }
        let lineKind = 'text', content = line;
        if ((m = line.match(/^\s*[-*] (.*)/))) { lineKind = 'list'; content = m[1]; }
        else if ((m = line.match(/^&gt;\s?(.*)/))) { lineKind = 'quote'; content = m[1]; }
        if (kind !== lineKind) flush();
        kind = lineKind;
        lines.push(content);
      }
      flush();
      return html;
    }

    function markdown(text, inline) {
      const html = escapeHtml(text);
      if (inline) return inlineMarkdown(html);
      // Fenced code blocks split the text into: text, language, code, text, language, code, …
      const parts = html.split(/```([\w+-]*)\n([\s\S]*?)\n?```/);
      let out = '';
      for (let i = 0; i < parts.length; i += 3) {
        out += markdownBlocks(parts[i]);
        if (i + 2 < parts.length) {
          const language = parts[i + 1] ? ` class="language-${parts[i + 1]}"` : '';
          out += `<pre class="ct-code-block"><code${language}>${parts[i + 2]}</code></pre>`;
        }
      }
      return out;
    }

    // Colors the code blocks that name their language, once highlight.js is loaded.
    function highlightCode() {
      if (!root.querySelector(CODE_TO_COLOR)) return;
      loadHighlighter().then(hljs => root.querySelectorAll(CODE_TO_COLOR).forEach(block => {
        try { hljs.highlightElement(block); } catch (e) {}
      }), () => {});
    }


    // ── Criteria and marks ────────────────────────────────────────────────

    const criterion = id => DATA.criteria.find(c => c.id === id);
    const isRated = c => c.type === 'grade' || c.type === 'check';
    const orderedCriteria = () => state.order.map(criterion);
    const visibleCriteria = () => orderedCriteria().filter(c => !state.hidden.has(c.id));
    const constraintClass = c => c.hard ? 'ct-hard' : c.soft ? 'ct-soft' : '';
    const constraintText = c => c.hard ? 'hard constraint' : c.soft ? 'soft constraint' : '';
    const levelOf = scaleKey => SCALE[scaleKey].level;
    const scaleKeyOf = level => level == null ? 'unknown' : SCALE_KEYS.find(k => SCALE[k].level === level);

    // What a cell shows: a scale key for ratings, an emoji otherwise, and the answer behind it.
    function markOf(c, cell) {
      const v = cell ? cell.v : null;
      if (c.type === 'grade') return { scale: SCALE[v] ? v : 'unknown' };
      if (c.type === 'check') return {
        scale: v == null ? 'unknown' : v ? (c.hard ? 'perfect' : 'good') : (c.hard ? 'incompatible' : 'bad'),
        answer: v == null ? null : v ? 'yes' : 'no',
      };
      if (c.type === 'bool') return { emoji: v == null ? '❔' : v ? '✅' : '❌', answer: v == null ? 'unknown' : v ? 'yes' : 'no' };
      const option = v != null && c.options && c.options[v];
      return option ? { category: v, emoji: option.emoji, answer: option.label } : { emoji: '❔', answer: 'unknown' };
    }
    const markEmoji = m => m.scale ? SCALE[m.scale].emoji : m.emoji;
    const markLabel = m => m.scale ? SCALE[m.scale].label + (m.answer ? ' · ' + m.answer : '') : m.answer;
    const markColor = m => m && m.scale ? SCALE[m.scale].color : '';


    // ── Candidates, variants, filtering and sorting ───────────────────────

    // The variants of a candidate (the candidate itself when it has none); a variant's cells override the candidate's.
    const variantsOf = cd => (cd.variants && cd.variants.length ? cd.variants : [{}]).map((v, index) => ({
      candidate: cd,
      variant: v,
      index,
      name: v.name || null,
      cell: id => (v.cells && v.cells[id]) || (cd.cells && cd.cells[id]) || null,
    }));

    // A variant's summary is its worst visible rating; a candidate's is its best variant's.
    function variantSummary(u) {
      let worst = null;
      for (const c of visibleCriteria()) {
        if (!isRated(c)) continue;
        const level = levelOf(markOf(c, u.cell(c.id)).scale);
        if (level != null) worst = worst == null ? level : Math.min(worst, level);
      }
      return worst;
    }
    function candidateSummary(variants) {
      const levels = variants.map(variantSummary).filter(l => l != null);
      return levels.length ? Math.max(...levels) : null;
    }

    // Hidden by the legend: some visible cell has a mark that is switched off.
    function isFilteredOut(u) {
      if (variantSummary(u) == null && state.off.has('unknown')) return true;
      for (const c of visibleCriteria()) {
        const m = markOf(c, u.cell(c.id));
        if (m.scale && state.off.has(m.scale)) return true;
        if (m.category != null && state.off.has('cat:' + c.id + ':' + m.category)) return true;
      }
      return false;
    }

    function sortValue(u, id) {
      if (id === '_sum') return variantSummary(u);
      const c = criterion(id), cell = u.cell(id), m = markOf(c, cell);
      if (m.scale) return levelOf(m.scale);
      if (c.type === 'bool') return cell && cell.v != null ? (cell.v ? 1 : 0) : null;
      return m.category == null ? null : -Object.keys(c.options).indexOf(m.category);
    }
    const activeSort = () => state.sort.filter(s => s.id === '_sum' || !state.hidden.has(s.id));

    // Lexicographic on the sort keys, the first one first; unknown values always go last.
    function compareVariants(a, b) {
      for (const s of activeSort()) {
        const x = sortValue(a, s.id), y = sortValue(b, s.id);
        if (x === y) continue;
        if (x == null) return 1;
        if (y == null) return -1;
        return s.dir === 'down' ? y - x : x - y;
      }
      return 0;
    }

    // The rows shown: { candidate, ci: its index in the data, variants: the ones shown, sorted }.
    function rows() {
      const out = [];
      DATA.candidates.forEach((cd, ci) => {
        const variants = variantsOf(cd).filter(u => !isFilteredOut(u)).sort((a, b) => compareVariants(a, b) || a.index - b.index);
        if (variants.length) out.push({ candidate: cd, ci, variants });
      });
      return out.sort((A, B) => compareVariants(A.variants[0], B.variants[0]) || A.ci - B.ci);
    }

    const hasManyVariants = r => r.variants.length > 1;
    const ownsCell = (u, id) => !!(u.name && u.variant.cells && u.variant.cells[id]);

    // A cell has one shared line when the variants shown agree, else one line per variant.
    function cellLines(r, c) {
      const lines = r.variants.map(u => {
        const cell = u.cell(c.id);
        return { u, cell, mark: markOf(c, cell) };
      });
      const signature = l => JSON.stringify([l.mark, l.cell && l.cell.t]);
      return lines.every(l => signature(l) === signature(lines[0])) ? [{ ...lines[0], same: true }] : lines;
    }


    // ── Mark keys and keyboard navigation ─────────────────────────────────

    // Mark keys, as stored in state.open:
    //   n|<candidate>|<variant, or -1>                  a candidate's or a variant's summary
    //   c|<candidate>|<variant>|<criterion>|<0 or 1>    a cell line; 1 when the line is that variant's own
    const cellKey = (r, c, l) => `c|${r.ci}|${l.u.index}|${c.id}|${!l.same || (r.variants.length === 1 && ownsCell(l.u, c.id)) ? 1 : 0}`;
    const nameItems = r => hasManyVariants(r)
      ? [{ key: `n|${r.ci}|-1`, vi: null }, ...r.variants.map(u => ({ key: `n|${r.ci}|${u.index}`, vi: u.index }))]
      : [{ key: `n|${r.ci}|${r.variants[0].name ? r.variants[0].index : -1}`, vi: null }];

    // The marks of a column, top to bottom (column 0 holds the names); `vi` is the variant a mark is specific to.
    const columnItems = (r, col, V) => col
      ? cellLines(r, V[col - 1]).map(l => ({ key: cellKey(r, V[col - 1], l), vi: l.same ? null : l.u.index }))
      : nameItems(r);

    function locate(key) {
      const R = rows(), V = visibleCriteria();
      for (let ri = 0; ri < R.length; ri++) {
        for (let col = 0; col <= V.length; col++) {
          const items = columnItems(R[ri], col, V), i = items.findIndex(x => x.key === key);
          if (i >= 0) return { R, V, ri, col, i, items };
        }
      }
      return null;
    }

    // Up and down walk the column; left and right stay in the row, on the remembered variant when the cell splits.
    function navigate(dx, dy) {
      const p = locate(state.open);
      if (!p) return false;
      const { R, V } = p;
      let { ri, col, i, items } = p;
      const r = R[ri], current = items[i];
      if (state.variantMemoryRow !== r.ci) {
        state.variantMemoryRow = r.ci;
        state.variantMemory = current.vi;
      }
      if (dy) {
        i += dy;
        if (i < 0 || i >= items.length) {
          ri += dy;
          if (ri < 0 || ri >= R.length) return false;
          items = columnItems(R[ri], col, V);
          i = dy > 0 ? 0 : items.length - 1;
        }
        const target = items[i];
        state.open = target.key;
        state.variantMemoryRow = R[ri].ci;
        state.variantMemory = target.vi;
        return true;
      }
      if (col === 0 && dx < 0) {
        // from a variant's name, left goes to the candidate's
        if (current.vi == null) return false;
        state.open = items[0].key;
        state.variantMemory = null;
        return true;
      }
      const nextCol = col + dx;
      if (nextCol < 0 || nextCol > V.length) return false;
      const next = columnItems(r, nextCol, V);
      const target = (state.variantMemory != null && next.find(x => x.vi === state.variantMemory)) || next[0];
      state.open = target.key;
      return true;
    }


    // ── HTML ──────────────────────────────────────────────────────────────

    const markHtml = (emoji, key, tip, color) =>
      `<span class="ct-mark${state.open === key ? ' ct-selected' : ''}" data-open="${key}"` +
      (color ? ` style="--ct-halo-color:${color}"` : '') +
      ` title="${escapeHtml(tip)}\nClick for details, then arrows to move">${emoji}</span>`;

    function cellHtml(r, c) {
      return cellLines(r, c).map(l =>
        `<div class="ct-line">${markHtml(markEmoji(l.mark), cellKey(r, c, l), markLabel(l.mark), markColor(l.mark))}<span>` +
        (!l.same && l.u.name ? `<span class="ct-muted">${escapeHtml(l.u.name)}:</span> ` : '') +
        markdown(l.cell && l.cell.t, true) +
        '</span></div>'
      ).join('');
    }

    function nameHtml(r) {
      const cd = r.candidate;
      const name = cd.url ? link(escapeHtml(cd.url), escapeHtml(cd.name)) : escapeHtml(cd.name);
      const summary = SCALE[scaleKeyOf(candidateSummary(r.variants))];
      const onlyVariant = !hasManyVariants(r) && r.variants[0].name ? r.variants[0] : null;
      let html = '<div class="ct-line">' +
        markHtml(summary.emoji, `n|${r.ci}|${onlyVariant ? onlyVariant.index : -1}`, summary.label + ' · summary', summary.color) +
        `<div><span style="font-weight:500">${name}</span>` +
        (onlyVariant ? ` <span class="ct-dim">›</span> ${escapeHtml(onlyVariant.name)}` : '') +
        (cd.sub ? `<div class="ct-muted" style="font-size:12px">${escapeHtml(cd.sub)}</div>` : '') +
        '</div></div>';
      if (hasManyVariants(r)) {
        html += r.variants.map(u => {
          const s = SCALE[scaleKeyOf(variantSummary(u))];
          return '<div class="ct-line" style="padding-left:14px;font-size:12px">' +
            markHtml(s.emoji, `n|${r.ci}|${u.index}`, s.label + ' · summary', s.color) +
            `<span>${escapeHtml(u.name)}</span></div>`;
        }).join('');
      }
      return html;
    }

    function sortArrowHtml(id) {
      const S = activeSort(), i = S.findIndex(s => s.id === id);
      if (i < 0) return '';
      return `<span class="ct-sort-arrow" data-flip="${id}" title="Click: flip the direction\nMiddle click: stop sorting by it">${S[i].dir === 'down' ? '↓' : '↑'}</span>` +
        (S.length > 1 ? `<small>${i + 1}</small>` : '');
    }

    function headerHtml(id, cls, label, extra, tip, draggable) {
      return `<th class="${cls} ct-sortable" data-sort="${id}"${draggable ? ` draggable="true" data-drag="${id}"` : ''} title="${escapeHtml(tip)}">` +
        `<div class="ct-head"><span class="ct-sort-slot">${sortArrowHtml(id)}</span><div>${label}${extra}</div></div>` +
        (draggable ? `<span class="ct-hide" data-hide="${id}" title="Hide this criterion">×</span>` : '') +
        '</th>';
    }

    // The legend marks that can appear with the visible criteria.
    function legendKeys() {
      const V = visibleCriteria(), shown = new Set();
      if (V.some(c => c.type === 'grade')) ['perfect', 'good', 'passing', 'weak', 'bad'].forEach(k => shown.add(k));
      if (V.some(c => c.type === 'check' && !c.hard)) ['good', 'bad'].forEach(k => shown.add(k));
      if (V.some(c => c.type === 'check' && c.hard)) ['perfect', 'incompatible'].forEach(k => shown.add(k));
      if (V.some(c => c.hard)) shown.add('incompatible');
      DATA.candidates.forEach(cd => variantsOf(cd).forEach(u => {
        if (variantSummary(u) == null) shown.add('unknown');
        V.forEach(c => {
          const k = markOf(c, u.cell(c.id)).scale;
          if (k === 'unknown' || k === 'irrelevant') shown.add(k);
        });
      }));
      const categories = V.filter(c => c.type === 'cat').map(c => ({
        criterion: c,
        options: Object.entries(c.options).map(([k, o]) => ({ key: 'cat:' + c.id + ':' + k, emoji: o.emoji, label: o.label })),
      }));
      return { scale: SCALE_KEYS.filter(k => shown.has(k)), categories };
    }

    function legendHtml() {
      const L = legendKeys();
      const item = (key, emoji, label) =>
        `<span class="ct-chip${state.off.has(key) ? ' ct-off' : ''}" data-mark="${key}"` +
        ` title="Click: ${state.off.has(key) ? 'show' : 'hide'} the candidates with this mark\nMiddle click: hide them">${emoji} ${escapeHtml(label)}</span>`;
      const group = (keys, label) =>
        `<span class="ct-group" data-group="${keys.join(',')}"` +
        ` title="Click: ${keys.some(k => state.off.has(k)) ? 'show all' : 'hide all'}\nMiddle click: hide all">${escapeHtml(label)}</span>`;

      let html = '';
      if (L.scale.length) {
        html += `<div class="ct-legend-line">${group(L.scale, 'Legend')}${L.scale.map(k => item(k, SCALE[k].emoji, SCALE[k].label)).join('')}</div>`;
      }
      for (const g of L.categories) {
        html += `<div class="ct-legend-line">${group(g.options.map(o => o.key), g.criterion.label)}${g.options.map(o => item(o.key, o.emoji, o.label)).join('')}</div>`;
      }
      const hidden = orderedCriteria().filter(c => state.hidden.has(c.id));
      html += '<div class="ct-legend-line">' +
        `<span class="ct-group" data-group="_criteria" title="Click: ${hidden.length ? 'show' : 'hide'} all criteria\nMiddle click: hide all criteria\nDrop a criterion here to hide it">Hidden criteria</span>` +
        (hidden.length
          ? hidden.map(c => `<span class="ct-chip ct-off ${constraintClass(c)}" draggable="true" data-drag="${c.id}" data-show="${c.id}"` +
              ` title="Click: show this criterion again\nDrag: reorder, or drop on the table to show it there">${escapeHtml(c.label)}</span>`).join('')
          : '<span class="ct-chip ct-muted" style="cursor:default">none</span>') +
        '</div>';
      return html;
    }

    const sourcesHtml = list => list && list.length
      ? '<div style="margin-top:6px;font-size:12px">Sources: ' + list.map(s => typeof s === 'string'
          ? link(escapeHtml(s), escapeHtml(s.replace(/^https?:\/\//, '').slice(0, 60)))
          : link(escapeHtml(s.u), escapeHtml(s.t))).join(' · ') + '</div>'
      : '';

    // Everything the details box and the explore buttons need about the selected mark.
    function selection() {
      const [type, ci, vi, id, own] = state.open.split('|');
      const cd = DATA.candidates[+ci], u = variantsOf(cd)[Math.max(+vi, 0)];
      const variant = +vi >= 0 && cd.variants ? cd.variants[+vi] : null;
      const o = { type, ci: +ci, candidate: cd, variant, u, showVariant: type === 'n' ? !!variant : own === '1' };
      if (type === 'n') {
        const s = SCALE[scaleKeyOf(variant ? variantSummary(u) : candidateSummary(variantsOf(cd)))];
        const subject = variant || cd;
        Object.assign(o, { color: s.color, status: `${s.emoji} ${s.label} · summary`, body: subject.info || '', sources: subject.src });
      } else {
        const c = criterion(id), cell = u.cell(id), mark = markOf(c, cell);
        Object.assign(o, {
          criterion: c, cell, mark,
          color: markColor(mark),
          status: `${markEmoji(mark)} ${markLabel(mark)}`,
          constraint: constraintText(c),
          body: (cell && cell.t) || 'No justification recorded.',
          more: cell && cell.d,
          sources: cell && cell.src,
        });
      }
      o.who = `"${cd.name}"` + (o.showVariant ? ` › "${variant ? variant.name : u.name}"` : '');
      return o;
    }

    function detailsHtml(o) {
      const goTo = (text, key) => `<span class="ct-link" data-goto="${key}" title="Show its details">${escapeHtml(text)}</span>`;
      const aside = s => s ? ` <span class="ct-dim">(${escapeHtml(s)})</span>` : '';
      const nameLink = (name, url) => url ? link(escapeHtml(url), escapeHtml(name)) : escapeHtml(name);
      const cd = o.candidate, variantName = o.variant ? o.variant.name : o.u.name;

      // Title: the selected item links to its page, the items above it to their details.
      let path;
      if (o.type === 'n' && !o.variant) {
        path = [nameLink(cd.name, cd.url) + aside(cd.sub)];
      } else if (o.type === 'n') {
        path = [goTo(cd.name, `n|${o.ci}|-1`), nameLink(variantName, o.variant.url || cd.url) + aside(o.variant.sub || cd.sub)];
      } else {
        path = [goTo(cd.name, `n|${o.ci}|-1`)];
        if (o.showVariant) path.push(goTo(variantName, `n|${o.ci}|${o.u.index}`));
        path.push(escapeHtml(o.criterion.label) + aside(o.criterion.info));
      }

      return `<div class="ct-details"${o.color ? ` style="--ct-halo-color:${o.color}"` : ''}>` +
        '<span class="ct-close" role="button" tabindex="0" data-close="1" aria-label="Close details" title="Close (Esc)">×</span>' +
        `<div style="font-weight:500">${path.join(' <span class="ct-dim">&gt;</span> ')}</div>` +
        `<div class="ct-muted" style="margin:2px 0 6px">${escapeHtml(o.status)}` +
        (o.constraint ? ` · <span class="${constraintClass(o.criterion)}">${o.constraint}</span>` : '') + '</div>' +
        `<div class="ct-markdown">${markdown(o.body)}${o.more ? '<hr>' + markdown(o.more) : ''}</div>` +
        sourcesHtml(o.sources) +
        '</div>';
    }


    // ── Exports ───────────────────────────────────────────────────────────

    function markdownExport() {
      const V = visibleCriteria(), R = rows(), L = legendKeys();
      const text = s => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
      const legend = [
        ...L.scale.map(k => [SCALE[k].emoji, SCALE[k].label]),
        ...L.categories.flatMap(g => g.options.map(o => [o.emoji, o.label])),
      ];
      let out = DATA.title ? `**${text(DATA.title)}**\n\n` : '';
      if (legend.length) {
        out += `| ${legend.map(x => x[0]).join(' | ')} |\n|${'---|'.repeat(legend.length)}\n| ${legend.map(x => x[1]).join(' | ')} |\n\n`;
      }
      out += `| Candidate | ${V.map(c => text(c.label) + (c.hard ? ' (hard)' : '')).join(' | ')} |\n|${'---|'.repeat(V.length + 1)}\n`;
      for (const r of R) {
        const cd = r.candidate, name = cd.url ? `[${text(cd.name)}](${cd.url})` : text(cd.name);
        let head = `${SCALE[scaleKeyOf(candidateSummary(r.variants))].emoji} **${name}**`;
        if (!hasManyVariants(r) && r.variants[0].name) head += ` › ${text(r.variants[0].name)}`;
        if (hasManyVariants(r)) head += r.variants.map(u => `<br>${SCALE[scaleKeyOf(variantSummary(u))].emoji} ${text(u.name)}`).join('');
        const cells = V.map(c => cellLines(r, c)
          .map(l => `${markEmoji(l.mark)} ${!l.same && l.u.name ? '_' + text(l.u.name) + '_: ' : ''}${text(l.cell && l.cell.t)}`)
          .join('<br>'));
        out += `| ${head} | ${cells.join(' | ')} |\n`;
      }
      if (state.hidden.size) {
        out += `\nHidden criteria: ${orderedCriteria().filter(c => state.hidden.has(c.id)).map(c => c.label).join(', ')}.\n`;
      }
      const offMarks = [
        ...L.scale.filter(k => state.off.has(k)).map(k => SCALE[k].emoji),
        ...L.categories.flatMap(g => g.options).filter(o => state.off.has(o.key)).map(o => o.emoji),
      ];
      if (offMarks.length) out += `\nHidden marks: ${offMarks.join(' ')}.\n`;
      return out;
    }

    // The view, as `view` takes it back; empty lists are left out.
    function viewState() {
      const view = {
        order: state.order,
        hidden: orderedCriteria().filter(c => state.hidden.has(c.id)).map(c => c.id),
        off: [...state.off],
        sort: state.sort,
      };
      for (const k of Object.keys(view)) if (!view[k].length) delete view[k];
      return view;
    }

    function send(prompt) {
      const fail = err => { state.flash = 'Could not send: ' + err; render(); };
      try { window.focus(); root.focus({ preventScroll: true }); } catch (e) {}
      setTimeout(() => {
        try {
          const result = sendPrompt(prompt);
          if (result && typeof result.catch === 'function') result.catch(fail);
        } catch (err) { fail(err); }
      }, 30);
    }


    // ── Horizontal scrolling ──────────────────────────────────────────────

    function setScroll(x) {
      const wrap = root.querySelector('.ct-wrap'), table = wrap && wrap.querySelector('table');
      if (!table) return;
      state.x = Math.max(0, Math.min(x, table.offsetWidth - wrap.clientWidth));
      table.style.setProperty('--ct-scroll', state.x + 'px');
    }

    function syncScrollbar() {
      const wrap = root.querySelector('.ct-wrap'), bar = root.querySelector('.ct-scrollbar');
      if (!wrap || !bar) return;
      const table = wrap.querySelector('table');
      bar.style.display = table.offsetWidth > wrap.clientWidth ? '' : 'none';
      bar.firstChild.style.width = table.offsetWidth + 'px';
      setScroll(state.x);
      bar.scrollLeft = state.x;
    }

    function revealSelection() {
      const mark = root.querySelector('.ct-mark.ct-selected');
      if (!mark) return;
      const td = mark.closest('td');
      if (td && !td.classList.contains('ct-name')) {
        const wrap = root.querySelector('.ct-wrap'), nameColumn = root.querySelector('thead th.ct-name');
        const cell = td.getBoundingClientRect(), view = wrap.getBoundingClientRect(), left = view.left + nameColumn.offsetWidth;
        let dx = 0;
        if (cell.left < left) dx = cell.left - left;
        else if (cell.right > view.right) dx = cell.right - view.right;
        if (dx) {
          setScroll(state.x + dx);
          root.querySelector('.ct-scrollbar').scrollLeft = state.x;
        }
      }
      mark.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }


    // ── Render ────────────────────────────────────────────────────────────

    function render() {
      const V = visibleCriteria(), R = rows(), sel = state.open ? selection() : null;
      const [openType, openCi, , openId] = state.open ? state.open.split('|') : [];

      let html = DATA.title ? `<div class="ct-title">${escapeHtml(DATA.title)}</div>` : '';
      html += `<div class="ct-legend">${legendHtml()}</div>`;

      html += `<div class="ct-wrap"><table style="width:max(100%,calc(var(--ct-first-col) + ${V.length} * var(--ct-col)))">`;
      html += `<colgroup><col style="width:var(--ct-first-col)">${V.map(() => '<col>').join('')}</colgroup>`;
      html += '<thead><tr>';
      html += headerHtml('_sum', 'ct-name', 'Candidate', '', 'Click: sort by summary first (again to stop)');
      html += V.map(c => headerHtml(
        c.id, '', escapeHtml(c.label),
        constraintText(c) ? `<span class="ct-constraint ${constraintClass(c)}">${constraintText(c)}</span>` : '',
        (c.info ? c.info + '\n' : '') + 'Click: sort by it first (again to stop)\nDrag: reorder, or drop on the legend to hide\nMiddle click: hide',
        true,
      )).join('');
      html += '</tr></thead><tbody>';
      for (const r of R) {
        const selectedRow = +openCi === r.ci;
        html += `<tr${selectedRow && openType === 'n' ? ' class="ct-row-selected"' : ''}><td class="ct-name">${nameHtml(r)}</td>`;
        html += V.map(c => `<td${selectedRow && openType === 'c' && openId === c.id ? ' class="ct-cell-selected"' : ''}>${cellHtml(r, c)}</td>`).join('');
        html += '</tr>';
      }
      if (!R.length) html += `<tr><td class="ct-name ct-muted">All candidates are hidden by the legend.</td>${V.map(() => '<td></td>').join('')}</tr>`;
      html += '</tbody></table></div>';
      html += '<div class="ct-scrollbar"><div></div></div>';

      html += sel ? detailsHtml(sel) : `<div class="ct-hint">${HINT}</div>`;

      const halo = sel && sel.color ? ` style="--ct-halo-color:${sel.color}"` : '';
      html += '<div class="ct-actions">';
      html += canPrompt
        ? '<button data-action="markdown" title="Send this view (filters, order, hidden criteria) to the chat as a markdown table">Export as markdown ↗</button>'
        : '<button data-action="markdown" title="Show this view as a markdown table">Show as markdown</button>';
      if (canPrompt) {
        html += '<button data-action="artifact" title="Ask Claude to publish the whole report as a shareable artifact page, keeping this table\'s view">Export as artifact ↗</button>';
      }
      if (canPrompt && sel) {
        html += `<button class="ct-halo-button" data-action="candidate"${halo} title="Ask Claude to research ${escapeHtml(sel.who)} in more depth">Explore candidate ↗</button>`;
      }
      if (canPrompt && sel && sel.type === 'c') {
        html += `<button class="ct-halo-button" data-action="evaluation"${halo} title="Ask Claude to dig into the &quot;${escapeHtml(sel.criterion.label)}&quot; rating of ${escapeHtml(sel.who)}">Explore evaluation ↗</button>`;
      }
      if (state.flash) html += `<span class="ct-muted" style="align-self:center;font-size:12px">${escapeHtml(state.flash)}</span>`;
      html += '</div>';
      if (state.showMarkdown) html += `<pre class="ct-markdown-export">${escapeHtml(markdownExport())}</pre>`;
      html += '<div class="ct-drop-line"></div>';

      root.innerHTML = html;

      const wrap = root.querySelector('.ct-wrap'), bar = root.querySelector('.ct-scrollbar');
      bar.onscroll = () => setScroll(bar.scrollLeft);
      wrap.onwheel = e => {
        const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
        if (!d || bar.style.display === 'none') return;
        e.preventDefault();
        bar.scrollLeft += d;
      };
      syncScrollbar();
      highlightCode();
    }


    // ── Clicks, middle clicks and keys ────────────────────────────────────

    const closeIfHidden = () => {
      if (state.open && state.hidden.has(state.open.split('|')[3])) state.open = null;
    };

    root.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      state.flash = null;
      const el = e.target.closest('[data-flip],[data-hide],[data-sort],[data-show],[data-group],[data-mark],[data-open],[data-goto],[data-action],[data-close]');
      if (!el) return;
      const d = el.dataset;

      if (d.hide) {
        state.hidden.add(d.hide);
        closeIfHidden();
      } else if (d.flip) {
        const s = state.sort.find(s => s.id === d.flip);
        if (s) s.dir = s.dir === 'down' ? 'up' : 'down';
      } else if (d.sort) {
        // make it the primary sort key, or stop sorting by it if it already is
        const i = state.sort.findIndex(s => s.id === d.sort), first = activeSort()[0];
        if (first && first.id === d.sort) state.sort.splice(i, 1);
        else state.sort.unshift(i < 0 ? { id: d.sort, dir: 'down' } : state.sort.splice(i, 1)[0]);
      } else if (d.show) {
        state.hidden.delete(d.show);
      } else if (d.group === '_criteria') {
        if (state.hidden.size) state.hidden.clear();
        else { criterionIds.forEach(id => state.hidden.add(id)); closeIfHidden(); }
      } else if (d.group) {
        const keys = d.group.split(',');
        if (keys.some(k => state.off.has(k))) keys.forEach(k => state.off.delete(k));
        else keys.forEach(k => state.off.add(k));
      } else if (d.mark) {
        if (state.off.has(d.mark)) state.off.delete(d.mark);
        else state.off.add(d.mark);
      } else if (d.open) {
        if (state.open === d.open) state.open = null;
        else {
          const p = locate(d.open);
          state.open = d.open;
          state.variantMemoryRow = +d.open.split('|')[1];
          state.variantMemory = p ? p.items[p.i].vi : null;
        }
        root.focus({ preventScroll: true });
      } else if (d.goto) {
        state.open = d.goto;
      } else if (d.close) {
        state.open = null;
      } else if (d.action === 'markdown') {
        if (canPrompt) send('Print this comparison view as markdown, as is:\n\n' + markdownExport());
        else state.showMarkdown = !state.showMarkdown;
      } else if (d.action === 'artifact') {
        send(`Publish the comparison report as an artifact, with all its tables. Restore the "${title}" table in this view state: ` + JSON.stringify(viewState()));
      } else if (d.action === 'candidate') {
        send(`Explore ${selection().who} in more depth, from the "${title}" comparison.`);
      } else if (d.action === 'evaluation') {
        const o = selection();
        send(`Explore the "${o.criterion.label}" evaluation of ${o.who}, from the "${title}" comparison. ` +
          `Current rating: ${markEmoji(o.mark)} ${markLabel(o.mark)}, "${(o.cell && o.cell.t) || ''}". Verify it and go deeper.`);
      }
      render();
    });

    // Middle click hides what it lands on, and never shows anything back.
    const MIDDLE_CLICK_TARGETS = '[data-flip],[data-group],[data-mark],[data-drag]';
    root.addEventListener('mousedown', e => {
      if (e.button === 1 && e.target.closest(MIDDLE_CLICK_TARGETS)) e.preventDefault();  // no autoscroll
    });
    root.addEventListener('auxclick', e => {
      if (e.button !== 1) return;
      const el = e.target.closest(MIDDLE_CLICK_TARGETS);
      if (!el) return;
      e.preventDefault();
      const d = el.dataset;
      if (d.flip) state.sort = state.sort.filter(s => s.id !== d.flip);
      else if (d.group === '_criteria') criterionIds.forEach(id => state.hidden.add(id));
      else if (d.group) d.group.split(',').forEach(k => state.off.add(k));
      else if (d.mark) state.off.add(d.mark);
      else if (d.drag) state.hidden.add(d.drag);
      closeIfHidden();
      render();
    });

    const ARROWS = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    root.addEventListener('keydown', e => {
      if (!state.open) return;
      if (e.key === 'Escape') { state.open = null; render(); return; }
      const dir = ARROWS[e.key];
      if (!dir) return;
      e.preventDefault();
      if (navigate(dir[0], dir[1])) { render(); revealSelection(); }
    });


    // ── Dragging criteria ─────────────────────────────────────────────────

    // Where a dragged criterion would land: the table shows it, the legend hides it.
    // `ref` is the criterion it goes next to, and x, top and height place the drop line.
    function dropTarget(e) {
      const target = e.target.closest ? e.target : null;
      if (!target) return null;

      if (target.closest('.ct-wrap')) {
        const view = root.querySelector('.ct-wrap').getBoundingClientRect();
        const nameColumn = root.querySelector('thead th.ct-name').getBoundingClientRect();
        const headers = [...root.querySelectorAll('thead th[data-drag]')].filter(th => th.dataset.drag !== state.drag);
        let ref = null, x = null;
        for (const th of headers) {
          const r = th.getBoundingClientRect();
          if (e.clientX < r.left + r.width / 2) { ref = th.dataset.drag; x = r.left; break; }
        }
        if (ref == null) x = headers.length ? headers[headers.length - 1].getBoundingClientRect().right : nameColumn.right;
        return { zone: 'table', ref, x: Math.min(Math.max(x, nameColumn.right), view.right), top: view.top, height: view.height };
      }

      if (target.closest('.ct-legend')) {
        const chips = [...root.querySelectorAll('.ct-legend .ct-chip[data-show]')].filter(c => c.dataset.show !== state.drag);
        if (!chips.length) {
          const r = root.querySelector('.ct-legend [data-group="_criteria"]').getBoundingClientRect();
          return { zone: 'legend', ref: null, x: r.right + 5, top: r.top, height: r.height };
        }
        let best = null, bestDistance = Infinity;
        for (const chip of chips) {
          const r = chip.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
          const distance = Math.hypot(e.clientX - cx, (e.clientY - cy) * 2);
          if (distance < bestDistance) { bestDistance = distance; best = { chip, r, after: e.clientX > cx }; }
        }
        return {
          zone: 'legend', ref: best.chip.dataset.show, after: best.after,
          x: best.after ? best.r.right + 4 : best.r.left - 4, top: best.r.top, height: best.r.height,
        };
      }
      return null;
    }

    function showDropLine(t) {
      const line = root.querySelector('.ct-drop-line');
      if (!line) return;
      if (!t) { line.style.display = 'none'; return; }
      const R = root.getBoundingClientRect();
      Object.assign(line.style, { display: 'block', left: (t.x - R.left) + 'px', top: (t.top - R.top) + 'px', height: t.height + 'px' });
    }

    function applyDrop(id, t) {
      const order = state.order;
      const move = (ref, after) => {
        order.splice(order.indexOf(id), 1);
        order.splice(order.indexOf(ref) + (after ? 1 : 0), 0, id);
      };
      if (t.zone === 'table') {
        if (t.ref) move(t.ref, false);
        else {
          const others = visibleCriteria().filter(c => c.id !== id);
          if (others.length) move(others[others.length - 1].id, true);
        }
        state.hidden.delete(id);
      } else {
        if (t.ref) move(t.ref, t.after);
        state.hidden.add(id);
      }
    }

    root.addEventListener('dragstart', e => {
      const source = e.target.closest && e.target.closest('[data-drag]');
      if (!source) return;
      state.drag = source.dataset.drag;
      source.classList.add('ct-dragged');
      // the drag image: the criterion as a plain legend chip, just right of the cursor
      const ghost = document.createElement('span');
      ghost.className = 'ct-ghost';
      ghost.innerHTML = `<span class="ct-chip ${constraintClass(criterion(state.drag))}">${escapeHtml(criterion(state.drag).label)}</span>`;
      root.appendChild(ghost);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', state.drag);
      try { e.dataTransfer.setDragImage(ghost, 0, 10); } catch (err) {}
      setTimeout(() => ghost.remove(), 0);
    });
    root.addEventListener('dragover', e => {
      if (!state.drag) return;
      const t = dropTarget(e);
      showDropLine(t);
      if (t) e.preventDefault();
    });
    root.addEventListener('dragleave', e => {
      if (!root.contains(e.relatedTarget)) showDropLine(null);
    });
    root.addEventListener('drop', e => {
      if (!state.drag) return;
      const t = dropTarget(e);
      showDropLine(null);
      if (!t) return;
      e.preventDefault();
      applyDrop(state.drag, t);
      state.drag = null;
      closeIfHidden();
      render();
    });
    root.addEventListener('dragend', () => {
      state.drag = null;
      showDropLine(null);
      root.querySelectorAll('.ct-dragged').forEach(el => el.classList.remove('ct-dragged'));
    });

    if (window.ResizeObserver) new ResizeObserver(syncScrollbar).observe(root);
    render();
  }

  function mountAll() {
    if (!document.getElementById('ct-style')) {
      const style = document.createElement('style');
      style.id = 'ct-style';
      style.textContent = CSS;
      document.head.appendChild(style);
    }
    for (const root of document.querySelectorAll('.ct')) {
      const json = root.querySelector(':scope > script[type="application/json"]');
      if (!json || root.dataset.ctMounted) continue;
      root.dataset.ctMounted = 'true';
      if (!root.hasAttribute('tabindex')) root.tabIndex = 0;
      try {
        mount(root, JSON.parse(json.textContent));
      } catch (err) {
        root.textContent = 'Could not render the comparison table: ' + err.message;
      }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountAll);
  else mountAll();
  window.CompareTable = { mountAll };
})();
