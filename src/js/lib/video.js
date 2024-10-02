import videojs from "video.js";

const initVideoJS = () => {
  const videos = document.querySelectorAll("[data-videojs]");
  videos.forEach((video) => {
    const player = videojs(video, {
      autoplay: "muted",
      loop: true,
      playsinline: true,
      normalizeAutoplay: true,
      noUITitleAttributes: true,
      disablePictureInPicture: true,
      controlBar: false,
      controls: false,
      bigPlayButton: false,
      titleBar: false,
      textTrackDisplay: false,
    });
    
    console.log(player)

    setTimeout(() => {
      player.ready(() => {
        player.play();
      });
    }, 100);
  });
};
initVideoJS()