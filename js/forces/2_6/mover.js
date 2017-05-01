export default class Mover {

  constructor(length, r, m) {
    this.length = length;
    this.r = r;

    // mass value is too large to be same as radius, so divde(or subtract) by moderate number(15)
    this.mass = m || r/35;

    // first location should be set when sphere is created. (spherer.position)
    // this.location = new THREE.Vector3(30, 30, 30);
    this.velocity = new THREE.Vector3(1, 0, 0);
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

    this.sphere.position.x = 0;
    this.sphere.position.y = this.length/3;
    this.sphere.position.z = -1;
  }
}
