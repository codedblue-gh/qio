const scrambleTextEls = document.querySelectorAll('[data-scramble]');
const words = Array(26)
  .fill(0)
  .map((x, i) => String.fromCharCode(i + 65));
let currentInterval = null;

const getRandomString = len => {
  const wordsCopy = words.slice();
  wordsCopy.sort(() => 0.5 - Math.random());
  const shuffledArr = wordsCopy.slice(0, len).join('');
  return shuffledArr;
};

export const randomWordInjector = (node, txt, speed, timeout) => {
  let originalText = node.getAttribute('data-scramble')?.trim() || '';
  originalText = txt ? txt : originalText;
  const interval = setInterval(() => {
    let randomString = getRandomString(originalText.length);

    Array.from(originalText).forEach((x, i) => {
      if (x === ' ') {
        let newString = Array.from(randomString);
        newString[i] = ' ';
        randomString = newString.join('');
      }
    });
    node.textContent = randomString;
  }, speed);
  currentInterval = interval;
  setTimeout(() => {
    node.textContent = originalText;
    clearInterval(interval);
  }, timeout);
};

Array.from(scrambleTextEls).forEach(el => {
  el.addEventListener('mouseenter', () => {
    randomWordInjector(el, false, 50, 300);
  });
  el.addEventListener('mouseout', () => {
    const originalText = el.getAttribute('data-scramble')?.trim() || '';
    if (currentInterval) {
      clearInterval(currentInterval);
    }
    el.textContent = originalText;
  });
});
