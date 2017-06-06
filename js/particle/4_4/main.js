import * as THREE from 'three';
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

  let systems = [new ParticleSystem(page, width)];

  draw();

  page.render(container);

  window.addEventListener('click', getMouse, false);
  window.addEventListener('resize', onWindowResize, false);

  function getMouse(e) {
    let mouse = new THREE.Vector2();
    mouse.x = ((e.clientX-300) / (width-300)) * 2 - 1;
    // mouse.x = e.clientX / width;
    mouse.y = -((e.clientY-300) / (height-300)) * 2 + 1;
    // mouse.y = - (e.clientY / height);

    console.log(mouse.x, mouse.y)

    systems.push(new ParticleSystem(page, width, [mouse.x*100, mouse.y*100]));
  }

  function draw() {
    systems.forEach((el) => {
      el.addParticle();
      el.run();
    });

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
