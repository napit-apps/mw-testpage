(() => {
  'use strict';

  const carousel = document.querySelector('[data-testimonials]');
  if (!carousel) return;

  const track = carousel.querySelector('.mw-testimonials-track');
  const slides = Array.from(track.children);
  const controls = carousel.querySelector('[data-testimonial-controls]');
  const previous = controls.querySelector('[data-previous]');
  const next = controls.querySelector('[data-next]');
  const position = controls.querySelector('[data-position]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let scrollTimer;

  const update = () => {
    position.textContent = position.dataset.format
      .replace('{current}', String(current + 1))
      .replace('{total}', String(slides.length));
    previous.setAttribute('aria-disabled', String(current === 0));
    next.setAttribute('aria-disabled', String(current === slides.length - 1));
  };

  const move = (index) => {
    current = Math.max(0, Math.min(slides.length - 1, index));
    track.scrollTo({
      left: slides[current].offsetLeft - slides[0].offsetLeft,
      behavior: reducedMotion.matches ? 'instant' : 'smooth',
    });
    update();
  };

  previous.addEventListener('click', () => move(current - 1));
  next.addEventListener('click', () => move(current + 1));
  track.addEventListener('keydown', (event) => {
    if (event.target !== track) return;
    const targets = {
      ArrowLeft: current - 1,
      ArrowRight: current + 1,
      Home: 0,
      End: slides.length - 1,
    };
    if (!(event.key in targets)) return;
    event.preventDefault();
    move(targets[event.key]);
  });

  // Native touch/trackpad scrolling remains available; announce the settled slide.
  track.addEventListener('scroll', () => {
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      let nearest = 0;
      let distance = Infinity;
      slides.forEach((slide, index) => {
        const offset = slide.offsetLeft - slides[0].offsetLeft;
        const difference = Math.abs(offset - track.scrollLeft);
        if (difference < distance) {
          distance = difference;
          nearest = index;
        }
      });
      current = nearest;
      update();
    }, 120);
  }, { passive: true });

  carousel.classList.add('is-enhanced');
  track.tabIndex = 0;
  track.setAttribute('role', 'group');
  track.setAttribute('aria-labelledby', 'testimonials-title');
  track.setAttribute('aria-describedby', 'testimonials-instructions');
  carousel.querySelector('[data-testimonial-instructions]').hidden = false;
  controls.hidden = false;
  update();
})();
