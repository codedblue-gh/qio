import { randomWordInjector } from '../anim/scramble-text';
import gsap from 'gsap';

export const removeClasses = (className, items) => {
  if (items.length) {
    for (let i = 0; i < items.length; i++) {
      const element = items[i];
      element.classList.remove(className);
    }
  }
};

export const scrambleText = (e, selector) => {
  console.log(e);
  if (e.querySelector(selector)) {
    const el = e.querySelector(selector);
    const txt = el.innerText;

    gsap.to(el.parentElement, {
      opacity: 1,
      onStart: () => {
        randomWordInjector(el, txt, 50, 300);
      },
    });
  }
};
