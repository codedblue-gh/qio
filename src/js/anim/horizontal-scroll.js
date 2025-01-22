import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

if (document.querySelector('.portfolio')) {
  let sections = gsap.utils.toArray('.portfolio .swiper-slide');
  ScrollTrigger.defaults({});
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.portfolio',
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      end: () => '+=' + document.querySelector('.portfolio').offsetWidth,
    },
  });
}
