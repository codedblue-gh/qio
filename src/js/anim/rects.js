import gsap from 'gsap';

window.addEventListener('load', function () {
  if (document.querySelector('.portfolio #rect-1')) {
    gsap
      .timeline({ repeat: -1, yoyo: true })
      .to('#rect-1', {
        width: 170,
        ease: 'expoScale(0.5,7,none)',
        duration: 2,
      })
      .to('#rect-1', { width: 30, duration: 2 })
      .to('#rect-1', { width: 250 });

    gsap
      .timeline({ repeat: -1, yoyo: true })
      .to('#rect-2', {
        width: 50,
        ease: 'expoScale(0.5,7,none)',
        duration: 2,
      })
      .to('#rect-2', { width: 180, duration: 2 })
      .to('#rect-2', { width: 40 });

    gsap.timeline({ repeat: -1, yoyo: true }).to('#rect-3-l, #rect-3-c', {
      translateY: '1rem',
      duration: 1,
    });
    gsap
      .timeline({ repeat: -1, yoyo: true })
      .to('#rect-3-ll, #rect-3-c', {
        translateX: '-2rem',
        duration: 3,
      })
      .to('#rect-3-ll, #rect-3-c', {
        translateX: '4rem',
        duration: 3,
      })
      .to('#rect-3-ll, #rect-3-c', {
        translateX: '-7rem',
        duration: 3,
      });
  }
});
