import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Axes helper
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Textures
 */
let num = 3;
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load(
  `textures/matcaps/${num}.png`
);
matcapTexture.colorSpace = THREE.SRGBColorSpace;

const donutMatcapTexture = textureLoader.load(
  `textures/matcaps/${num}.png`
);
donutMatcapTexture.colorSpace = THREE.SRGBColorSpace;

// Font Loader
const fontLoader = new FontLoader();

fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeo = new TextGeometry('Oscar Harron', {
    font: font,
    size: 0.5,
    height: 0.1,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 2,
  });

  // textGeo.computeBoundingBox();
  // console.log(textGeo.boundingBox);
  // textGeo.translate(
  //   -textGeo.boundingBox.max.x * 0.5,
  //   -textGeo.boundingBox.max.y * 0.5,
  //   -textGeo.boundingBox.max.z * 0.5
  // );
  textGeo.center();

  const textMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture,
  });
  const textMesh = new THREE.Mesh(textGeo, textMaterial);
  scene.add(textMesh);
});

fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeo = new TextGeometry('crafting web experiences', {
    font: font,
    size: 0.1,
    height: 0.1,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 2,
  });

  // textGeo.computeBoundingBox();
  // console.log(textGeo.boundingBox);
  // textGeo.translate(
  //   -textGeo.boundingBox.max.x * 0.5,
  //   -textGeo.boundingBox.max.y * 0.5,
  //   -textGeo.boundingBox.max.z * 0.5
  // );
  textGeo.center();

  const textMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture,
  });
  const textMesh = new THREE.Mesh(textGeo, textMaterial);
  textMesh.position.y = -0.5;

  scene.add(textMesh);
});

console.log(scene);

function getRandomInt(min, max) {
  const minCeiling = Math.ceil(min);
  const maxFloor = Math.floor(max);
  let test = Math.random() * (maxFloor - minCeiling + 1) + minCeiling;
  return test;
}

// optimising - take geometry and material out of the loop
const donutGeomtry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
const donutMaterial = new THREE.MeshMatcapMaterial({
  matcap: donutMatcapTexture,
});

// Add Objects to scene
const folder = gui.addFolder('Donuts');
folder.add(donutMaterial, 'visible');

for (let i = 0; i < 300; i++) {
  const donutMesh = new THREE.Mesh(donutGeomtry, donutMaterial);
  donutMesh.position.x = getRandomInt(-5, 5);
  donutMesh.position.y = getRandomInt(-4, 4);
  donutMesh.position.z = getRandomInt(-4, 4);

  // Rotation
  donutMesh.rotation.x = Math.random() * Math.PI;
  donutMesh.rotation.y = Math.random() * Math.PI;

  // Scale
  const scale = Math.random();
  donutMesh.scale.set(scale, scale, scale);
  // folder.add(donutMesh, 'wireframe');

  scene.add(donutMesh);
}

/**
 * Object
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial()
// );

// scene.add(cube);

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
camera.position.z = 3;
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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
