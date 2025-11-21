import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import {Canvas} from "@react-three/fiber";
import {cameraSettings, materialMap} from "../scripts/globalSettings.ts";
import Experience from "./Experience.tsx";
import {useProductStore} from "../scripts/productStore.ts";
import PrevPage from "./PrevPage.tsx";

function MeshConfigurator() {
    const {meshName} = useParams();
    const materials = useProductStore(state => state.Materials);
    const selectedMaterial = useProductStore(state => state.selectedMaterial);
    const setSelectedMaterial = useProductStore(state => state.setSelectedMaterial);

    const relevantMaterialNames = materialMap[meshName || ''] || [];

    useEffect(() => {
        if (meshName && !selectedMaterial?.[meshName] && relevantMaterialNames.length > 0) {
            setSelectedMaterial(meshName, relevantMaterialNames[0]);
        }
    }, [meshName, setSelectedMaterial]);


    return (
        <>
            <PrevPage />

            <Row style={{height: '80vh'}}>
                <Col md={6}>

                    <Canvas style={{height: '80%'}} shadows camera={cameraSettings}>
                        <Experience />
                    </Canvas>
                </Col>
                <Col md={6}>
                    <h1>{meshName}</h1>

                    <div className={"o-options"}>
                        <p>Colors</p>
                        {materials
                            .filter(materialInstance => relevantMaterialNames.includes(materialInstance.name))
                            .map((material, index) => {
                                const isChecked = selectedMaterial?.[meshName || ''] === material.name;
                                const previewColor = (material as any).color?.isColor
                                    ? (material as any).color.getStyle() // Geeft 'rgb(x,x,x)' terug
                                    : '#ccc'; // Fallback kleur

                                return (
                                    <label className={`c-options ${isChecked ? 'c-options--active' : ''}`} key={index}
                                           htmlFor={material.name}>
                                        <span style={{backgroundColor: previewColor}}></span>
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
                                        {material.name}
                                    </label>
                                );
                            })}
                    </div>
                </Col>
            </Row></>
    );
}

export default MeshConfigurator;
