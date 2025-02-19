import gsap from 'gsap';
import { Observer, ScrollTrigger } from 'gsap/all';
import { lenis } from './lenis';
import { isTouchDevice, removeClasses } from '../utils/utils';

gsap.registerPlugin(Observer);

const targets = gsap.utils.toArray('[data-section]');

const addClass = target => {
  const el = document.querySelector(
    `.nav [data-anchor=".${target.dataset.section}"]`
  );
  removeClasses(document.querySelectorAll('.nav__item'), '_is-active');
  el.parentElement.classList.add('_is-active');
};

const scroll = (self, i, deltaY) => {
  if (!document.querySelector('.lenis-scrolling')) {
    self.disable();

    const prev = targets[i - 1];
    const next = targets[i + 1];
    const target = deltaY === 1 ? next : prev;

    lenis.scrollTo(target, {
      lock: true,
      force: true,
      programmatic: true,
      lerp: 0,
      onStart: () => {
        addClass(target);
      },
      onComplete: () => {
        setTimeout(() => {
          self.enable();
        }, 0);
      },
    });
  }
};

export const initFullpageScroll = () => {
  const isTouch = isTouchDevice();

  targets.forEach((target, i) => {
    const content = target.querySelector('[data-content]');
    const data = content.dataset.content;

    gsap.set(content, {
      translateY: data.length ? data : '130%',
    });

    Observer.create({
      target,
      type: 'wheel,touch',
      wheelSpeed: isTouch ? -1 : 1,
      onUp: self => {
        const next = isTouch ? targets[i + 1] : targets[i - 1];

        if (next) {
          scroll(self, i, isTouch ? 1 : -1);
        }
      },
      onDown: self => {
        const next = isTouch ? targets[i - 1] : targets[i + 1];

        if (next) {
          scroll(self, i, isTouch ? -1 : 1);
        }
      },
    });

    if (content) {
      ScrollTrigger.create({
        trigger: target,
        onEnter: () => {
          gsap.to(content, {
            translateY: 0,
          });
        },

        onEnterBack: () => {
          gsap.to(content, {
            translateY: 0,
          });
        },
      });
    }
  });
};
