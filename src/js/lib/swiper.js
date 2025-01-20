import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';

window.addEventListener('load', function () {
  if (document.querySelector('.clients__slider')) {
    new Swiper('.clients__slider', {
      modules: [Autoplay],
      speed: 8000,
      slidesPerView: 'auto',
      loop: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
    });
  }
  if (document.querySelector('.blog__filters-slider')) {
    new Swiper('.blog__filters-slider', {
      modules: [],
      speed: 1000,
      spaceBetween: 8,
      slidesPerView: 'auto',
    });
  }
  if (document.querySelector('.blog__slider')) {
    new Swiper('.blog__slider', {
      modules: [Navigation],
      speed: 1000,
      spaceBetween: 20,
      slidesPerView: 4,
      loop: true,
      navigation: {
        prevEl: '.blog .nav-btn_prev',
        nextEl: '.blog .nav-btn_next',
      },
    });
  }
  if (document.querySelector('.reviews__slider')) {
    new Swiper('.reviews__slider', {
      modules: [Navigation],
      speed: 1000,
      spaceBetween: 80,
      centeredSlidesBounds: true,
      centeredSlides: true,
      loop: true,
      navigation: {
        prevEl: '.reviews .nav-btn_prev',
        nextEl: '.reviews .nav-btn_next',
      },
    });
  }
});
