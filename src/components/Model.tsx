import {useGLTF} from '@react-three/drei';
import {useRef} from "react";
import * as THREE from "three";
import {useLocation} from "react-router-dom";
import {pageConfig} from "../scripts/globalSettings.ts";
import ConfigurateOptions from "./ConfigurateOptions.tsx";
import {useAnimation} from "../hooks/useAnimation.tsx";
import {useModel} from "../hooks/useModel.tsx";
import {useControls} from "leva";
import {useProductStore} from "../scripts/productStore.ts";
import {useApplyMaterial} from "../hooks/useApplyMaterial.tsx";

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
        pivot_body: new THREE.Vector3(9.919999999999929, 1.2000000000000015, -0.9700000000000006),
        pivot_tip: new THREE.Vector3(40.349999999999966, -7.81999999999999, 11.119999999999997),
    };


    const scene = useProductStore(state => state.model);
    useApplyMaterial(scene);

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

