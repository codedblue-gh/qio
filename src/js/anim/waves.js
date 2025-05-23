export const waves = () => {
  var SEPARATION = 100,
    AMOUNTX = 100,
    AMOUNTY = 100;
  var camera, scene, renderer, container;
  var particles,
    count = 0;
  var mouseX = 0,
    mouseY = 0;
  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;
  init();
  animate();

  function init() {
    container = document.getElementById('waves-bg');
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.x = 0;
    camera.position.y = -2500;
    camera.position.z = 2500;
    scene = new THREE.Scene();
    // Background color //
    scene.background = new THREE.Color(0xffffff);
    var numParticles = AMOUNTX * AMOUNTY;
    var positions = new Float32Array(numParticles * 3);
    var scales = new Float32Array(numParticles);
    var i = 0,
      j = 0;
    for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
        positions[i + 1] = 0; // y
        positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z
        scales[j] = 1;
        i += 3;
        j++;
      }
    }
    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('scale', new THREE.BufferAttribute(scales, 1));
    var material = new THREE.ShaderMaterial({
      uniforms: {
        color: {
          value: new THREE.Color(0x0d0d0d),
        },
      },
      vertexShader: document.getElementById('vertexshader').textContent,
      fragmentShader: document.getElementById('fragmentshader').textContent,
    });
    //
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particles.rotation.x = 1000;
    //
    renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    //
    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    //camera.position.x += (mouseX - camera.position.x) * 0.05;
    //camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    var positions = particles.geometry.attributes.position.array;
    var scales = particles.geometry.attributes.scale.array;
    var i = 0,
      j = 0;
    for (var ix = 0; ix < AMOUNTX; ix++) {
      for (var iy = 0; iy < AMOUNTY; iy++) {
        positions[i + 1] =
          Math.sin((ix + count) * 0.3) * 90 + Math.sin((iy + count) * 0.5) * 90;
        scales[j] =
          (Math.sin((ix + count) * 0.3) + 1) * 8 +
          (Math.sin((iy + count) * 0.5) + 1) * 8;
        i += 3;
        j++;
      }
    }
    particles.geometry.attributes.position.needsUpdate = true;
    particles.geometry.attributes.scale.needsUpdate = true;
    renderer.render(scene, camera);
    // Speed //
    count += 0.02;
  }
};
