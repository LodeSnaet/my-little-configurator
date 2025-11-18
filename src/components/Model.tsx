import {useGLTF} from '@react-three/drei';
import {useRef} from "react";
import * as THREE from "three";
import {useControls} from "leva";
import {useLocation} from "react-router-dom";
import {pageConfig} from "../scripts/globalSettings.ts";
import ConfigurateOptions from "./ConfigurateOptions.tsx";
import {useAnimation} from "../hooks/useAnimation.tsx";

type ModelProps = {
    model: string;
}

function Model({model}: ModelProps) {
    const shoe = useGLTF(model);
    const location = useLocation();
    const shoeRef = useRef<THREE.Group>(null);

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
        pivot_material: new THREE.Vector3(-1.665, 1.573, -0.593),
        pivot_sole: new THREE.Vector3(-1.42, 0, 0.21),
        pivot_laces: new THREE.Vector3(42.01, 0, 6.25),
        pivot_color: new THREE.Vector3(3.7800000000000082, -0.34000000000000014, 4.4200000000000035),
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

