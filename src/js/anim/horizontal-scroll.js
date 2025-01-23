import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

gsap.registerPlugin(ScrollTrigger);

export const horizontalScroll = () => {
  if (document.querySelector('.portfolio')) {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 767.1px)', () => {
      const slides = gsap.utils.toArray('.portfolio .swiper-slide');
      const slidesAmount = slides.length;

      gsap.to(slides, {
        ease: 'none',
        duration: slides.length,
        xPercent: -(100 * (slidesAmount - 1)),
        scrollTrigger: {
          trigger: '.portfolio',
          start: 'center center',
          end: '+=' + 50 * slidesAmount + '%',
          scrub: true,
          pin: '.wrapper',
          snap: 1 / (slidesAmount - 1),
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
