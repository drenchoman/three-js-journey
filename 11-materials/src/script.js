import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// TExtures
const textureLoader = new THREE.TextureLoader();
const alphaTexture = textureLoader.load('./textures/door/alpha.jpg');
const ambientOcclusionTexture = textureLoader.load(
  './textures/door/ambientOcclusion.jpg'
);
const colorTexture = textureLoader.load('./textures/door/color.jpg');
const heightexture = textureLoader.load('./textures/door/height.jpg');
const metalnessTexture = textureLoader.load(
  './textures/door/metalness.jpg'
);
const normalTexture = textureLoader.load(
  './textures/door/normal.jpg'
);
const roughnessTexture = textureLoader.load(
  './textures/door/roughness.jpg'
);

const matcapTexture = textureLoader.load('./textures/matcaps/3.png');

const gradientTexture = textureLoader.load(
  './textures/gradients/3.jpg'
);

colorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Geometries

const sphereGeo = new THREE.SphereGeometry(0.5, 16, 16);
const planeGeo = new THREE.PlaneGeometry(1, 1);
const torusGeo = new THREE.TorusGeometry(0.3, 0.2, 16, 32);

// MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial();
// material.map = colorTexture;
// material.color = new THREE.Color('red');
// material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.1;
// material.aplhaMap = alphaTexture;
// material.side = THREE.DoubleSide;

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// MeshMatCapMaterial
const material = new THREE.MeshMatcapMaterial();
material.matcap = matcapTexture;

// Mesh
const mesh1 = new THREE.Mesh(sphereGeo, material);
const mesh2 = new THREE.Mesh(planeGeo, material);
const mesh3 = new THREE.Mesh(torusGeo, material);
scene.add(mesh1, mesh2, mesh3);

mesh2.position.x = -1.5;
mesh3.position.x = 1.5;
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

  // Update controls
  controls.update();
  mesh1.rotation.x = -0.15 * elapsedTime;
  mesh2.rotation.x = -0.15 * elapsedTime;
  mesh3.rotation.x = -0.15 * elapsedTime;

  mesh1.rotation.y = 0.1 * elapsedTime;
  mesh2.rotation.y = 0.1 * elapsedTime;
  mesh3.rotation.y = 0.1 * elapsedTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
