export default class Perlin{
    // https://github.com/joeiddon/perlin/blob/master/perlin.js
    constructor(){
        this.gridSize = 50;
        this.gradients = {};
        this.memory = {};
    }

    randomVector(){
        let theta = Math.random() * 2 * Math.PI;
        return {x: Math.cos(theta), y: Math.sin(theta)};
    }

    dotProductGrid(x, y, vx, vy){
        let g_vect;
        let d_vect = {x: x - vx, y: y - vy};
        if (this.gradients[[vx,vy]]){
            g_vect = this.gradients[[vx,vy]];
        } else {
            g_vect = this.randomVector();
            this.gradients[[vx, vy]] = g_vect;
        }
        return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
    }

    smootherStep(x){
        return 6*x**5 - 15*x**4 + 10*x**3;
    }

    interp(x, a, b){
        return a + this.smootherStep(x) * (b-a);
    }

    get(x, y){
        if (this.memory.hasOwnProperty([x,y]))
            return this.memory[[x,y]];
        let xf = Math.floor(x);
        let yf = Math.floor(y);
        //interpolate
        let tl = this.dotProductGrid(x, y, xf,   yf);
        let tr = this.dotProductGrid(x, y, xf+1, yf);
        let bl = this.dotProductGrid(x, y, xf,   yf+1);
        let br = this.dotProductGrid(x, y, xf+1, yf+1);
        let xt = this.interp(x-xf, tl, tr);
        let xb = this.interp(x-xf, bl, br);
        let v = this.interp(y-yf, xt, xb);
        this.memory[[x,y]] = v;
        return v;
    }

    toPerlinCoords(c, max){
        return c/max*this.gridSize;
    }
}