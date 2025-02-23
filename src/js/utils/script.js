import gsap from 'gsap';
import { dynamicDOM } from './utils';
import { lenis } from '../anim/lenis';
import { ScrollTrigger } from 'gsap/all';
import { initFullpageScroll } from '../anim/fullpage-scroll';
import { animateDots } from '../anim/dots';
import { waves } from '../anim/waves';
import { portfolioSlider } from '../anim/portfolio-slider';

// window.onbeforeunload = function () {
lenis.scrollTo(0, {
  lock: true,
  force: true,
});
// };

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('[data-current-year]').length) {
    document.querySelectorAll('[data-current-year]').forEach(item => {
      item.innerHTML = new Date().getFullYear();
    });
  }

  if (
    !document.querySelector('.hero') &&
    !document.querySelector('.portfolio')
  ) {
    lenis.start();
  }
  if (document.querySelector('.hero')) {
    initFullpageScroll();
  }

  const onClickHandler = e => {
    if (
      e.target.closest('._show-menu') &&
      (!e.target.closest('.menu') || e.target.closest('.menu__close-btn'))
    ) {
      document.documentElement.classList.remove('_show-menu');
      if (
        !document.querySelector('.hero') &&
        !document.querySelector('.portfolio')
      )
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

  ScrollTrigger.refresh();

  document.documentElement.classList.add('_page-loaded');

  window.innerWidth > 767 && animateDots();

  if (document.querySelector('.hero')) {
    waves();
  }

  if (document.querySelector('.portfolio__image')) {
    portfolioSlider();
  }
});
window.addEventListener('pageswap', function () {});
