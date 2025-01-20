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

  //   gsap.timeline({
  //     scrollTrigger: {
  //       trigger: '[data-gsap-opacity]',
  //       start: 'top center',
  //       onToggle: function (e) {
  //         gsap.to('[data-gsap-opacity]', { opacity: 1 });
  //       },
  //     },
  //   });
});
