import Particle from './particle';

export default class ParticleSystem {

    constructor(page, width, mouse) {
        this.page = page;
        this.width = width;
        this.mouse = mouse;

        this.particles = [];
    }

    addParticle() {
        let p = new Particle(this.width, this.mouse);
        p.display();
        this.page.scene.add(p.sphere);
        this.particles.push(p);
    };

    run() {
        for (let i = 0; i < this.particles.length; i++) {
            let particle = this.particles[i];

            particle.update();

            if (particle.isDead()) {
                this.page.scene.remove(particle.sphere);
                this.particles.splice(i, 1);
                i -= 1;
            }
        }
    };

}