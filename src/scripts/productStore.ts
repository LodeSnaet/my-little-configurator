import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import * as THREE from 'three';
import {Group} from 'three';

type MaterialArray = THREE.Material[];
type MaterialName = string;
type SelectedMaterialMap = Record<string, MaterialName>;

type Product = {
    // State
    model: Group;
    Materials: MaterialArray;
    selectedMaterial: SelectedMaterialMap;

    // Actions
    setModel: (newModel: Group) => void;
    setMaterials: (newMaterials: MaterialArray) => void;
    setSelectedMaterial: (meshName: string, materialName: MaterialName) => void;

    // Optioneel: Reset functie (handig voor debuggen of 'begin opnieuw' knop)
    resetConfiguration: () => void;
}

export const useProductStore = create<Product>()(
    persist(
        (set) => ({
            // Initiële state
            model: new Group(),
            Materials: [],
            selectedMaterial: {},

            // Actions
            setModel: (newModel: Group) => set({model: newModel}),

            setMaterials: (newMaterials: MaterialArray) => set({Materials: newMaterials}),

            setSelectedMaterial: (meshName, materialName) => set((state) => ({
                selectedMaterial: {
                    ...state.selectedMaterial,
                    [meshName]: materialName,
                },
            })),

            resetConfiguration: () => set({selectedMaterial: {}}),
        }),
        {
            name: 'shoe-configurator-storage', // Unieke naam in localStorage
            storage: createJSONStorage(() => localStorage),

            // BELANGRIJK: Sla alleen de gebruikerskeuzes op.
            // Three.js objecten (model, Materials) kunnen NIET in localStorage.
            partialize: (state) => ({
                selectedMaterial: state.selectedMaterial,
            }),
        }
    )
);