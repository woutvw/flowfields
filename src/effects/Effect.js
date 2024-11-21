import Coordinate from "../Coordinate";

export default class Effect{
    effectMultiplier = 30;

    constructor(location){
        this.location = location;
    }
    getForce(location){
        return new Coordinate(0,0)
    }
    getDistance(location){
        const deltaX = location.x - this.location.x;
        const deltaY = location.y - this.location.y;

        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        return distance;
    }
    getAngle(location){
        const deltaX = location.x - this.location.x;
        const deltaY = location.y - this.location.y;

        const radians = Math.atan2(deltaY, deltaX);
        return radians
    }
}