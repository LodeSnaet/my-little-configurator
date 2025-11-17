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
    console.info(shoe);


    const shoeRef = useRef<THREE.Group>(null);
    const currentConfig = Object.entries(pageConfig).find(([path]) => path === location.pathname)?.[1] ?? pageConfig["/"];
    const previousConfig = location.state != null
        ? Object.entries(pageConfig).find(([path]) => path === location.state.prevPath)?.[1] ?? pageConfig["/"]
        : pageConfig["/"];


    const controls = {
        position: {
            value: currentConfig.position,
            step: 0.01,
            label: 'Position'
        },
        rotation: {
            value: currentConfig.rotation,
            step: 0.01,
            label: 'Rotation'
        },
        scale: {
            value: currentConfig.scale,
            min: 0.1,
            max: 5,
            step: 0.1,
            label: 'Scale'
        } as const,
    };

    const {
        position: controlledPosition,
        rotation: controlledRotation,
        scale: controlledScale
    } = useControls(`shoe${location.pathname}`, controls);


    useEffect(() => {
        const shoeObject = shoeRef.current;
        if (!shoeObject) return;

        const targetConfig = currentConfig;
        const prevConfig = previousConfig;

        const commonGsapProperties = {
            duration: 0.8,
            repeat: 0,
            ease: "power2.inOut",
        };

        const animationTargets = [
            {
                target: shoeObject.position,
                prevValues: prevConfig.position,
                targetValues: targetConfig.position,
            },
            {

                target: shoeObject.rotation,
                prevValues: prevConfig.rotation,
                targetValues: targetConfig.rotation,
            },
        ];

        animationTargets.forEach(({target, prevValues, targetValues}) => {
            gsap.killTweensOf(target);

            gsap.fromTo(target,
                {x: prevValues[0], y: prevValues[1], z: prevValues[2]},
                {
                    ...commonGsapProperties,
                    x: targetValues[0],
                    y: targetValues[1],
                    z: targetValues[2],
                }
            );
        });

    }, [
        location.pathname,
        currentConfig,
        previousConfig
    ]);


    return (
        <mesh
            ref={shoeRef}
            position={controlledPosition}
            rotation={controlledRotation}
            scale={controlledScale}
        >
            <primitive object={shoe.scene} />

            {location.pathname === "/configure" && Object.entries(shoe.meshes).map(([meshName, mesh]) => {
                return (
                    <ConfigurateOptions
                        key={mesh.uuid}
                        scene={shoe.scene}
                        meshName={meshName}
                        positionOffset={[0.2, 0.1, 0]}
                    />
                );
            })}

        </mesh>
    );
}

export default Model;
