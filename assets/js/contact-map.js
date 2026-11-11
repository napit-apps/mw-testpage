(() => {
  'use strict';
  const root = document.querySelector('[data-contact-map]');
  if (!root) return;
  const show = root.querySelector('[data-map-show]');
  const hide = root.querySelector('[data-map-hide]');
  const placeholder = root.querySelector('[data-map-placeholder]');
  const frame = root.querySelector('[data-map-frame]');
  const credit = root.querySelector('[data-map-credit]');
  let timer;
  function reset(restoreFocus) {
    clearTimeout(timer);
    frame.replaceChildren();
    frame.hidden = true;
    frame.removeAttribute('aria-busy');
    placeholder.hidden = false;
    hide.hidden = true;
    credit.hidden = true;
    show.setAttribute('aria-expanded', 'false');
    if (restoreFocus) show.focus();
  }
  show.hidden = false;
  show.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.title = root.querySelector('#map-title').textContent;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.addEventListener('load', () => {
      clearTimeout(timer);
      frame.setAttribute('aria-busy', 'false');
    }, { once: true });
    iframe.addEventListener('error', () => reset(true), { once: true });
    frame.setAttribute('aria-busy', 'true');
    iframe.src = root.dataset.embed;
    frame.replaceChildren(iframe);
    frame.hidden = false;
    placeholder.hidden = true;
    hide.hidden = false;
    credit.hidden = false;
    show.setAttribute('aria-expanded', 'true');
    hide.focus();
    timer = setTimeout(() => reset(true), 20000);
  });
  hide.addEventListener('click', () => reset(true));
  // No stored consent; also clear a restored back/forward cache entry.
  window.addEventListener('pagehide', () => reset(false));
  window.addEventListener('pageshow', () => reset(false));
})();
