// import gsap from 'gsap';
// import { Observer, Draggable, ScrollTrigger } from 'gsap/all';
// import { removeClasses } from '../utils/utils';

// gsap.registerPlugin(Observer, Draggable);

// document.addEventListener('DOMContentLoaded', function () {
//   if (document.querySelector('.portfolio-chapter__body')) {
//     const glitchImages = gsap.utils.toArray('[data-project-image]');

//     glitchImages.forEach(glitchImage => {
//       const parent = (glitchImage.style.backgroundImage = glitchImage.closest(
//         '[data-project-images]'
//       ));

//       glitchImage.style.backgroundImage = parent.dataset.projectImages;
//       parent.style.backgroundImage = parent.dataset.projectImages;
//     });

//     const animateOnScroll = () => {
//       const panelHeight = document.querySelector(
//         '[data-project-image]'
//       ).clientHeight;
//       const panels = gsap.utils.toArray('[data-panel]');

//       const tl = gsap
//         .timeline({
//           onComplete: function (e) {
//             console.log(this);
//           },
//         })
//         .from('[data-panel]:not(:first-child)', {
//           translateY: '59.8rem',
//           ease: 'none',
//           stagger: 0.5,
//           scrollTrigger: {
//             trigger: '.portfolio-chapter',
//             start: 'top top',
//             end: self => {
//               console.log(self);
//               return window.innerHeight + panelHeight * (panels.length + 1);
//             },
//             scrub: 1,
//             pin: true,
//             onScrubStart: function (e) {
//               console.log(this, e);
//             },
//           },
//         });

//       panels.forEach((panel, i) => {
//         gsap.set(panel, { zIndex: i + 1 });
//       });
//     };

//     animateOnScroll();
//   }
// });
