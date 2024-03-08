import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

// Position after creating the mesh
// mesh.position.x = 0.7;
// mesh.position.y = -0.7;
// mesh.position.z = -2;
scene.add(mesh);

// Set all three properties at once
mesh.position.set(0.7, -0.6, 1);

// Distance  between the center
console.log(mesh.position.length());

// Reduce vector to 1
// mesh.position.normalize();
console.log(mesh.position.length());

// Scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.6;
mesh.scale.set(2, 0.5, 0.6);

// Rotation
// Pi is half a rotation 180 degrees
// mesh.rotation.reorder('YXZ');
mesh.rotation.y = Math.PI * 0.25;
mesh.rotation.x = Math.PI * 0.25;

// Quaternion

// Group
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'blue' })
);
group.add(cube1);
group.add(cube2);
group.add(cube3);
cube2.position.x = -2;
cube3.position.x = 2;

group.position.y = 1.2;
group.rotation.y = 1.4;
// Object3d insances have look at

// Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height
);

camera.position.z = 3;
scene.add(camera);

// camera.lookAt(mesh.position);

// Distance between cube and camera
// console.log(mesh.position.distanceTo(camera.position));

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
