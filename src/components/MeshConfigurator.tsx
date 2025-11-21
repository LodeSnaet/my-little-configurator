import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import {Canvas} from "@react-three/fiber";
import {cameraSettings, materialMap} from "../scripts/globalSettings.ts";
import Experience from "./Experience.tsx";
import {useProductStore} from "../scripts/productStore.ts";

function MeshConfigurator() {
    const {meshName} = useParams();
    const materials = useProductStore(state => state.Materials);
    const selectedMaterial = useProductStore(state => state.selectedMaterial);
    const setSelectedMaterial = useProductStore(state => state.setSelectedMaterial);

    const relevantMaterialNames = materialMap[meshName || ''] || [];

    // Initialize selected material to first in list
    useEffect(() => {
        if (meshName && !selectedMaterial?.[meshName] && relevantMaterialNames.length > 0) {
            setSelectedMaterial(meshName, relevantMaterialNames[0]);
        }
    }, [meshName, selectedMaterial, setSelectedMaterial, relevantMaterialNames]);

    return (
        <Row>
            <Col md={6}>
                <Canvas shadows camera={cameraSettings}>
                    <Experience />
                </Canvas>
            </Col>
            <Col md={6}>
                <h1>{meshName}</h1>

                {materials
                    .filter(materialInstance => relevantMaterialNames.includes(materialInstance.name))
                    .map((material, index) => {
                        const isChecked = selectedMaterial?.[meshName || ''] === material.name;

                        return (
                            <div key={index}>
                                <input
                                    type="radio"
                                    id={material.name}
                                    name="colors"
                                    value={material.name}
                                    checked={isChecked}
                                    onChange={() => {
                                        if (meshName) setSelectedMaterial(meshName, material.name);
                                    }}
                                />
                                <label htmlFor={material.name}>{material.name}</label>
                            </div>
                        );
                    })}
            </Col>
        </Row>
    );
}

export default MeshConfigurator;
