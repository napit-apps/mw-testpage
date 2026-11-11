(() => {
  'use strict';
  const root = document.querySelector('[data-portfolio]');
  if (!root) return;
  const controls = root.querySelector('[data-filters]');
  const buttons = Array.from(controls.querySelectorAll('[data-filter]'));
  const cards = Array.from(root.querySelectorAll('[data-tags]'));
  const status = root.querySelector('[data-count]');
  const allowed = new Set(buttons.map(button => button.dataset.filter));
  const readFilter = () => {
    const value = new URL(window.location.href).searchParams.get('thema');
    return allowed.has(value) ? value : 'all';
  };
  const applyFilter = value => {
    let count = 0;
    cards.forEach(card => {
      const visible = value === 'all' || card.dataset.tags.split(' ').includes(value);
      card.hidden = !visible;
      if (visible) count += 1;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === value)));
    status.textContent = status.dataset.format.replace('%count%', String(count));
  };
  controls.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button || !controls.contains(button)) return;
    const value = button.dataset.filter;
    if (!allowed.has(value) || value === readFilter()) return;
    const url = new URL(window.location.href);
    if (value === 'all') url.searchParams.delete('thema');
    else url.searchParams.set('thema', value);
    window.history.pushState(null, '', url);
    applyFilter(value);
  });
  window.addEventListener('popstate', () => applyFilter(readFilter()));
  window.addEventListener('pageshow', () => applyFilter(readFilter()));
  applyFilter(readFilter());
  controls.hidden = false;
})();
