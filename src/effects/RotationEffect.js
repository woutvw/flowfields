import Coordinate from "../Coordinate";
import { generateForce } from "../utils/ForceHelper";
import Effect from "./Effect";

export default class RotationEffect extends Effect {
    getForce(location){
        const distance = super.getDistance(location);
        let angle = super.getAngle(location);
        angle += Math.PI/2
        const strength = (distance>0?(1/distance) * 10:0);
        return generateForce(angle,strength);
    }
}