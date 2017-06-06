import * as THREE from 'three';
import { tocWidth } from './toc';

export class Page {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.scene = new THREE.Scene();
    this.initLight();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 4000);
    this.camera.position.z = 1500;
  }

  initLight() {
    let ambientLight = new THREE.AmbientLight(0x0c0c0c);
    this.scene.add(ambientLight);

    let spotLight = new THREE.SpotLight(0xffffff);
    this.scene.add(spotLight);
  }

  render(container) {
    container.innerHTML = '';
    container.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  onWindowResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }
}

export function size(width = 600, height = 600, depth = 600) {
  var boxMesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth));
  var helper = new THREE.BoxHelper(boxMesh);
  helper.material.color.setHex(0x009da8); //box wire 색상

  return helper;
}

export function random(min, max) {
  return Math.random() * (max - min) + min;
}

export function constrain(value, min, max) {
  if (value < min) return min;
  else if (value > max) return max;
  else return value;
}

export function getWidth() {
  const innerWidth = window.innerWidth;

  return (innerWidth < 701) ? innerWidth : innerWidth - tocWidth;
}