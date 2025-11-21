import {useEffect} from "react";
import {useProductStore} from "../scripts/productStore.ts";
import type {GLTF} from "three-stdlib";
import * as THREE from "three";

export const useModel = (shoe: GLTF, mat: Record<string, THREE.Material>) => {
    const setModel = useProductStore((state) => state.setModel);
    const setMaterials = useProductStore((state) => state.setMaterials);
    const materials = Object.values(mat);

    useEffect(() => {
        setMaterials(materials);
        if (shoe.scene) {
            shoe.scene.name = "Nike Air Force 1";

            setModel(shoe.scene);
        }
    }, [shoe.scene, setModel, setMaterials]);
};