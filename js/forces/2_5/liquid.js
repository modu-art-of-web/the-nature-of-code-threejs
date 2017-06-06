import * as THREE from 'three';

export default class Liquid {

  constructor(w, h, d, c) {
    this.w = w; //width
    this.h = h; //height
    this.d = d; //depth
    this.c = c; //coefficient of drag

    const geometry = new THREE.BoxGeometry(w, h, d);
    const material = new THREE.MeshBasicMaterial({
      color: 0x1874a2,
      transparent: true,
      opacity: .4
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.y = -h;
  }

  contain(mover) {
    return (mover.sphere.position.y < this.mesh.position.y + this.h / 2);
  }

  drag(mover) {
    const speed = mover.velocity.clone(),
          dragMagnitude = speed.multiply(speed).multiplyScalar(this.c);

    const drag = mover.velocity.clone();
    drag.multiplyScalar(-1);
    drag.normalize();

    drag.multiply(dragMagnitude);

    mover.applyForce(drag);
  }
}
