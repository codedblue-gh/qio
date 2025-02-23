import gsap from 'gsap';
import { rgbKineticSlider } from '../lib/rgbKineticSlider';
import { TypeShuffle } from './scramble-text';

export const portfolioSlider = () => {
  // images setup
  const images = [];
  document.querySelectorAll('.portfolio__image').forEach(slide => {
    images.push(slide.getAttribute('src'));
  });

  // content setup
  // const texts = [
  //   ['Earth', 'Surface gravity: 9.807 m/s²'],
  //   ['Mars', 'Surface gravity: 3.711 m/s²'],
  //   ['Venus', 'Surface gravity: 8.87 m/s²'],
  // ];

  // init plugin
  new rgbKineticSlider({
    // images and content sources
    slideImages: images, // array of images >demo size : 1920 x 1080
    // itemsTitles: texts, // array of titles / subtitles

    // displacement images sources

    backgroundDisplacementSprite:
      'https://thumbs.dreamstime.com/b/digital-glitch-background-grunge-computer-screen-error-retro-pixel-noise-abstract-design-photo-television-signal-fail-data-decay-226039600.jpg', // slide displacement image
    cursorDisplacementSprite:
      'https://images.unsplash.com/photo-1486551937199-baf066858de7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2133&q=80', // cursor displacement image

    // cursor displacement effect
    cursorImgEffect: true, // enable cursor effect
    cursorTextEffect: false, // enable cursor text effect
    cursorScaleIntensity: 0.65, // cursor effect intensity
    cursorMomentum: 0.14, // lower is slower

    // swipe
    swipe: true, // enable swipe
    swipeDistance: window.innerWidth * 0.4, // swipe distance - ex : 580
    swipeScaleIntensity: 2, // scale intensity during swipping

    // slide transition
    slideTransitionDuration: 1, // transition duration
    transitionScaleIntensity: 30, // scale intensity during transition
    transitionScaleAmplitude: 160, // scale amplitude during transition

    // regular navigation
    nav: true, // enable navigation
    navElement: '.main-nav', // set nav class

    // image rgb effect
    imagesRgbEffect: true, // enable img rgb effect
    imagesRgbIntensity: 0.9, // set img rgb intensity
    navImagesRgbIntensity: 80, // set img rgb intensity for regular nav

    // texts settings
    textsDisplay: true, // show title
    textsSubTitleDisplay: true, // show subtitles
    textsTiltEffect: true, // enable text tilt
    googleFonts: ['Playfair Display:700', 'Roboto:400'], // select google font to use
    buttonMode: false, // enable button mode for title
    textsRgbEffect: true, // enable text rgb effect
    textsRgbIntensity: 0.03, // set text rgb intensity
    navTextsRgbIntensity: 15, // set text rgb intensity for regular nav

    textTitleColor: 'white', // title color
    textTitleSize: 125, // title size
    mobileTextTitleSize: 125, // title size
    textTitleLetterspacing: 3, // title letterspacing

    textSubTitleColor: 'white', // subtitle color ex : 0x000000
    textSubTitleSize: 21, // subtitle size
    mobileTextSubTitleSize: 21, // mobile subtitle size
    textSubTitleLetterspacing: 2, // subtitle letter spacing
    textSubTitleOffsetTop: 90, // subtitle offset top
    mobileTextSubTitleOffsetTop: 90, // mobile subtitle offset top
  });

  const projectName = document.getElementById('project-name');
  const projectLink = document.getElementById('project-link');
  const projectBtn = document.getElementById('project-btn');
  const type = document.getElementById('project-data-type');
  const date = document.getElementById('project-data-date');
  const description = document.getElementById('project-data-description');
  const progress = document.getElementById('project-slider-progress');
  const projects = document.querySelectorAll('.portfolio__image');
  const thumbHeight = 120 / projects.length / 10;

  gsap.set(progress, {
    '--height': `${thumbHeight}rem`,
  });

  const setProjectData = () => {
    const currentIdx =
      +document.querySelector('.portfolio').dataset.activeSlide;
    const currentProject = projects[currentIdx];
    const link = projects[currentIdx].dataset.projectLink;
    const data = {
      name: currentProject.dataset.projectName,
      description: currentProject.dataset.projectDescription,
      type: currentProject.dataset.projectType,
      date: currentProject.dataset.projectDate.split(',')[0].trim(),
      dateFormat: currentProject.dataset.projectDate.split(',')[1].trim(),
    };

    projectName.innerHTML = data.name;
    description.innerHTML = data.description;
    type.innerHTML = data.type;
    date.innerHTML = data.date;
    date.dateTime = data.dateFormat;

    new TypeShuffle(projectName).fx4();
    new TypeShuffle(description).fx4();
    new TypeShuffle(type).fx4();
    new TypeShuffle(date).fx4();

    projectName.setAttribute('href', link);
    projectLink.setAttribute('href', link);
    projectBtn.setAttribute('href', link);

    gsap.to(progress, {
      '--y': `${thumbHeight * currentIdx}rem`,
    });
  };
  setProjectData();

  document.addEventListener('kineticSliderTransitionStart', function () {
    setProjectData();
  });
};
