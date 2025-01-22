import gsap from 'gsap';
import { customEase } from '../common';
import Segment from 'segment-js';

const set = () => {
  gsap.set('[data-draw-el]', {
    scale: 0,
    opacity: 0,
    transformOrigin: 'center',
  });

  gsap.set('[data-draw-line]', {
    scaleX: 0,
    transformOrigin: 'center',
  });

  gsap.set('.header', {
    translateY: '-150%',
  });

  gsap.set('.hero__logo, .hero__btn, .hero__title, .hero__text-wrap', {
    opacity: 0,
  });

  document.querySelectorAll('[data-draw-sc]').length &&
    document.querySelectorAll('[data-draw-sc]').forEach((group, idx) => {
      gsap.set(group, {
        scaleY: group.dataset.drawSc === 'x' ? 1 : 0,
        scaleX: group.dataset.drawSc === 'x' ? 0 : 1,
        transformOrigin:
          idx === 2 || idx === 3 ? 'top' : idx === 1 ? 'right' : 'left',
      });
    });
};
set();

export const animateHero = () => {
  document.querySelectorAll('[data-draw-tb]').length &&
    document.querySelectorAll('[data-draw-tb]').forEach((group, idx) => {
      group.querySelectorAll('path').forEach(path => {
        const segment = new Segment(path);

        segment.draw('0', '0', 0);
        group.style.opacity = 1;

        gsap.to(path, {
          strokeDasharray:
            group.dataset.drawTb === 'reversed'
              ? segment.strokeDasharray('-100%', '0')
              : segment.strokeDasharray('0', '100%'),
          delay: (idx + 1) / 100,
          duration: 2,
          ease: customEase,
        });
      });
    });

  document.querySelectorAll('[data-draw-sc]').length &&
    document.querySelectorAll('[data-draw-sc]').forEach((group, idx) => {
      gsap.to(group, {
        scaleY: 1,
        scaleX: 1,
        duration: 2,
        ease: customEase,
      });
    });

  gsap.to('[data-draw-el]', {
    scale: 1,
    opacity: 1,
    duration: 4,
    stagger: 0.1,
    ease: customEase,
  });

  gsap.to('[data-draw-line]', {
    scaleX: 1,
  });

  gsap.to('.hero__logo', {
    opacity: 1,
    duration: 1.5,
    onStart: () => {
      document.querySelector('.hero__logo').classList.add('_animate');
    },
  });
  gsap.to(
    '.hero__btn, .hero__title, .hero__text-wrap',
    {
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      onComplete: () => {
        gsap.to('.header', {
          translateY: 0,
          ease: customEase,
        });
      },
    },
    2
  );

  const nums = [1, -1];

  document.querySelectorAll('[data-auto-alpha-fl]').forEach(group => {
    gsap.to(group, {
      rotate: 360 * nums[Math.floor(Math.random() * nums.length)],
      duration: 30,
      repeat: -1,
    });
  });
};
