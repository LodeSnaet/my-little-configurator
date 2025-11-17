import {useControls} from "leva";
import {useRef} from "react";
import * as THREE from "three";
import {useHelper} from "@react-three/drei";

function Light() {
    const directionalLightRef = useRef<THREE.DirectionalLight>(null);

    // @ts-ignore
    useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, "red");

    const {sunPosition, intensity, color} = useControls('Scene Settings', {
        sunPosition: {
            value: [6.599999999999993, 4.899999999999999, 1.1999999999999984] as [number, number, number],
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