import * as THREE from 'three';
import { getWidth } from '../../utils';

let container = document.getElementById('container'),
    width, height;

let camera, scene, renderer;
let sphere;

//box distance
const r = 20,
      length = 500;

let velocity;

function init() {
  if (window.animateId) {
    cancelAnimationFrame(window.animateId);
  }

  width = getWidth();
  height = window.innerHeight;

  velocity = new THREE.Vector3(2.5, 5, 0.5);
}

export function render() {
  init();

  scene = new THREE.Scene();

  const group = new THREE.Group();
  scene.add(group);

  const boxMesh = new THREE.Mesh(new THREE.BoxGeometry(length+2*r, length+2*r, length+2*r));
  const helper = new THREE.BoxHelper(boxMesh);
  helper.material.color.setHex(0x009da8);  //box wire 색상
  group.add(helper);

  const sphereGeometry = new THREE.SphereGeometry(r, 32, 32);
  const sphereMaterial = new THREE.MeshNormalMaterial();
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  sphere.position.x = 0;
  sphere.position.y = 0;
  sphere.position.z = 0;
  scene.add(sphere);

  const ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  scene.add(spotLight);

  camera = new THREE.PerspectiveCamera(45, width / height, 1, 4000);
  camera.position.z = 1500;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  container.innerHTML = '';
  container.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);

  animate();
}

function animate() {
  sphere.position.add(velocity);

  if (sphere.position.x > length/2 || sphere.position.x < -length/2) {
    velocity.x *= -1;
  }

  if (sphere.position.y > length/2 || sphere.position.y < -length/2) {
    velocity.y *= -1;
  }

  if (sphere.position.z > length/2 || sphere.position.z < -length/2) {
    velocity.z *= -1;
  }

  window.animateId = requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function onWindowResize() {
  width = getWidth();
  height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}