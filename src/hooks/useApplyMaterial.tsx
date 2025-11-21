import {useEffect} from "react";
import * as THREE from "three";
import {useProductStore} from "../scripts/productStore.ts";

export const useApplyMaterial = (scene: THREE.Group | null) => {
    const selectedMaterialMap = useProductStore(state => state.selectedMaterial);
    const availableMaterials = useProductStore(state => state.Materials);

    useEffect(() => {
        if (!scene) return;

        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                const parent = mesh.parent;

                const candidateKeys = [
                    mesh.name,
                    mesh.name.replace("pivot_", ""),
                    parent ? parent.name : null,
                    parent ? parent.name.replace("pivot_", "") : null
                ];

                const foundKey = candidateKeys.find(key => key && selectedMaterialMap[key]);

                if (foundKey) {
                    const targetColorName = selectedMaterialMap[foundKey];
                    const materialToApply = availableMaterials.find(mat => mat.name === targetColorName);

                    if (materialToApply) {
                        mesh.material = materialToApply;
                        mesh.material.needsUpdate = true;
                    }
                }
            }
        });

    }, [selectedMaterialMap, availableMaterials, scene]);
};

