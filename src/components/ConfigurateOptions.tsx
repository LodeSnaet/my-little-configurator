import {Html} from '@react-three/drei';
import * as THREE from 'three';
import {useControls} from "leva";

type MeshAnnotationProps = {
    meshName: string;
    positionOffset?: [number, number, number];
}

function ConfigurateOptions({meshName, positionOffset = [0, 0.1, 0]}: MeshAnnotationProps) {

    const offsetVector = new THREE.Vector3().fromArray(positionOffset);

    // Initial position = node position + offset
    const initialPositionArray: [number, number, number] = [
        offsetVector.x,
        offsetVector.y,
        offsetVector.z,
    ];

    const {offset} = useControls(`Tag: ${meshName}`, {
        offset: {
            value: initialPositionArray,
            step: 0.01,
            label: 'Offset'
        },
    });

    return (
        <group position={offset}>
            <Html>
                <a href={`/configure/${meshName}`} className="c-tag">
                    {meshName}
                </a>
            </Html>
        </group>
    );
}

export default ConfigurateOptions;
