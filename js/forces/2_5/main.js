import { Page, size, random, getWidth } from '../../utils';
import Mover from './mover';
import Liquid from './liquid';

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

  let liquid = new Liquid(length+2*r, (length+2*r)/3, length+2*r, 0.01);
  page.scene.add(liquid.mesh);

  let movers = [];
  for (let i = 0; i < 10; i++) {
    let randomR = random(10, r);
    movers.push(new Mover(length, randomR));

    let m = movers[i];
    m.display();
    page.scene.add(m.sphere);

    draw(m);
  }

  page.render(container);

  window.addEventListener('resize', onWindowResize, false);

  function draw(m) {
    if (liquid.contain(m)) liquid.drag(m);

    let gravity = new THREE.Vector3(0, -0.01*m.r, 0);
    m.applyForce(gravity);
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
