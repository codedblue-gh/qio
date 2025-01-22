import { lenis } from '../anim/fullpage-scroll';
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

export const dynamicDOM = () => {
  const sortByNumber = (a, b) => a.targetIdx - b.targetIdx;

  const elementsData = [];

  // create
  const mm = gsap.matchMedia();

  if (document.querySelectorAll('[data-dd]').length) {
    document.querySelectorAll('[data-dd]').forEach((element, idx) => {
      const parent = element.parentElement;
      const dataset = element.dataset.dd.trim().split(',');
      const data = {
        element,
        parent,
        target: document.querySelector(dataset[0]),
        targetIdx: +dataset[1],
        parentIdx: Array(parent.childNodes).indexOf(element),
      };
      elementsData.push(data);
    });
  }

  // add a media query. When it matches, the associated function will run
  mm.add('(max-width: 767px)', () => {
    // this setup code only runs when viewport is at least 800px wide

    elementsData.forEach(el => {
      const { element, target, targetIdx } = el;

      target.insertBefore(element, target.childNodes[targetIdx + 1]);
    });

    return () => {
      // optional
      // custom cleanup code here (runs when it STOPS matching)
      elementsData.forEach(el => {
        const { parent, element, parentIdx } = el;

        parent.insertBefore(element, parent.childNodes[parentIdx + 1]);
      });
    };
  });

  elementsData.sort(sortByNumber);
};
