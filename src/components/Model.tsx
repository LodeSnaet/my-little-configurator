// import {useGLTF} from '@react-three/drei';
// import {useEffect, useRef} from "react";
// import * as THREE from "three";
// import {useControls} from "leva";
// import {useLocation} from "react-router-dom";
// import {pageConfig} from "../scripts/globalSettings.ts";
// import {gsap} from 'gsap';
// import ConfigurateOptions from "./ConfigurateOptions.tsx";
//
// type ModelProps = {
//     model: string;
// }
//
//
// function Model({model}: ModelProps) {
//     const shoe = useGLTF(model);
//     const location = useLocation();
//     console.log(shoe.nodes);
//
//
//     const shoeRef = useRef<THREE.Group>(null);
//     const currentConfig = Object.entries(pageConfig).find(([path]) => path === location.pathname)?.[1] ?? pageConfig["/"];
//     const previousConfig = location.state != null
//         ? Object.entries(pageConfig).find(([path]) => path === location.state.prevPath)?.[1] ?? pageConfig["/"]
//         : pageConfig["/"];
//
//
//     const controls = {
//         position: {
//             value: currentConfig.position,
//             step: 0.01,
//             label: 'Position'
//         },
//         rotation: {
//             value: currentConfig.rotation,
//             step: 0.01,
//             label: 'Rotation'
//         },
//         scale: {
//             value: currentConfig.scale,
//             min: 0.1,
//             max: 5,
//             step: 0.1,
//             label: 'Scale'
//         } as const,
//     };
//
//     const {
//         position: controlledPosition,
//         rotation: controlledRotation,
//         scale: controlledScale
//     } = useControls(`shoe${location.pathname}`, controls);
//
//
//     useEffect(() => {
//         const shoeObject = shoeRef.current;
//         if (!shoeObject) return;
//
//         const targetConfig = currentConfig;
//         const prevConfig = previousConfig;
//
//         const commonGsapProperties = {
//             duration: 0.8,
//             repeat: 0,
//             ease: "power2.inOut",
//         };
//
//         const animationTargets = [
//             {
//                 target: shoeObject.position,
//                 prevValues: prevConfig.position,
//                 targetValues: targetConfig.position,
//             },
//             {
//
//                 target: shoeObject.rotation,
//                 prevValues: prevConfig.rotation,
//                 targetValues: targetConfig.rotation,
//             },
//         ];
//
//         animationTargets.forEach(({target, prevValues, targetValues}) => {
//             gsap.killTweensOf(target);
//
//             gsap.fromTo(target,
//                 {x: prevValues[0], y: prevValues[1], z: prevValues[2]},
//                 {
//                     ...commonGsapProperties,
//                     x: targetValues[0],
//                     y: targetValues[1],
//                     z: targetValues[2],
//                 }
//             );
//         });
//
//     }, [
//         location.pathname,
//         currentConfig,
//         previousConfig
//     ]);
//
//
//     return (
//         <mesh
//             ref={shoeRef}
//             position={controlledPosition}
//             rotation={controlledRotation}
//             scale={controlledScale}
//         >
//             <primitive object={shoe.scene} />
//
//             {/*{location.pathname === "/configure" && Object.entries(shoe.nodes).filter(([type]) => type === "Object3D"*/}
//             {/*).map(([meshName, mesh]) => {*/}
//             {/*    return (*/}
//             {/*        <ConfigurateOptions*/}
//             {/*            key={mesh.uuid}*/}
//             {/*            scene={shoe.scene}*/}
//             {/*            meshName={meshName}*/}
//             {/*            positionOffset={[0.2, 0.1, 0]}*/}
//             {/*        />*/}
//             {/*    );*/}
//             {/*})}*/}
//
//             {location.pathname === "/configure" &&
//                 Object.entries(shoe.nodes)
//                     .filter(([meshName, node]) => node.constructor.name === "_Object3D")
//                     .map(([meshName, node]) => (
//                         <ConfigurateOptions
//                             key={node.uuid}       // node UUID for React key
//                             scene={shoe.scene}
//                             meshName={meshName}   // key from nodes
//                             positionOffset={[0.2, 0.1, 0]}
//                         />
//                     ))
//             }
//
//         </mesh>
//     );
// }
//
// export default Model;

import {useGLTF} from '@react-three/drei';
import {useEffect, useRef} from "react";
import * as THREE from "three";
import {useControls} from "leva";
import {useLocation} from "react-router-dom";
import {pageConfig} from "../scripts/globalSettings.ts";
import {gsap} from 'gsap';
import ConfigurateOptions from "./ConfigurateOptions.tsx";

type ModelProps = {
    model: string;
}

function Model({model}: ModelProps) {
    const shoe = useGLTF(model);
    const location = useLocation();

    const shoeRef = useRef<THREE.Group>(null);

    const currentConfig = Object.entries(pageConfig)
        .find(([path]) => path === location.pathname)?.[1] ?? pageConfig["/"];

    const previousConfig = location.state != null
        ? Object.entries(pageConfig)
        .find(([path]) => path === location.state.prevPath)?.[1] ?? pageConfig["/"]
        : pageConfig["/"];

    // Leva controls
    const controls = {
        position: {value: currentConfig.position, step: 0.01, label: 'Position'},
        rotation: {value: currentConfig.rotation, step: 0.01, label: 'Rotation'},
        scale: {value: currentConfig.scale, min: 0.1, max: 5, step: 0.1, label: 'Scale'} as const,
    };

    const {position: controlledPosition, rotation: controlledRotation, scale: controlledScale} =
        useControls(`shoe${location.pathname}`, controls);

    useEffect(() => {
        const shoeObject = shoeRef.current;
        if (!shoeObject) return;

        const commonGsapProperties = {
            duration: 0.8,
            repeat: 0,
            ease: "power2.inOut",
        };

        const animationTargets = [
            {target: shoeObject.position, prevValues: previousConfig.position, targetValues: currentConfig.position},
            {target: shoeObject.rotation, prevValues: previousConfig.rotation, targetValues: currentConfig.rotation},
        ];

        animationTargets.forEach(({target, prevValues, targetValues}) => {
            gsap.killTweensOf(target);
            gsap.fromTo(target,
                {x: prevValues[0], y: prevValues[1], z: prevValues[2]},
                {...commonGsapProperties, x: targetValues[0], y: targetValues[1], z: targetValues[2]}
            );
        });

    }, [location.pathname, currentConfig, previousConfig]);


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

