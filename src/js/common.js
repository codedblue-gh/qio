import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import Splitting from 'splitting';

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const chars = [
  '@',
  '#',
  '$',
  '%',
  '£',
  '&',
  '*',
  '§',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

export const customEase = CustomEase.create(
  'custom',
  'M0,0 C0.02,0.04 0.137,0.017 0.224,0.031 0.289,0.041 0.37,0.053 0.442,0.067 0.476,0.073 0.529,0.086 0.57,0.095 0.621,0.106 0.656,0.148 0.686,0.184 0.843,0.37 0.734,1 1,1 '
);

export const startShuffling = () => {
  const chars = '010101';

  let timeout = null;

  const txt = document.querySelector('.hero__btn .btn__txt span');
  const originalTxt = txt.innerText;

  let iteration = 0;
  const originalValue = txt.innerText;

  clearTimeout(timeout);

  timeout = setTimeout(() => {
    clearInterval(interval);
    txt.innerText = originalTxt;
  }, 2000);

  const interval = setInterval(() => {
    txt.innerText = originalValue
      .split('')
      .map((letter, index) => {
        if (index < iteration) {
          return originalValue[index];
        }

        return chars[Math.floor(Math.random() * 26)];
      })
      .join('');

    if (iteration >= originalValue.length) {
      clearInterval(interval);
      txt.innerText = originalTxt;
    }

    iteration += 1 / 3;
  }, 40);
};

window.addEventListener('load', function () {
  if (document.querySelectorAll('.btn').length) {
    document.querySelectorAll('.btn').forEach((btn, idx) => {
      const tl = gsap.timeline();
      const tl2 = gsap.timeline();

      tl.to(
        btn,
        {
          '--arr-1st': '2.5rem',
          yoyo: true,
          repeat: -1,
          duration: 4,
          ease: 'power3.inOut',
        },
        0
      )
        .to(
          btn,
          {
            '--arr-2nd': '2rem',
            yoyo: true,
            repeat: -1,
            duration: 4,
            ease: 'power3.inOut',
          },
          0.3
        )
        .to(
          btn,
          {
            '--arr-3rd': '5rem',
            yoyo: true,
            repeat: -1,
            duration: 4,
            ease: 'power3.inOut',
          },
          0.5
        );

      btn.addEventListener('mouseover', function (e) {
        tl2.to(btn, {
          '--arr-2nd': '4rem',
          '--arr-3rd': '13rem',
          '--opacity': 0,
          duration: 2,
          ease: 'power3.inOut',
        });
      });
      btn.addEventListener('mouseout', function () {
        tl2.to(btn, {
          '--opacity': 1,
          duration: 0.5,
          ease: 'power3.inOut',
        });
      });
    });
  }

  if (document.querySelectorAll('[data-splitting]').length) {
    document.querySelectorAll('[data-splitting]').forEach(item => {
      Splitting();
    });
  }
});
