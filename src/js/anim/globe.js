import gsap from 'gsap';

const svgRef = document.querySelector('.globe-wrap');
const tl = gsap.timeline({
  repeat: -1,
  defaults: { duration: 0.5, ease: 'none' },
});

const init = () => {
  const paths = gsap.utils.toArray('#Round_move path');
  if (!paths) return;

  paths.forEach((path, i) => {
    const nextIndex = (i + 1) % paths.length;
    const nextPath = paths[nextIndex];
    const transformMatrix = nextPath.getAttribute('transform');

    if (transformMatrix) {
      tl.to(path, { attr: { transform: transformMatrix } }, 0);
    }
  });
};
init();
