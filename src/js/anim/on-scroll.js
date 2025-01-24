import gsap from 'gsap';
import { scrambleText } from '../utils/utils';
import { ScrollTrigger } from 'gsap/all';

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
});
