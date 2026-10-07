// Renders the tables of demo/data.js where this script is included, then loads the table script:
// the local assets/compare-table.js, or a released one when the page address sets `?table=<version>`,
// eg. `?table=1` for the latest release.
(() => {
  const here = document.currentScript;
  for (const data of window.COMPARE_TABLE_DEMO || []) {
    const root = document.createElement('div');
    root.className = 'ct';
    root.style.paddingTop = '4px';
    const json = document.createElement('script');
    json.type = 'application/json';
    json.textContent = JSON.stringify(data);
    root.appendChild(json);
    here.before(root);
  }

  const version = new URLSearchParams(location.search).get('table');
  const script = document.createElement('script');
  script.src = version
    ? `https://cdn.jsdelivr.net/gh/cryhot/agent-skill-compare-options@${version}/assets/compare-table.js`
    : new URL('../assets/compare-table.js', here.src).href;
  document.head.appendChild(script);
})();
