import gsap from 'gsap';
import { TypeShuffle } from './scramble-text';

export const portfolioSlider = () => {
  const slides = gsap.utils.toArray(
    document.querySelectorAll('.portfolio__slide')
  );
  const prevBtn = document.getElementById('prevBtnProject');
  const nextBtn = document.getElementById('nextBtnProject');
  let i = 0;

  const next = (cur, prev, callback) => {
    gsap.to(slides[prev], {
      scale: 0.8,
      duration: 0.5,
    });
    gsap.to(slides[prev], {
      translateY: '-100dvh',
      delay: 0.5,
      duration: 0.5,
    });
    gsap.to(slides[cur], {
      translateY: 0,
      delay: 0.5,
      duration: 0.5,
    });
    gsap.to(slides[cur], {
      scale: 1,
      delay: 1,
      duration: 0.5,
      onComplete: () => {
        if (callback) callback();
      },
    });
  };
  const prev = (cur, prev, callback) => {
    gsap.to(slides[prev], {
      scale: 0.8,
      duration: 0.5,
    });
    gsap.to(slides[prev], {
      translateY: '100dvh',
      delay: 0.5,
      duration: 0.5,
    });
    gsap.to(slides[cur], {
      translateY: 0,
      delay: 0.5,
      duration: 0.5,
    });
    gsap.to(slides[cur], {
      scale: 1,
      delay: 1,
      duration: 0.5,
      onComplete: () => {
        if (callback) callback();
      },
    });
  };

  if (slides.length) {
    slides.forEach((slide, i) => {
      if (i !== 0) gsap.set(slide, { scale: 0.8, translateY: '100dvh' });

      // variables
      const imageContainer = slide.querySelector('.portfolio__image-wrap');
      const imageElement = slide.querySelector('img');

      let canvasWidth = imageContainer.clientWidth;
      let canvasHeight = imageContainer.clientHeight;
      let renderWidth = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );

      let renderW, renderH;

      if (renderWidth > canvasWidth) {
        renderW = renderWidth;
      } else {
        renderW = canvasWidth;
      }

      renderH = canvasHeight;

      let scene, camera, renderer, planeMesh;
      let isHovered = false;
      let hoverDuration = 0;

      const ANIMATION_CONFIG = {
        updateFrequency: 0.1,
        glitchIntensityMod: 0.5,
      };

      // shaders
      const vertexShader = `
    varying vec2 vUv;
    void main() {
       vUv = uv;
       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
   }
`;

      const fragmentShader = `
  uniform sampler2D tDiffuse;
  uniform float glitchIntensity;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec4 baseState = texture2D(tDiffuse, uv);

    if (glitchIntensity > 0.0) {
        float segment = floor(uv.y * 12.0);
        float randomValue = fract(sin(segment * 12345.6789 + glitchIntensity) * 43758.5453);
        vec2 offset = vec2(randomValue * 0.03, 0.0) * glitchIntensity;

        vec4 redGlitch = texture2D(tDiffuse, uv + offset);
        vec4 greenGlitch = texture2D(tDiffuse, uv - offset);
        vec4 blueGlitch = texture2D(tDiffuse, uv);

        if (mod(segment, 3.0) == 0.0) {
            gl_FragColor = vec4(redGlitch.r, greenGlitch.g, baseState.b, 1.0);
        } else if (mod(segment, 3.0) == 1.0) {
            gl_FragColor = vec4(baseState.r, greenGlitch.g, blueGlitch.b, 1.0);
        } else {
            gl_FragColor = vec4(redGlitch.r, baseState.g, blueGlitch.b, 1.0);
        }
    } else {
        gl_FragColor = baseState;
    }
}

`;

      function initializeScene(texture) {
        //   camera setup
        camera = new THREE.PerspectiveCamera(
          80,
          imageElement.offsetWidth / imageElement.offsetHeight,
          0.01,
          10
        );
        camera.position.z = 1;

        //   scene creation
        scene = new THREE.Scene();

        //   uniforms
        const shaderUniforms = {
          tDiffuse: { value: texture },
          glitchIntensity: { value: 0.0 },
        };

        texture.generateMipmaps = false;
        texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.minFilter = THREE.LinearFilter;

        //   creating a plane mesh with materials
        planeMesh = new THREE.Mesh(
          new THREE.PlaneGeometry(1.6, 1.6),
          new THREE.ShaderMaterial({
            uniforms: shaderUniforms,
            vertexShader,
            fragmentShader,
            map: {
              minFilter: THREE.LinearFilter,
            },
          })
        );

        //   add mesh to scene
        scene.add(planeMesh);

        //   render
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(renderW, renderH);
        renderer.setClearColor('#ffffff');

        //   create a new canvas in imageContainer
        imageContainer.appendChild(renderer.domElement);

        //   if mouse is over the image, isHovered is true
        imageContainer.addEventListener('mouseover', function () {
          isHovered = true;
        });

        //   if mouse is out of the image, isHovered is false and glitchIntensity value is 0
        imageContainer.addEventListener('mouseout', function () {
          isHovered = false;
          shaderUniforms.glitchIntensity.value = 0;
        });
      }

      // use the existing image from html in the canvas
      initializeScene(new THREE.TextureLoader().load(imageElement.src));

      animateScene();

      function animateScene() {
        requestAnimationFrame(animateScene);

        if (isHovered) {
          hoverDuration += ANIMATION_CONFIG.updateFrequency;

          if (hoverDuration >= 0.5) {
            hoverDuration = 0;
            planeMesh.material.uniforms.glitchIntensity.value =
              Math.random() * ANIMATION_CONFIG.glitchIntensityMod;
          }
        }

        renderer.render(scene, camera);
      }
    });

    nextBtn.addEventListener('click', function () {
      i += 1;

      if (slides[i]) {
        next(i, i - 1);
      } else {
        i = 0;

        slides.forEach((slide, idx) => {
          if (idx !== slides.length - 1) {
            gsap.set(slide, {
              scale: 0.8,
              translateY: '100dvh',
            });
          }
        });

        next(i, slides.length - 1, () => {
          gsap.set(slides[slides.length - 1], {
            scale: 0.8,
            translateY: '100dvh',
          });
        });
      }
    });
    prevBtn.addEventListener('click', function () {
      i -= 1;

      if (slides[i]) {
        prev(i, i + 1);
      } else {
        i = slides.length - 1;

        slides.forEach((slide, idx) => {
          if (idx !== 0) {
            gsap.set(slide, {
              scale: 0.8,
              translateY: '-100dvh',
            });
          }
        });

        prev(i, 0, () => {
          gsap.set(slides[0], {
            scale: 0.8,
            translateY: '-100dvh',
          });
        });
      }
    });
  }
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
};
