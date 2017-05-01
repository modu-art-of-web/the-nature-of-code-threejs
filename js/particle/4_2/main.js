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

  let particles = [];

  draw();

  page.render(container);

  window.addEventListener('resize', onWindowResize, false);

  function draw() {
    let p = new Particle(width);
    p.display();
    page.scene.add(p.sphere);
    particles.push(p);

    for (let i = 0; i < particles.length; i++) {
      let particle = particles[i];

      particle.update();

      if (particle.isDead()) {
        page.scene.remove(particle.sphere);
        particles.splice(i, 1);
        i -= 1;
      }
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
