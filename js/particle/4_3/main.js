import { Page, getWidth } from '../../utils';
import ParticleSystem from './particleSystem';

let container = document.getElementById('container'),
    width, height,
    page;

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

  let ps = new ParticleSystem(page, width);

  draw();

  page.render(container);

  window.addEventListener('resize', onWindowResize, false);

  function draw() {
    ps.addParticle();
    ps.run();

    requestAnimationFrame(draw);
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
