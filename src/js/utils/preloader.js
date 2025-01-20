import gsap from 'gsap';

// Check if fonts are loaded
const fontsLoaded = () => {
  return document.fonts.ready; // Returns a promise that resolves when all fonts are loaded
};

// Animate the loading bar using GSAP
const animateLoadingBar = () => {
  gsap.to('#loading-bar', { width: '100%', duration: 5, ease: 'power2.inOut' });
};

// Once fonts are loaded, reveal the content and hide the loading bar
fontsLoaded().then(() => {
  // Once fonts are loaded, complete the loading bar animation
  gsap.to('#loading-bar', {
    width: '100%',
    duration: 0.5,
    ease: 'power2.inOut',
  });

  // Hide the loading bar and show the main content
  //   gsap.to('.loading-container', {
  //     opacity: 0,
  //     duration: 1,
  //     delay: 0.5,
  //     onComplete: () => {
  //       document.querySelector('.content').style.display = 'block';
  //     },
  //   });
});

// Start loading bar animation (independently of font loading)
animateLoadingBar();
