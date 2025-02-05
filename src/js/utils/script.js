import gsap from 'gsap';
import { customEase, dynamicDOM, removeClasses } from './utils';
import { lenis } from '../anim/lenis';
import { ScrollTrigger } from 'gsap/all';
import { horizontalLoop } from './marquee';
import { animateHero } from '../anim/hero';
import { Observer } from 'gsap/all';

let mm = gsap.matchMedia();

document.addEventListener('DOMContentLoaded', function () {
  gsap.set('.hero__bg rect', { opacity: 0 });

  if (document.querySelectorAll('[data-current-year]').length) {
    document.querySelectorAll('[data-current-year]').forEach(item => {
      item.innerHTML = new Date().getFullYear();
    });
  }

  const onClickHandler = e => {
    if (
      e.target.closest('._show-menu') &&
      (!e.target.closest('.menu') || e.target.closest('.menu__close-btn'))
    ) {
      document.documentElement.classList.remove('_show-menu');
      lenis.start();
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

  // !document.querySelector('.hero') && lenis.start();
  lenis.start();
  document.documentElement.classList.add('_page-loaded');
});
window.addEventListener('pageswap', function () {});
