import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import GUI from 'lil-gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();
const fontLoader = new FontLoader();

let group;
group = new THREE.Group();

fontLoader.load('fonts/helvetiker_regular.typeface.json', (font) => {
  const geometry = new TextGeometry('Dior', {
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
  const textMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture,
  });
  const textMesh = new THREE.Mesh(geometry, textMaterial);
  geometry.center();
  textMesh.position.y = 0.5;
  group.add(textMesh);
});

// textGeo.center();

// const textMaterial = new THREE.MeshMatcapMaterial({
//   matcap: matcapTexture,
// });
// const textMesh = new THREE.Mesh(textGeo, textMaterial);
// scene.add(textMesh);

/**
 * Base
 */
// Debug
// const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

scene.add(group);
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('textures/matcaps/3.png');
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Ambientlight
// const ambientlight = new THREE.AmbientLight(0xffffff, 5);
// scene.add(ambientlight);

const pointLight = new THREE.PointLight(0xffffff, 5);
scene.add(pointLight);
pointLight.position.x = -0.2;

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
scene.add(directionalLight);
directionalLight.position.x = 3;

const spotlight = new THREE.SpotLight(0xffffff, 10, 10, 1, 0.2, 1);
scene.add(spotlight);

// const texture = new THREE.MeshBasicMaterial({ color: 'white' });
// const planeMesh = new THREE.Mesh(
//   new THREE.PlaneGeometry(20, 20, 30, 30),
//   texture
// );
// planeMesh.rotation.x = -Math.PI * 0.5;
// planeMesh.position.y = -0.01;
// scene.add(planeMesh);

loader.load('/gltf/scene.gltf', (gltf) => {
  const content = gltf.scene;
  content.rotation.y = Math.PI * 1.5;
  // content.position.x = -0.3;
  content.position.y = -1;
  group.add(content);
});

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
camera.position.y = 0.5;
camera.position.z = 2;
scene.add(camera);

camera.lookAt(new THREE.Vector3(0, 0, 0));

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

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
  group.rotation.y = elapsedTime * Math.PI * -0.1;
  // Update controls
  // controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
