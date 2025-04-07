import gsap from 'gsap';
import { dynamicDOM, getRange, invertColor, removeClasses } from './utils';
import { lenis } from '../anim/lenis';
import { ScrollTrigger } from 'gsap/all';
import { waves } from '../anim/waves';
import { animNextProject } from '../anim/next-project';
import Splitting from 'splitting';

export const mm = gsap.matchMedia();

const observeWorkflow = () => {
  mm.add('(min-width: 48.01em)', () => {
    const slides = gsap.utils.toArray('.progress__group');
    const slidesAmount = slides.length;

    gsap.to(slides, {
      ease: 'none',
      duration: slides.length,
      xPercent: -(100 * (slidesAmount - 3.7)),
      scrollTrigger: {
        trigger: '.progress',
        start: 'center center',
        end: '+=' + 10 * slidesAmount + '%',
        scrub: true,
        pin: true,
        snap: 1 / (slidesAmount - 1),
      },
    });
  });
};

const observe = (anchors, triggers, start) => {
  if (anchors && triggers) {
    const addActiveClass = idx => {
      removeClasses(anchors, '_is-active');
      anchors[idx].classList.add('_is-active');
    };
    triggers.forEach((trigger, idx) => {
      ScrollTrigger.create({
        trigger,
        start,
        end: 'bottom top',
        onEnter: () => {
          addActiveClass(idx);
        },
        onLeaveBack: () => {
          addActiveClass(idx);
        },
      });
    });
  }
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

  const hoverItems = gsap.utils.toArray('[data-splitting]');

  document.addEventListener('click', onClickHandler);

  if (hoverItems) {
    hoverItems.forEach(el => {
      el.addEventListener('mouseenter', function () {
        el.removeAttribute('data-scramble-text');

        gsap.to(el.querySelectorAll('.char'), {
          opacity: 0,
          duration: 0.3,
          'clip-path': 'inset(0% 100% 0% 100%)',
        });
        gsap.to(el.querySelectorAll('.char'), {
          opacity: 1,
          stagger: 0.05,
          'clip-path': 'inset(0% 0% 0% 0%)',
          delay: 0.3,
        });
      });
      if (!el.hasAttribute('data-scramble-text')) {
        Splitting({ target: el });
      }
    });
  }

  // document.addEventListener('mouseover', function (e) {
  //   console.log(e.target);
  //   // if (e.target && e.target.hasAttribute('data-scramble-hover')) {
  //   //   console.log('log');
  //   //   e.target.innerHTML = ' ';
  //   //   scramble(e.target);
  //   // }
  // });
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

  if (document.querySelector('.services__group')) {
    ScrollTrigger.create({
      trigger: '.services',
      start: `${
        (70 / document.querySelector('.services__group').offsetHeight) * 100
      }% center`,
      onEnter: () => {
        observe(
          gsap.utils.toArray('.services__list-item'),
          gsap.utils.toArray('.services__group'),
          'center center'
        );
      },
    });
  }

  if (document.querySelector('.progress__group')) {
    observeWorkflow();
  }

  if (document.querySelector('.mainpage')) {
    observe(
      gsap.utils.toArray('.nav [data-anchor]'),
      gsap.utils.toArray('[data-section]'),
      'center center'
    );
  }

  if (document.querySelector('.process__table-head')) {
    let len = document.querySelectorAll('.process__table-head').length;
    const rows = gsap.utils.toArray('.process__row');

    const arr = [];

    gsap.set('.process__table', {
      gridTemplateColumns: `repeat(${len}, minmax(${
        window.innerWidth < 768 ? 30 : 15
      }rem, 1fr))`,
    });

    rows.forEach(rowItem => {
      const col = rowItem.dataset.column;
      const row = rowItem.dataset.row;

      arr.push(`${col},${row}`);

      if (rowItem.classList.contains('process__row_large')) {
        gsap.set(rowItem, {
          gridColumn: `${col}/${col + (len - +col)}`,
          gridRowStart: `${row}`,
        });
      } else {
        gsap.set(rowItem, {
          gridColumnStart: `${col}`,
          gridRowStart: `${row}`,
        });
      }
    });

    const rowsCount = arr[arr.length - 1].split(',')[1];
    const rowsRange = getRange(1, rowsCount);
    const columnsRange = getRange(1, len);

    rowsRange.forEach((row, rowI) => {
      columnsRange.forEach((col, colI) => {
        const c = colI + 1;
        const r = rowI + 1;
        if (!arr.includes(`${c},${r}`)) {
          const el = document.createElement('div');
          el.classList.add('process__row');
          document.querySelector('.process__table').appendChild(el);
          gsap.set(el, {
            gridColumnStart: `${c}`,
            gridRowStart: `${r === 1 ? 2 : r}`,
          });
        }
      });
    });
  }

  if (document.querySelector('.info .option-btn__input')) {
    const groups = gsap.utils.toArray('.info__group');

    setTimeout(() => {
      gsap.set('.info__content', {
        height: `${groups[0].offsetHeight + 40}px`,
      });
    }, 0);

    document
      .querySelectorAll('.info .option-btn__input')
      .forEach((input, idx) => {
        input.addEventListener('change', function () {
          if (input.checked && groups[idx]) {
            removeClasses(groups, '_is-active');
            groups[idx].classList.add('_is-active');

            gsap.to('.info__content', { height: groups[idx].offsetHeight });
          }
        });
      });
  }
});
window.addEventListener('pageswap', function () {});
