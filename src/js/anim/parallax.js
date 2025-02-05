import gsap from 'gsap';
import { removeClasses } from '../utils/utils';

document.addEventListener('DOMContentLoaded', function () {
  const sections = gsap.utils.toArray('[data-section]');

  if (sections) {
    sections.forEach(section => {
      const addClass = e => {
        const el = document.querySelector(
          `.nav [data-anchor=".${e.vars.trigger.dataset.section}"]`
        );
        removeClasses(document.querySelectorAll('.nav__item'), '_is-active');
        el.parentElement.classList.add('_is-active');
      };

      const tl = gsap
        .timeline({
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=260rem top',
            scrub: true,
            onEnter: e => {
              addClass(e);
            },
            onEnterBack: e => {
              addClass(e);
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
