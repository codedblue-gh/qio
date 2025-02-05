import videojs from 'video.js';

const videos = document.querySelectorAll('[data-videojs]');
videos.forEach(video => {
  let player = videojs(
    video,
    {
      autoplay: 'muted',
      loop: true,
      muted: true,
      playsinline: true,
      normalizeAutoplay: true,
      noUITitleAttributes: true,
      disablePictureInPicture: true,
      controlBar: false,
      controls: false,
      bigPlayButton: false,
      titleBar: false,
      textTrackDisplay: false,
    },
    function () {
      // if (document.querySelector('.hero')) {
      //   player.on('ready', function () {
      //     player.vhs = null;
      //     document.documentElement.classList.add('_page-loaded');
      //     player.play();
      //     setTimeout(animateHero, 300);
      //   });
      // }
      // if (document.querySelectorAll('[data-project]').length) {
      //   // document
      //   //   .querySelector('.portfolio-chapter__body')
      //   //   .addEventListener('mouseover', function ({ target }) {
      //   //     if (target.closest('[data-project]')) {
      //   //       player.play();
      //   //     }
      //   //   });
      //   // document
      //   //   .querySelector('.portfolio-chapter__body')
      //   //   .addEventListener('mouseleave', function ({ target }) {
      //   //     if (target.closest('[data-project]')) {
      //   //       player.pause();
      //   //     }
      //   //   });
      // }
    }
  );

  setTimeout(() => {
    // Do not jump ahead if user has paused the player
    if (player.paused()) return;

    console.log('Attempting to jump ahead and catch up to live edge now...');
    player.liveTracker.seekToLiveEdge();
  }, 8 * 1000);

  setTimeout(() => {
    player.ready(() => {
      player.play();
    });
  }, 100);
});
