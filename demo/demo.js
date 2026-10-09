// Renders the tables of demo/data.js where this script is included, then loads the table script.
// The keys of the page address, each changed alone by the demo bar, the others being left untouched:
//   mode=widget|artifact   where the tables are shown: as an inline widget (the default), whose host lets them
//                          prompt the chat through an editable prompt bar, or as an artifact, a page of its own
//   v=<version>            load that release of the table script from jsDelivr (eg. `v=1`) instead of the local one
//   title=<text>           render only the tables whose title contains it
//   theme=light|dark       force the colors of the page, instead of following the system
//   full                   render only the first matching table, as a page of its own: no bar, no margin, nothing else
(() => {
  const here = document.currentScript;
  const params = new URLSearchParams(location.search);
  const mode = params.get('mode') === 'artifact' ? 'artifact' : 'widget';
  const theme = ['light', 'dark'].includes(params.get('theme')) ? params.get('theme') : '';
  const full = params.has('full');
  const wanted = (params.get('title') || '').toLowerCase();
  const tables = window.COMPARE_TABLE_DEMO || [];

  if (theme) document.documentElement.dataset.theme = theme;
  document.body.classList.toggle('full', full);
  if (mode === 'widget' && !full) document.body.classList.add('widget-mode');

  const el = (tag, props, ...children) => {
    const node = Object.assign(document.createElement(tag), props);
    node.append(...children);
    return node;
  };

  // The address with some keys changed (a null value removes one), the others untouched; a flag has no value.
  const address = changes => {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(changes)) value === null ? next.delete(key) : next.set(key, value);
    const query = next.toString().replace(/(^|&)full=(?=&|$)/g, '$1full');
    return location.pathname + (query ? '?' + query : '');
  };

  // The demo bar: `Mode: widget, artifact · Table script: local, v1`, the theme switch, then `Tables: all, …` below.
  const bar = document.querySelector('.demo-bar');
  if (full) bar.remove();
  else {
    const option = ([text, changes, current, tip]) => el('a', { href: address(changes), textContent: text, ...(current ? { ariaCurrent: 'true' } : {}), ...(tip ? { title: tip } : {}) });
    const group = (label, options) => el('span', {}, label + ': ', ...options.flatMap((o, i) => [i ? ', ' : '', option(o)]));
    const title = d => d.title.toLowerCase();
    bar.append(
      el('div', { className: 'demo-line' },
        el('span', {},
          group('Mode', [['widget', { mode: 'widget' }, mode === 'widget'], ['artifact', { mode: 'artifact' }, mode === 'artifact']]),
          ' · ',
          group('Table script', [['local', { v: null }, !params.has('v')], ['v1', { v: '1' }, params.get('v') === '1', 'Use ?v=1.Y or ?v=1.Y.Z to pin to a specific version']])),
        el('span', { className: 'demo-switch', role: 'group', ariaLabel: 'Colors' },
          ...[['light', { theme: 'light' }, theme === 'light'], ['default', { theme: null }, !theme], ['dark', { theme: 'dark' }, theme === 'dark']].map(option))),
      el('div', { className: 'demo-line' },
        group('Tables', [['all', { title: null }, !wanted], ...tables.map(d => [title(d), { title: title(d) }, wanted === title(d)])])),
    );
  }

  const matching = tables.filter(d => (d.title || '').toLowerCase().includes(wanted));
  for (const data of full ? matching.slice(0, 1) : matching) {
    const root = el('div', { className: 'ct' }, el('script', { type: 'application/json', textContent: JSON.stringify(data) }));
    root.style.paddingTop = '4px';
    const holder = el('div', { className: 'demo-table' });
    if (!full) {
      holder.append(el('a', {
        className: 'demo-full', textContent: 'full page ↗', title: 'Show only this table, without the demo bar',
        href: address({ full: '', title: data.title.toLowerCase() }),
      }));
    }
    holder.append(root);
    here.before(holder);
  }

  // The host of an inline widget lets the table prompt the chat: here, the action buttons fill an editable prompt bar,
  // except on a full page, where nothing else is shown and the prompts only go to the console.
  if (mode === 'widget' && full) window.sendPrompt = text => console.log('sendPrompt:', text);
  else if (mode === 'widget') {
    const field = el('textarea', { rows: 1, placeholder: 'Message Claude… (the action buttons of a table fill this bar)' });
    const clear = el('input', { type: 'checkbox', checked: true });
    const grow = () => { field.style.height = 'auto'; field.style.height = field.scrollHeight + 'px'; };
    field.addEventListener('input', grow);
    window.sendPrompt = text => {
      field.value = clear.checked || !field.value ? text : field.value + '\n\n' + text;
      grow();
    };
    document.body.append(el('form', { className: 'demo-prompt', onsubmit: e => e.preventDefault() },
      field,
      el('div', { className: 'demo-foot' },
        el('label', {}, clear, ' clear when action adds content'),
        el('span', { className: 'demo-note', textContent: 'Offline demo, not connected to any agent.' }))));
  }

  const version = params.get('v');
  const script = document.createElement('script');
  script.src = version
    ? `https://cdn.jsdelivr.net/gh/cryhot/agent-skill-compare-options@${version}/assets/compare-table.js`
    : new URL('../assets/compare-table.js', here.src).href;
  document.head.appendChild(script);
})();
