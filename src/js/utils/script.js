import gsap from 'gsap';
import { dynamicDOM, invertColor } from './utils';
import { lenis } from '../anim/lenis';
import { ScrollTrigger } from 'gsap/all';
import { animateDots } from '../anim/dots';
import { waves } from '../anim/waves';
import { portfolioSlider } from '../anim/portfolio-slider';
import { animNextProject } from '../anim/next-project';

lenis.scrollTo(0, {
  duration: 0,
});

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('[data-current-year]').length) {
    document.querySelectorAll('[data-current-year]').forEach(item => {
      item.innerHTML = new Date().getFullYear();
    });
  }

  // if (
  //   !document.querySelector('.hero') &&
  //   !document.querySelector('.portfolio')
  // ) {
  //   lenis.start();
  // }
  // if (document.querySelector('.hero')) {
  //   initFullpageScroll();
  // }

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
  invertColor();

  document.documentElement.classList.add('_page-loaded');

  window.innerWidth > 767 && animateDots();

  if (document.querySelector('.hero')) {
    waves();
  }

  if (document.querySelector('.portfolio__image')) {
    portfolioSlider();
  }

  if (document.querySelector('.next-project') && window.innerWidth > 768) {
    animNextProject();
  }

  ScrollTrigger.refresh();
});
window.addEventListener('pageswap', function () {});
