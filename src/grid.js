import Coordinate from "./Coordinate";
import Perlin from "./Perlin";
import { generateForce } from "./utils/ForceHelper";

export default class grid{
    cellSize = 10; // 10
    effects = [];

    constructor(width, height){
        this.width = width;
        this.height = height;
        this.rows = Math.floor(height / this.cellSize);
        this.cols = Math.floor(width / this.cellSize);
        this.init();
    }

    init(){
        this.values = {}; this.effectForces={};
        for(let x = 0; x <= this.cols; x++){
            this.values[x]={}; this.effectForces[x]={};
            for(let y = 0; y <= this.rows; y++){
                this.values[x][y]=new Coordinate(0,0); this.effectForces[x][y]=new Coordinate(0,0);
            }
        }
    }

    updateEffectForces(){
        for(let x = 0; x <= this.cols; x++){
            for(let y = 0; y <= this.rows; y++){
                const location = new Coordinate(x,y);
                let force={x:0,y:0};
                this.effects.forEach(effect => {
                    const effectForce = effect.getForce(location);
                    force.x += effectForce.x;
                    force.y += effectForce.y;
                })
                this.effectForces[x][y]=force;
            }
        }
    }

    addSins(zoom = 0.15, curve = 0.5){
        for(let x = 0; x <= this.cols; x++){
            this.values[x]={};
            for(let y = 0; y <= this.rows; y++){
                const angle = (Math.cos(x * zoom) + Math.sin(y * zoom)) * curve;
                this.values[x][y]=angle;
            }
        }
    }

    addNoise(){
        for(let x = 0; x <= this.cols; x++){
            this.values[x]={};
            for(let y = 0; y <= this.rows; y++){
                this.values[x][y]=Math.random()*(2*Math.PI);
            }
        }
    }

    addPerlinNoise(){
        let min=Infinity,max=-Infinity;
        const perlin = new Perlin();
        for(let x = 0; x <= this.cols; x++){
            for(let y = 0; y <= this.rows; y++){
                const perlinX = perlin.toPerlinCoords(x, this.width);
                const perlinY = perlin.toPerlinCoords(y, this.height);
                const angle = perlin.get(perlinX,perlinY)
                if(angle<min) min=angle;
                if(angle>max) max=angle;
                const force = generateForce(angle*2*Math.PI,1);
                this.values[x][y]= force
            }
        }
        console.log(min,max)
    }

    getForceAngle(x,y){
        const gridX = Math.floor(x / this.cellSize);
        const gridY = Math.floor(y / this.cellSize);

        const baseForce = this.values[gridX][gridY];
        const effectForce = this.effectForces[gridX][gridY];

        const totalForceX = baseForce.x + effectForce.x;
        const totalForceY = baseForce.y + effectForce.y;

        const angle = Math.atan2(totalForceY, totalForceX);
        return angle
    }

    draw(ctx){
        for(let x = 0; x <= this.cols; x++){
            for(let y = 0; y <= this.rows; y++){
                const startX = x*this.cellSize;
                const startY = y*this.cellSize;
                const value = this.getForceAngle(startX,startY);
                const normalizedValue = this.normalizeRadians(value);
                ctx.fillStyle = `rgb(
                    ${Math.floor(normalizedValue * 255)},
                    ${Math.floor(normalizedValue * 255)},
                    ${Math.floor(normalizedValue * 255)}`;
                ctx.fillRect(startX, startY, this.cellSize, this.cellSize);
            }
        }
    }

    normalizeRadians(radians){
        radians = ((radians + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
        const normalizedValue = (radians + Math.PI) / (2 * Math.PI);
        return normalizedValue;
    }

    toLocalCoords(location){
        const gridX = Math.floor(location.x / this.cellSize);
        const gridY = Math.floor(location.y / this.cellSize);
        return new Coordinate(gridX,gridY)
    }
}