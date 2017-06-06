import * as THREE from 'three';
import { constrain, random } from '../../utils';

export default class Mover {

  constructor(length, r, m) {
    this.length = length;
    this.r = r;
    this.g = 0.1;

    // mass value is too large to be same as radius, so divde(or subtract) by moderate number(15)
    this.mass = m || r/15;

    // first location should be set when sphere is created. (spherer.position)
    // this.location = new THREE.Vector3(30, 30, 30);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.acceleration = new THREE.Vector3(0, 0, 0);
  }

  applyForce(force) {
    let f = force.clone();

    f.divideScalar(this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);

    // impossible to set this.velocity(vector3) to this.sphere.position
    // because position is read-only
    this.sphere.position.x += this.velocity.x;
    this.sphere.position.y += this.velocity.y;
    this.sphere.position.z += this.velocity.z;

    this.acceleration.multiplyScalar(0);
  }

  display() {
    let sphereGeometry = new THREE.SphereGeometry(this.r, 32, 32),
        sphereMaterial = new THREE.MeshNormalMaterial();

    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    let sign = Math.round(Math.random()) * 2 - 1;
    this.sphere.position.x = random(0, this.length/2) * sign;
    this.sphere.position.y = random(0, this.length/2) * sign;
    this.sphere.position.z = random(0, this.length/2) * sign;
  }

  attract(mover) {
    let force = this.sphere.position.clone();
    force.sub(mover.sphere.position);
    force.normalize();

    let distance = this.sphere.position.distanceTo(mover.sphere.position);
    distance = constrain(distance, 50, 200);

    let strength = (this.g * this.r * mover.r) / (distance * distance);
    force.multiplyScalar(strength);

    return force;
  }
}
