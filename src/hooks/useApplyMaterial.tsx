import {useEffect} from "react";
import * as THREE from "three";
import {useProductStore} from "../scripts/productStore.ts";

export const useApplyMaterial = (scene: THREE.Group) => {
    const selectedMaterial = useProductStore(state => state.selectedMaterial);
    const materials = useProductStore(state => state.Materials);

    useEffect(() => {
        if (!scene) return;
        let materialSelect;

        for (const meshName in selectedMaterial) {
            for (const [key] of Object.entries(selectedMaterial)) {
                if (key === meshName) {
                    materialSelect = materials.find(material => material.name === selectedMaterial[key]);
                }
            }
        }

        console.log(materialSelect);

    }, [selectedMaterial, materials, scene]);
};
