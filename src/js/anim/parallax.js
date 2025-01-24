import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

export const parallax = () => {
  const mm = gsap.matchMedia();

  mm.add('(min-width: 767.1px)', () => {
    const elements = gsap.utils.toArray('[data-parallax]');

    elements.forEach(function (el, i) {
      const parent = el.closest('[data-parallax-parent]');

      const tl = gsap.from(el, {
        translateY: (i, target) =>
          el.dataset.parallax.length ? `${el.dataset.parallax}rem` : '5rem',
        ease: 'none',
        lazy: false,
      });

      ScrollTrigger.create({
        animation: tl,
        trigger: parent,
        scrub: true,
        pinnedContainer: '.wrapper',
        start: `top center`,
      });
    });

    return () => {};
  });
};
