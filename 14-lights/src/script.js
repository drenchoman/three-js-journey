import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
// AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
gui
  .add(ambientLight, 'intensity')
  .min(0)
  .max(3)
  .step(0.001)
  .name('Ambient Light');
gui.add(ambientLight, 'visible');

// Directional Light
const directionalLight = new THREE.DirectionalLight(0x00ffc, 0.9);
scene.add(directionalLight);
directionalLight.position.set(1, 0.25, 0);
gui
  .add(directionalLight, 'intensity')
  .min(0)
  .max(3)
  .step(0.001)
  .name('Directional Light');
gui.add(directionalLight.position, 'y').min(0).max(1).step(0.001);
gui.add(directionalLight, 'visible');

// Hemisphere Light
const hemisphereLight = new THREE.HemisphereLight(
  0xff00000,
  0x0000ff,
  1.5
);
scene.add(hemisphereLight);
gui
  .add(hemisphereLight, 'intensity')
  .min(0)
  .max(3)
  .step(0.001)
  .name('Hemisphere Light');
gui.add(hemisphereLight, 'visible');

// Pointlight
const pointLight = new THREE.PointLight(0xff9000, 0.5, 20);
scene.add(pointLight);
pointLight.position.set(1, -0.6, 1);
gui
  .add(pointLight, 'intensity')
  .min(0)
  .max(4.5)
  .step(0.001)
  .name('Point Light');
gui.add(pointLight.position, 'x').min(-2).max(2.5).step(0.001);
gui.add(pointLight, 'visible');

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 3, 1);
scene.add(rectAreaLight);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
gui
  .add(rectAreaLight, 'intensity')
  .min(0)
  .max(10)
  .step(0.001)
  .name('Rect Area Light');
gui.add(rectAreaLight, 'visible');

// Spotlight
const spotLight = new THREE.SpotLight(
  0x78ff0,
  4.5,
  10,
  Math.PI * 0.1,
  0.25,
  1
);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);
scene.add(spotLight.target);
gui
  .add(spotLight, 'intensity')
  .min(0)
  .max(15)
  .step(0.001)
  .name('Spotlight');
gui.add(spotLight, 'visible');

// Helpers
// const hemispherLightHelper = new THREE.HemisphereLightHelper(
//   hemisphereLight,
//   0.2
// );
// scene.add(hemispherLightHelper);

// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight
// );
// scene.add(directionalLightHelper);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
// scene.add(pointLightHelper);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.colorSpace = material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  material
);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(0.75, 0.75, 0.75),
  material
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
