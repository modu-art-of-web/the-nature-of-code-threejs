import { Page, size, random, getWidth } from '../../utils';
import Mover from './mover';

let container = document.getElementById('container'),
    width, height,
    page;

const r = 45, // sphere radius
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

  let wind1 = new THREE.Vector3(0.1, 0, 0),
      wind2 = new THREE.Vector3(0, 0, 0.001),
      gravity = new THREE.Vector3(0, -0.2, 0);

  let movers = [];
  for (let i = 0; i < 10; i++) {
    movers.push(new Mover(length, random(10, r)));

    let m = movers[i];
    m.display();
    page.scene.add(m.sphere);

    m.applyForce(wind1);
    m.applyForce(wind2);
    m.applyForce(gravity);
    draw(m);
  }

  page.render(container);

  window.addEventListener('resize', onWindowResize, false);

  function draw(m) {
    m.update();
    m.checkEdges();

    window.animateId = requestAnimationFrame(() => { draw(m) });
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
