import {Html, Line} from '@react-three/drei';
import * as THREE from 'three';
import {useControls} from "leva";

type MeshAnnotationProps = {
    mesh: THREE.Object3D,
    meshName: string,
    offsetVector: THREE.Vector3,
}

function ConfigurateOptions({mesh, meshName, offsetVector = new THREE.Vector3(0, 0.1, 0)}: MeshAnnotationProps) {
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

    const startLine = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
    const endLine = new THREE.Vector3(offset[0], offset[1], offset[2]);

    return (
        <group>
            <Line points={[startLine, endLine]}></Line>
            <group position={offset}>
                <Html>
                    <a href={`/configure/${meshName}`} className="c-tag">
                        {meshName}
                    </a>
                </Html>
            </group>
        </group>
    );
}

export default ConfigurateOptions;



