import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

// New Gui
const gui = new GUI({
  width: 300,
});
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
  './textures/gradients/5.jpg'
);

colorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Geometries

const sphereGeo = new THREE.SphereGeometry(0.5, 64, 64);
const planeGeo = new THREE.PlaneGeometry(1, 1, 100, 100);
const torusGeo = new THREE.TorusGeometry(0.3, 0.2, 64, 128);

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
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial();

// MeshLambertMaterial -  Requires Light
// const material = new THREE.MeshLambertMaterial();

// MeshPhongMaterial()
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

// MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 1;
// material.roughness = 1;
// material.map = colorTexture;
// material.aoMap = ambientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = heightexture;
// material.displacementScale = 0.1;
// material.metalnessMap = metalnessTexture;
// material.roughnessMap = roughnessTexture;
// material.normalMap = normalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;

// material.alphaMap = alphaTexture;

// gui.add(material, 'metalness').min(0).max(1).step(0.0001);
// gui.add(material, 'roughness').min(0).max(1).step(0.0001);
// gui.add(material, 'wireframe');
// gui.add(material, 'displacementScale').min(0).max(1).step(0.0001);

const material = new THREE.MeshPhysicalMaterial();
material.metalness = 1;
material.roughness = 1;
material.map = colorTexture;
material.aoMap = ambientOcclusionTexture;
material.aoMapIntensity = 1;
material.displacementMap = heightexture;
material.displacementScale = 0.1;
material.metalnessMap = metalnessTexture;
material.roughnessMap = roughnessTexture;
material.normalMap = normalTexture;
material.normalScale.set(0.1, 0.1);
// material.transparent = true;
// material.alphaMap = alphaTexture;

gui.add(material, 'metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').min(0).max(1).step(0.0001);
gui.add(material, 'wireframe');
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001);

// Clearcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;

// gui.add(material, 'clearcoat').min(0.1).max(1).step(0.0001);
// gui.add(material, 'clearcoatRoughness').min(0.1).max(1).step(0.0001);

// Sheen
// material.sheen = 1;
// material.sheenRoughness = 0.25;
// material.sheenColor.set(1, 1, 1);

// gui.add(material, 'sheen').min(0).max(1).step(0.0001);
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001);
// gui.add(material, 'sheenColor');

// Iridescence
// material.iridescence = 1;
// material.iridescenceIOR = 1;
// material.iridescenceThicknessRange = [100, 800];

// gui.add(material, 'iridescence').min(0).max(1).step(0.0001);
// gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001);
// gui
//   .add(material.iridescenceThicknessRange, '1')
//   .min(1)
//   .max(1000)
//   .step(1);
// gui
//   .add(material.iridescenceThicknessRange, '0')
//   .min(1)
//   .max(1000)
//   .step(1);

// Transmission
material.transmission = 1;
material.ior = 1.5;
material.thickness = 0.5;

gui.add(material, 'transmission').min(0).max(1).step(0.0001);
gui.add(material, 'ior').min(1).max(10).step(0.0001);
gui.add(material, 'thickness').min(0).max(1).step(0.0001);

// Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 50);
// scene.add(pointLight);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;

// Environment map
const rgbeloader = new RGBELoader();
rgbeloader.load(
  './textures/environmentMap/2k.hdr',
  (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMap;
    scene.environment = environmentMap;
  }
);

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
