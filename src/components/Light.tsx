import {useControls} from "leva";
import {useRef} from "react";
import * as THREE from "three";

function Light() {
    const directionalLightRef = useRef<THREE.DirectionalLight>(null);

    // @ts-ignore
    // useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, "red");

    const {sunPosition, intensity, color} = useControls('Scene Settings', {
        sunPosition: {
            value: [1.3999999999999981, 2.5999999999999974, 0.6999999999999988] as [number, number, number],
            step: 0.1
        },
        color: {
            value: '#ffffff'
        },
        intensity: {
            value: 3,
            min: 0,
            max: 10,
            step: 0.1
        },
    });


    return (
        <directionalLight
            castShadow
            ref={directionalLightRef}
            position={sunPosition}
            intensity={intensity} // Use the controlled intensity
            color={color}         // Use the controlled color
            shadow-mapSize={[1024, 1024]}
        />
    );
}

export default Light;