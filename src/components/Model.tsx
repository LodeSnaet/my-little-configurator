import {useGLTF} from '@react-three/drei';
import {useRef} from "react";
import * as THREE from "three";
import {useLocation} from "react-router-dom";
import {pageConfig} from "../scripts/globalSettings.ts";
import ConfigurateOptions from "./ConfigurateOptions.tsx";
import {useAnimation} from "../hooks/useAnimation.tsx";
import {useModel} from "../hooks/useModel.tsx";
import {useControls} from "leva";

type ModelProps = {
    model: string;
}

function Model({model}: ModelProps) {
    const shoe = useGLTF(model);
    const location = useLocation();
    const shoeRef = useRef<THREE.Group>(null);


    useModel(shoe, shoe.materials);

    const currentPageConfig = Object.entries(pageConfig)
        .find(([path]) => path === location.pathname)?.[1] ?? pageConfig["/"];

    const previousPageConfig = location.state != null
        ? Object.entries(pageConfig)
        .find(([path]) => path === location.state.prevPath)?.[1] ?? pageConfig["/"]
        : pageConfig["/"];

    const controls = {
        position: {value: currentPageConfig.position, step: 0.01, label: 'Position'},
        rotation: {value: currentPageConfig.rotation, step: 0.01, label: 'Rotation'},
        scale: {value: currentPageConfig.scale, min: 0.1, max: 5, step: 0.1, label: 'Scale'} as const,
    };

    const {position: controlledPosition, rotation: controlledRotation, scale: controlledScale} =
        useControls(`shoe${location.pathname}`, controls);

    useAnimation(shoeRef, previousPageConfig, currentPageConfig, location.pathname);

    const pivotOffsets: Record<string, THREE.Vector3> = {
        pivot_sole: new THREE.Vector3(-1.2900000000000007, -0.28, 0.15),
        pivot_body: new THREE.Vector3(42.01, 0, 6.25),
        pivot_cube: new THREE.Vector3(0, 0, 0),
    };

    
    return (

        <group
            ref={shoeRef}
            position={controlledPosition}
            rotation={controlledRotation}
            scale={controlledScale}
        >
            <primitive object={shoe.scene} />

            {location.pathname === "/configure" &&
                Object.entries(shoe.nodes)
                    .filter(([meshName]) => meshName.startsWith("pivot_"))
                    .map(([meshName, node]) => {
                        const name = meshName.replace("pivot_", "");
                        const offset = pivotOffsets[meshName] ?? [0, 0.1, 0];

                        return (
                            <ConfigurateOptions
                                key={node.uuid}
                                meshName={name}
                                mesh={node}
                                offsetVector={offset}
                            />
                        );
                    })
            }
        </group>
    );
}

export default Model;

