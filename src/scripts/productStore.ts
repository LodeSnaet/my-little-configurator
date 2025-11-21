import {create} from 'zustand';
import * as THREE from 'three';
import {Group} from 'three';

type MaterialArray = THREE.Material[];
type MaterialName = string;
type SelectedMaterialMap = Record<string, MaterialName>;

type Product = {
    model: Group,
    Materials: MaterialArray,
    selectedMaterial: SelectedMaterialMap;
    setModel: (newModel: Group) => void;
    setMaterials: (newMaterials: MaterialArray) => void;
    setSelectedMaterial: (meshName: string, materialName: MaterialName) => void;
}

export const useProductStore = create<Product>((set) => ({
    model: new Group(),
    Materials: [],
    selectedMaterial: {},
    setModel: (newModel: Group) => set({model: newModel}),
    setMaterials: (newMaterials: MaterialArray) => set({Materials: newMaterials}),
    setSelectedMaterial: (meshName, materialName) => set(state => ({
        selectedMaterial: {
            ...state.selectedMaterial,
            [meshName]: materialName,
        },
    })),
}))