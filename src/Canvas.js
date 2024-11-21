import React, { useEffect, useRef } from "react";
import FlowField from "./FlowField";
import Coordinate from "./Coordinate";
import AntiGravityEffect from "./effects/AntiGavityEffect";
import RotationEffect from "./effects/RotationEffect";

export default function Canvas(props){
    const canvasRef = useRef();

    const flowField = new FlowField(props.width, props.height);
    // flowField.forces.effects.push(new RotationEffect(new Coordinate(5,5)))
    // flowField.forces.updateEffectForces();

    const draw = (ctx, frameCount) => {
        const canvas = canvasRef.current
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Set the background color to black
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        flowField.render(ctx);
    }

    useEffect(() => {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            let frameCount = 0
            let animationFrameId

            //Our draw came here
            const render = () => {
                frameCount++

                draw(context, frameCount)
                animationFrameId = window.requestAnimationFrame(render)
            }
            render()

            return () => {
                window.cancelAnimationFrame(animationFrameId)
            }
    })

    document.addEventListener('click',function(e){
        const {x, y} = e;
        const location = flowField.forces.toLocalCoords(new Coordinate(x,y));
        flowField.forces.effects.push(new RotationEffect(location))
        flowField.forces.updateEffectForces();
    })

    return (
        <canvas ref={canvasRef} {...props}></canvas>
    )
}