import gsap from 'gsap';
import { customEase } from '../common';

window.addEventListener('load', function () {
  if (document.getElementById('waves-dot')) {
    gsap
      .timeline({ repeat: -1, ease: customEase })
      .to('#waves-dot', {
        transform: 'matrix(1, 0, 0, 1, 148.237, 222.408)',
        delay: 0.5,
      })
      .to('#waves-dot', {
        transform: 'matrix(1, 0, 0, 1, 261.237, 222.408)',
        delay: 1,
      })
      .to('#waves-dot', {
        transform: 'matrix(1,0,0,1,422.2370300292969,222.40798950195312)',
        delay: 1,
      });
  }
});
