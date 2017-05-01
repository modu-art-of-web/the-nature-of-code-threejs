import { Page, size, getWidth } from '../../utils';
import Mover from './mover';

let container = document.getElementById('container'),
    width, height,
    page;

const r = 30, // sphere radius
      length = 600;  // box length

function init() {

  if (window.animateId) {
    cancelAnimationFrame(window.animateId);
  }

  width = getWidth();
  height = window.innerHeight;
}

export function render() {
  init();

  page = new Page(width, height);

  let box = size(length+2*r, length+2*r, length+2*r);
  page.scene.add(box);

  let m = new Mover(length, r);
  m.display();
  page.scene.add(m.sphere);

  let wind1 = new THREE.Vector3(0.1, 0, 0),
      wind2 = new THREE.Vector3(0, 0, 0.001),
      gravity = new THREE.Vector3(0, -0.2, 0);

  m.applyForce(wind1);
  m.applyForce(wind2);
  m.applyForce(gravity);
  draw();

  page.render(container);

  window.addEventListener('resize', onWindowResize, false);

  function draw() {
    m.update();
    m.checkEdges();

    window.animateId = requestAnimationFrame(draw);
    page.renderer.render(page.scene, page.camera);
  }
}

function onWindowResize() {
  width = getWidth();
  height = window.innerHeight;

  page.camera.aspect = width / height;
  page.camera.updateProjectionMatrix();

  page.renderer.setSize(width, height);
}
