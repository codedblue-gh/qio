import gsap from 'gsap';
import { removeClasses } from '../utils/utils';
import { ScrollTrigger } from 'gsap/all';

document.addEventListener('DOMContentLoaded', function () {
  const sections = gsap.utils.toArray('[data-section]');

  if (sections) {
    sections.forEach((section, i) => {
      const addClass = e => {
        const d = e.dataset.section;
        const el = document.querySelector(`.nav [data-anchor=".${d}"]`);
        removeClasses(document.querySelectorAll('.nav__item'), '_is-active');
        el.parentElement.classList.add('_is-active');
      };

      const tl = gsap
        .timeline({
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            // start: 'top bottom',
            start: 'top center',
            scrub: true,
            onEnter: e => {
              addClass(e.vars.trigger);
            },
            onLeaveBack: e => {
              const el = i === 0 ? section : sections[i - 1];

              removeClasses(
                document.querySelectorAll('.nav__item'),
                '_is-active'
              );
              document
                .querySelector(`.nav [data-anchor=".${el.dataset.section}"]`)
                .parentElement.classList.add('_is-active');
            },
          },
        })
        .from(section.querySelectorAll('[data-parallax]'), {
          translateY: section.dataset.section.length
            ? section.dataset.section
            : '4%',
        });
    });
  }
});
