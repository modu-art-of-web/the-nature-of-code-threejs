import { Page, getWidth } from '../../utils';
import Particle from './particle';

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

  let p = new Particle(width);
  p.display();
  page.scene.add(p.sphere);

  draw();

  page.render(container);
  window.addEventListener('resize', onWindowResize, false);

  function draw() {
    p.update();

    if (p.isDead()) {
      page.scene.remove(p.sphere);

      p = new Particle(width);
      p.display();
      page.scene.add(p.sphere);
    }

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
