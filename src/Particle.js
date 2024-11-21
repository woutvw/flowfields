export default class Particle{
    speedX = 1;
    speedY = 1;

    forceX = 0;
    forceY = 0;

    angle = 0;

    constructor(flowField){
        this.flowField = flowField;
        this.maxLength = Math.floor(Math.random() * 50) + 100;
        this.maxSpeed = (Math.random() * 2) + 0.5;
        this.resetParticle();
    }
    resetParticle(){
        this.x = Math.floor(Math.random() * this.flowField.width);
        this.y = Math.floor(Math.random() * this.flowField.height);
        this.history = [{x: this.x, y: this.y}];
    }
    draw(ctx){
        ctx.fillRect(this.x, this.y, 1, 1);
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.moveTo(this.history[0].x, this.history[0].y);
        this.history.forEach(({x,y}) => {
            ctx.lineTo(x,y);
        })
        ctx.stroke();
    }
    update(){
        this.angle = this.flowField.getTotalForceAngle(this.x,this.y);

        const currentForce = {
            x: this.forceX,
            y: this.forceY
        };
        const flowForce = {
            x: Math.cos(this.angle),
            y: Math.sin(this.angle)
        }

        const { x:deltaX, y:deltaY } = this.getDeltaPosition(currentForce, flowForce);

        this.forceX = deltaX;
        this.forceY = deltaY;

        this.x += deltaX;
        this.y += deltaY;

        if(this.x > this.flowField.width){
            this.resetParticle();
        }
        if(this.x < 0){
            this.resetParticle();
        }
        if(this.y > this.flowField.height){
            this.resetParticle();
        }
        if(this.y < 0){
            this.resetParticle();
        }

        this.history.push({x: this.x, y: this.y});
        if(this.history.length > this.maxLength){
            this.history.shift();
        }
    }

    getDeltaPosition(currentForce, addForce){
        let newForce = {
            x: currentForce.x + addForce.x,
            y: currentForce.y + addForce.y
        }
        const magnitude = Math.sqrt(newForce.x ** 2 + newForce.y ** 2);
        if(magnitude > this.maxSpeed){
            newForce.x = (newForce.x / magnitude) * this.maxSpeed;
            newForce.y = (newForce.y / magnitude) * this.maxSpeed;
        }
        return newForce;
    }
}