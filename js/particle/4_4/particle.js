import * as THREE from 'three';
import { random } from '../../utils';

export default class Particle {

    constructor(length, mouse) {
        this.length = length;
        this.mouse = mouse;

        this.velocity = new THREE.Vector3(random(-1, 1), random(-2, 0), random(-2, 2));
        this.acceleration = new THREE.Vector3(0, -0.05, 0);

        this.lifespan = 1;
    }

    update() {
        this.lifespan -= 0.009;
        this.sphere.material.opacity = this.lifespan;

        this.velocity.add(this.acceleration);

        this.sphere.position.x += this.velocity.x;
        this.sphere.position.y += this.velocity.y;
        this.sphere.position.z += this.velocity.z;
    }

    display() {
        let sphereGeometry = new THREE.SphereGeometry(10, 32, 32),
            sphereMaterial = new THREE.MeshNormalMaterial({ transparent: true });

        this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.sphere.material.opacity = 1.0;

        if (this.mouse) {
            this.sphere.position.x = this.mouse[0];
            this.sphere.position.y = this.mouse[1];
        } else {
            this.sphere.position.x = 0;
            this.sphere.position.y = 0;
        }
        this.sphere.position.z = 0;
    }

    isDead() {
        return this.lifespan < 0;
    }
}