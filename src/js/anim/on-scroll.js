import gsap from 'gsap';
import { scrambleText } from '../utils/utils';
import { ScrollTrigger } from 'gsap/all';

gsap.set('[data-gsap-opacity]', { opacity: 0 });

window.addEventListener('load', function () {
  if (document.querySelectorAll('.h-main').length) {
    document.querySelectorAll('.h-main').forEach(heading => {
      ScrollTrigger.create({
        trigger: heading,
        once: true,
        onEnter: function () {
          scrambleText(heading, '.h-main__txt');
        },
      });
    });
  }

  ScrollTrigger.create({
    trigger: '.hero',
    onToggle: function () {
      document.documentElement.classList.toggle('_hide-bg');
    },
  });
});
