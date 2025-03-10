import gsap from 'gsap';
import { dynamicDOM, invertColor, removeClasses } from './utils';
import { lenis } from '../anim/lenis';
import { ScrollTrigger } from 'gsap/all';
import { waves } from '../anim/waves';
import { animNextProject } from '../anim/next-project';

export const mm = gsap.matchMedia();

const observeServicesGroup = () => {
  const addActiveClass = idx => {
    removeClasses(
      document.querySelectorAll('.services__list-item'),
      '_is-active'
    );
    document
      .querySelectorAll('.services__list-item')
      [idx].classList.add('_is-active');
  };

  document.querySelectorAll('.services__list-item').forEach(item => {
    removeClasses(
      document.querySelectorAll('.services__list-item'),
      '_is-active'
    );
    item.classList.add('_is-active');
  });

  document.querySelectorAll('.services__group').forEach((group, idx) => {
    ScrollTrigger.create({
      trigger: group,
      start: 'top 1rem',
      onEnter: () => {
        addActiveClass(idx);
      },
      onEnterBack: () => {
        addActiveClass(idx);
      },
    });
  });
};

const observerProgressSlider = () => {
  mm.add('(min-width: 48.01em)', context => {
    ScrollTrigger.create({
      trigger: '.progress',
      start: 'top top',
      end: 'bottom bottom',
      onEnter: () => {
        if (
          Array.from(document.querySelectorAll('.progress__slide')).indexOf(
            document.querySelector('.progress .swiper-slide-active')
          ) !==
          Array.from(document.querySelectorAll('.progress__slide')).length - 1
        ) {
          document.querySelector('.progress').classList.add('_is-in-view');
          lenis.stop();
        }
      },
      onLeave: () => {
        if (
          Array.from(document.querySelectorAll('.progress__slide')).indexOf(
            document.querySelector('.progress .swiper-slide-active')
          ) !== 0
        ) {
          document.querySelector('.progress').classList.remove('_is-in-view');
          lenis.start();
        }
      },
      onEnterBack: () => {
        if (
          Array.from(document.querySelectorAll('.progress__slide')).indexOf(
            document.querySelector('.progress .swiper-slide-active')
          ) !== 0
        ) {
          document.querySelector('.progress').classList.add('_is-in-view');
          lenis.stop();
        }
      },
    });
  });
};

document.addEventListener('DOMContentLoaded', function () {
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
  invertColor();

  document.documentElement.classList.add('_page-loaded');

  if (document.getElementById('waves-bg')) {
    waves();
  }

  if (document.querySelector('.next-project') && window.innerWidth > 768) {
    animNextProject();
  }

  ScrollTrigger.refresh();

  window.scrollTo(0, 0);

  if (document.querySelector('.services__group')) {
    observeServicesGroup();
  }

  if (document.querySelector('.progress')) {
    observerProgressSlider();
  }
});
window.addEventListener('pageswap', function () {});
