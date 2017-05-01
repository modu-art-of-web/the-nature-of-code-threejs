import { constrain } from '../../utils';

export default class Attractor {

    constructor(mass) {
        this.r = 30; //radius
        this.mass = 30/15;
        this.g = 0.4;

        var geometry = new THREE.SphereGeometry(this.r, 32, 32);
        var material = new THREE.MeshNormalMaterial();
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.x = 0;
        this.mesh.position.y = 0;
        this.mesh.position.z = 1;
    }

    attract(m) {
        let force = this.mesh.position.clone();
        force.sub(m.sphere.position);
        force.normalize();
        
        let distance = this.mesh.position.distanceTo(m.sphere.position);
        distance = constrain(distance, 50, 200);

        let strength = (this.g * this.r * m.r) / (distance * distance);
        force.multiplyScalar(strength);
        
        return force;
    }
}
