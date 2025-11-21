import {Html} from "@react-three/drei";
import {useRef} from "react";
import {useControls} from 'leva';
import Model from "./Model.tsx";
import {useLocation} from "react-router-dom";
import Light from "./Light.tsx";
import {useProductStore} from "../scripts/productStore.ts";


function Experience() {
    const htmlRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const shoe = "/models/home/shoe.glb";

    const {position, rotation, scale} = useControls('title', {
        position: {value: [0, 3.1599999999999775, 0] as [number, number, number]},
        rotation: {value: [-0.45700000000000035, 0, 0] as [number, number, number]},
        scale: {value: 0.9, min: 0.1, max: 5, step: 0.1} as { value: number, min: number, max: number, step: number }
    })


    const model = useProductStore((state) => state.model);

    let title: string = '';

    switch (location.pathname) {
        case '/configure':
            title = '';
            break;
        default:
            if (location.pathname.startsWith('/configure/')) {
                title = '';
            } else {
                title = model.name;
            }
            break;
    }

    return (
        <group>
            {/*<Leva hidden />*/}

            {/*<OrbitControls makeDefault />*/}

            {/* Lights */}
            <Light />

            <Model model={shoe} />
            <Html ref={htmlRef} transform position={position} rotation={rotation} scale={scale} center>
                <h1>{title}</h1>
            </Html>
        </group>
    )
}

export default Experience;

