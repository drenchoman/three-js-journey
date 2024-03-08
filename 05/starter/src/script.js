import * as THREE from 'three';
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height
);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

let time = Date.now();

// Clock
const clock = new THREE.Clock();

// Doing its own tick

gsap.to(mesh.position, { delay: 1, duration: 1, x: 2 });
gsap.to(mesh.position, { delay: 2, duration: 1, x: 0 });
gsap.to(mesh.position);

// Animations
const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime();
  // console.log(elapsedTime);
  // Time
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;

  // Update objects
  // mesh.rotation.y = elapsedTime / 2;
  // mesh.rotation.x = elapsedTime * Math.PI;
  // mesh.position.y = Math.sin(elapsedTime);
  // mesh.position.x = Math.cos(elapsedTime);

  // camera.position.x = Math.sin(elapsedTime) / 0.5;
  // camera.position.z = Math.sin(elapsedTime) / 0.25;
  // camera.lookAt(mesh.position);
  // mesh.rotation.x += 0.02;
  // mesh.rotatio

  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
