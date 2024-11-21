import Coordinate from "../Coordinate";

export function generateForce(radians, strength){
    const forceX = strength * Math.cos(radians);
    const forceY = strength * Math.sin(radians);

    if(isNaN(forceX) || isNaN(forceY)){
        console.log('hier');
        let h = 0;
    }

    return new Coordinate(forceX, forceY)
}