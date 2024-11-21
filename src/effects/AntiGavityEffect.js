import { generateForce } from "../utils/ForceHelper";
import Effect from "./Effect";

export default class AntiGravityEffect extends Effect {
    getForce(location){
        const angle = this.getAngle(location);
        const distance = this.getDistance(location);

        const strength = (distance>0?(1/distance) * this.effectMultiplier:0);

        const force = generateForce(angle,strength);

        return force
    }
}