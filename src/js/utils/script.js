import gsap from 'gsap';
import { dynamicDOM } from './utils';
import { lenis } from '../anim/lenis';
import { ScrollTrigger } from 'gsap/all';
import { animateHero } from '../anim/hero';
import { initFullpageScroll } from '../anim/fullpage-scroll';

window.onbeforeunload = function () {
  lenis.scrollTo(0);
};

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('[data-current-year]').length) {
    document.querySelectorAll('[data-current-year]').forEach(item => {
      item.innerHTML = new Date().getFullYear();
    });
  }

  if (!document.querySelector('.hero')) {
    lenis.start();
  } else {
    initFullpageScroll();
  }

  const onClickHandler = e => {
    if (
      e.target.closest('._show-menu') &&
      (!e.target.closest('.menu') || e.target.closest('.menu__close-btn'))
    ) {
      document.documentElement.classList.remove('_show-menu');
      if (!document.querySelector('.hero')) lenis.start();
    } else if (e.target.closest('.header__hamburger')) {
      document.documentElement.classList.add('_show-menu');
      lenis.stop();
    }
  };

  document.addEventListener('click', onClickHandler);
});
window.addEventListener('load', function () {
  dynamicDOM();
  animateHero();

  ScrollTrigger.refresh();

  document.documentElement.classList.add('_page-loaded');
});
window.addEventListener('pageswap', function () {});
