import videojs from 'video.js';
import { animateHero } from '../anim/hero';
import { dynamicDOM } from '../utils/utils';

const initVideoJS = () => {
  const videos = document.querySelectorAll('[data-videojs]');
  videos.forEach(video => {
    let player = videojs(
      video,
      {
        autoplay: video.closest('.dummy') ? 'muted' : false,
        loop: video.closest('.hero') ? false : true,
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
        player.on('ready', function () {
          player.vhs = null;

          document.documentElement.classList.add('_page-loaded');
          player.play();
          setTimeout(animateHero, 300);
        });
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
        document.documentElement.classList.add('_page-loaded');
        player.play();
        setTimeout(animateHero, 300);
      });
    }, 100);
  });
};

window.addEventListener('load', function () {
  initVideoJS();

  fetch('../../files/hero.mp4')
    .then(resp => resp.blob())
    .then(blob => {
      var video = document.querySelector('.hero__video');
      video.src = URL.createObjectURL(blob);
      video.hidden = false;
      video.play();

      document.documentElement.classList.add('_page-loaded');
      animateHero();
    });
});
