import { horizontalLoop } from './marquee';

import gsap from 'gsap';
import { removeClasses } from './utils';

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.header__item_menu')) {
    document
      .querySelector('.header__item_menu')
      .addEventListener('click', function () {
        document.documentElement.classList.add('_show-menu');
      });
  }
  if (document.querySelector('.menu-header__close-btn')) {
    document
      .querySelector('.menu-header__close-btn')
      .addEventListener('click', function () {
        document.documentElement.classList.remove('_show-menu');
      });
  }
  if (document.querySelectorAll('[data-accordion]').length) {
    document.querySelectorAll('[data-accordion]').forEach(element => {
      const btns = element.querySelectorAll('[data-accordion-el]');

      element.addEventListener('click', function (e) {
        if (e.target.closest('[data-accordion-el]._is-active')) {
          e.target
            .closest('[data-accordion-el]._is-active')
            .classList.remove('_is-active');
        } else if (e.target.closest('[data-accordion-el]')) {
          removeClasses('_is-active', btns);
          e.target.closest('[data-accordion-el]').classList.add('_is-active');
        }
      });
    });
  }
  if (document.querySelector('.marquee .marquee__txt')) {
    horizontalLoop(gsap.utils.toArray('.marquee__txt'), {
      repeat: -1,
      speed: 0.3,
    });
  }
  if (document.querySelector('.about__wave')) {
    horizontalLoop(gsap.utils.toArray('.about__wave'), {
      repeat: -1,
      speed: 1,
    });
  }
  if (document.querySelector('.request-form__rail div')) {
    horizontalLoop(gsap.utils.toArray('.request-form__rail div'), {
      repeat: -1,
      speed: 0.6,
    });
  }
});
