// new fullpage('main', {});
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { customEase } from '../utils/utils';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis
export const lenis = new Lenis({
  duration: 2,
  direction: 'vertical', // vertical, horizontal
  gestureDirection: 'vertical', // vertical, horizontal, both
  smooth: true,
  mouseMultiplier: 16,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

lenis.stop();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', e => {
  ScrollTrigger.update();
});

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add(time => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

// ScrollTrigger.addEventListener('refresh', () => lenis.resize());

// ScrollTrigger.scrollerProxy('.lenis', {
//   scrollTop(value) {
//     return arguments.length
//       ? lenis.scrollTo(value, 0, 0)
//       : lenis.animatedScroll;
//   }, // we don't have to define a scrollLeft because we're only scrolling vertically.
//   getBoundingClientRect() {
//     return {
//       top: 0,
//       left: 0,
//       width: window.innerWidth,
//       height: window.innerHeight,
//     };
//   },
// });
