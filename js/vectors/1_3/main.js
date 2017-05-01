import { getWidth } from '../../utils';

let container = document.getElementById('container'),
    width, height;

let camera, scene, renderer;
let line;
let rayCaster;

function init() {
  if (window.animateId) {
    cancelAnimationFrame(window.animateId);
  }

  width = getWidth();
  height = window.innerHeight;
}

export function render() {
  init();

  scene = new THREE.Scene();

  const planeGeometry = new THREE.PlaneGeometry(100, 45);
  const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 20;
  plane.position.y = -25;
  plane.position.z = -5;
  scene.add(plane);

  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x009da8});
  const lineGeometry = new THREE.Geometry();
  lineGeometry.vertices.push(new THREE.Vector3(0, 15, 10));
  lineGeometry.vertices.push(new THREE.Vector3(0, 15, 10));
  line = new THREE.Line(lineGeometry, lineMaterial);
  line.castShadow = true;
  scene.add(line);

  const ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 40, 20);
  spotLight.castShadow = true;
  scene.add(spotLight);

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 60;
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xffffff));
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;

  container.innerHTML = '';
  container.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);

  rayCaster = new THREE.Raycaster();
  window.addEventListener('mousemove', redrawLine, false);

  animate();
}

function redrawLine(e) {
  let mouse = new THREE.Vector2();
  mouse.x = (e.clientX / width) * 2 - 1;
  mouse.y = -(e.clientY / height) * 2 + 1;

  let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
  vector.unproject(camera);

  //todo: 이해하기
  //https://jsfiddle.net/atwfxdpd/10/
  let dir = vector.sub(camera.position).normalize();
  let distance = -camera.position.z / dir.z;
  let pos = camera.position.clone().add(dir.multiplyScalar(distance));

  line.geometry.vertices[1] = pos;
  line.geometry.verticesNeedUpdate = true;
}

function animate() {
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