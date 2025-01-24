import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

gsap.registerPlugin(ScrollTrigger);

const slides = gsap.utils.toArray('.portfolio .swiper-slide');
const slidesAmount = slides ? slides.length : false;

export const horizontalScroll = () => {
  if (document.querySelector('.portfolio')) {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 767.1px)', () => {
      gsap.to(slides, {
        ease: 'none',
        xPercent: -(100 * (slidesAmount - 1)),
        scrollTrigger: {
          id: 'portfolio',
          trigger: '.portfolio',
          start: 'center center',
          end: '+=' + 100 * slidesAmount + '%',
          scrub: true,
          pin: '.wrapper',
          snap: 1 / (slidesAmount - 1),
          // invalidateOnRefresh: true,

          pinType: 'fixed',
          // onLeave: () => {
          //   ScrollTrigger.refresh();
          // },
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
