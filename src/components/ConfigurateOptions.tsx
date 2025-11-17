import {Html} from '@react-three/drei';
import * as THREE from 'three';
import {useControls} from "leva";

type MeshAnnotationProps = {
    scene: THREE.Group | THREE.Object3D;
    meshName: string;
    positionOffset?: [number, number, number];
}

function ConfigurateOptions({scene, meshName, positionOffset = [0, 0.1, 0]}: MeshAnnotationProps) {
    const targetMesh = scene.getObjectByName(meshName);

    if (!targetMesh) return null;

    const offsetVector = new THREE.Vector3().fromArray(positionOffset);
    const initialVector = targetMesh.position.clone().add(offsetVector);
    const initialPositionArray: [number, number, number] = [
        initialVector.x,
        initialVector.y,
        initialVector.z
    ];

    const {offset} = useControls(`Tag: ${meshName}`, {
        offset: {
            value: initialPositionArray as [number, number, number],
            step: 0.01,
            label: 'Offset'
        },
    });


    return (
        <group position={offset}>
            <Html>
                <a href={`/configure/${meshName}`} className={"c-tag"}>
                    {meshName}
                </a>
            </Html>
        </group>
    );
}

export default ConfigurateOptions;
