import { Page, size, getWidth } from '../../utils';
import Mover from './mover';
import Attractor from './attractor';

let container = document.getElementById('container'),
    width, height,
    page;

const r = 45, // sphere radius
      length = 500;  // box length

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

  const a = new Attractor(70);
  page.scene.add(a.mesh);

  const m = new Mover(length, 10);
  m.display();
  page.scene.add(m.sphere);

  draw(m);
  page.render(container);
  window.addEventListener('resize', onWindowResize, false);

  function draw(m) {
    const force = a.attract(m);
    m.applyForce(force);
    m.update();

    requestAnimationFrame(() => draw(m));
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
