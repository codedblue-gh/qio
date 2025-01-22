import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

gsap.registerPlugin(ScrollTrigger);

export const por = () => {
  if (document.querySelector('.portfolio')) {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 767.1px)', () => {
      let sections = gsap.utils.toArray('.portfolio .swiper-slide');

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: '.portfolio',
          start: 'center center',
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => '+=' + document.querySelector('.portfolio').offsetWidth,
        },
      });

      return () => {};
    });
    mm.add('(max-width: 767px)', () => {
      const slider = new Swiper('.portfolio .swiper', {
        modules: [Navigation],
        speed: 1000,
        spaceBetween: 10,
        slidesPerView: 1,
        navigation: {
          nextEl: '.portfolio .circ-btn_next',
          prevEl: '.portfolio .circ-btn_prev',
        },
      });

      return () => {
        slider.destroy();
      };
    });
  }
};
