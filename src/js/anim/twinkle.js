import gsap from 'gsap';
import { RoughEase } from 'gsap/EasePack';

gsap.registerPlugin(RoughEase);

window.addEventListener('load', function () {
  if (document.querySelector('[data-twinkle-anim]')) {
    document.querySelectorAll('[data-twinkle-anim]').forEach(element => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      const paths = element.querySelectorAll('path');

      paths.forEach(path => {
        gsap.to(path, {
          duration: 1,
          opacity: 1,
          stagger: 0.2,
          repeat: -1,
          yoyo: true,
        });

        gsap.fromTo(
          path,
          {
            opacity: 0,
            scale: 0,
          },
          {
            duration: 3.5,
            delay: Math.random() * 3,
            opacity: 1,
            scale: 1,
            repeat: -1,
            yoyo: true,
            stagger: 3.2,
          }
        );
      });
    });
  }
});
