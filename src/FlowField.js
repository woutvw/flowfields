import Particle from "./Particle";
import grid from "./grid";

export default class FlowField{
    particles = [];
    nrOrParticles = 1000;

    constructor(width, height){
        this.width = width;
        this.height = height;
        this.init();
    }

    init(){
        // generate the flowfield
        this.forces = new grid(this.width, this.height);
        // this.forces.addSins();
        this.forces.addPerlinNoise();
        console.log(this.forces)

        // create the particles
        for(let i = 0; i < this.nrOrParticles; i++){
            this.particles.push(new Particle(this));
        }
    }
    render(ctx){
        // this.forces.draw(ctx);
        this.particles.forEach(particle => {
            particle.draw(ctx);
            particle.update();
        });
    }
    getTotalForceAngle(x,y){
        const angle = this.forces.getForceAngle(x,y);
        return angle;
    }
}