import gsap from 'gsap';

export const animateDots = () => {
  const svg = document.querySelector('.header__svg');

  if (svg) {
    let groups = Array.from(
      document.querySelectorAll('[clip-path="url(#__lottie_element_5)"] g')
    );
    groups = gsap.utils.shuffle(groups);
    const tl = gsap.timeline({ duration: 0, repeat: -1, yoyo: true });

    for (let i = 0; i < groups.length; i++) {
      const group = groups[i];

      tl.to(group, {
        opacity: 0,
        stagger: 0.4,
        duration: 0.2,
        onComplete: () => {
          setTimeout(() => {
            gsap.to(group, {
              opacity: 1,
              duration: 0,
            });
          }, 1000);
        },
      });
    }
  }
};
