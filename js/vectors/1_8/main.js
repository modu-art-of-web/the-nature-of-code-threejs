import { getWidth } from '../../utils';

let container = document.getElementById('container'),
    width, height;

let camera, scene, renderer;
let group;
let sphere;

//box distance
const r = 30,
      d = 600;

const topSpeed = 10;

let velocity, acceleration;

function init() {
  if (window.animateId) {
    cancelAnimationFrame(window.animateId);
  }

  width = getWidth();
  height = window.innerHeight;

  velocity = new THREE.Vector3(0, 0, 0);
  acceleration = new THREE.Vector3(0.005, 0.01, -0.001);

}

export function render() {
  init();

  scene = new THREE.Scene();

  group = new THREE.Group();
  scene.add(group);

  const boxMesh = new THREE.Mesh(new THREE.BoxGeometry(d+r, d+r, d+r));
  const helper = new THREE.BoxHelper(boxMesh);
  helper.material.color.setHex(0x009da8);  //box wire 색상
  group.add(helper);

  const sphereGeometry = new THREE.SphereGeometry(30, 32, 32);
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
  if (velocity.y < topSpeed) {
    velocity.add(acceleration);
  }

  sphere.position.add(velocity);

  if (sphere.position.x > d/2) {
    sphere.position.x = -d/2;
  } else if (sphere.position.x < -d/2) {
    sphere.position.x = d/2;
  }

  if (sphere.position.y > d/2) {
    sphere.position.y = -d/2;
  } else if (sphere.position.y < -d/2) {
    sphere.position.y = d/2;
  }

  if (sphere.position.z > d/2) {
    sphere.position.z = -d/2;
  } else if (sphere.position.z < -d/2) {
    sphere.position.z = d/2;
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