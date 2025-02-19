import { lenis } from '../anim/lenis.js';
import { removeClasses } from './utils';

if (document.querySelectorAll('[data-anchor]').length) {
  document.querySelectorAll('[data-anchor]').forEach(anchor => {
    const el = document.querySelector(anchor.dataset.anchor);

    anchor.addEventListener('click', function () {
      el &&
        lenis.scrollTo(el, {
          force: true,
          lock: true,
        });

      if (anchor.closest('.nav')) {
        removeClasses(document.querySelectorAll('.nav__item'), '_is-active');
        anchor.parentElement.classList.add('_is-active');
      }
    });
  });
}
