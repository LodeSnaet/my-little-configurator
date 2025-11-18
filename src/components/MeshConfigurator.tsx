import {useParams} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import {Canvas} from "@react-three/fiber";
import {cameraSettings} from "../scripts/globalSettings.ts";
import Experience from "./Experience.tsx";

function MeshConfigurator() {
    const {meshName} = useParams();

    console.log(meshName);
    return (
        <Row>
            <Col md={6}>
                <Canvas shadows camera={cameraSettings}>
                    <Experience />
                </Canvas>
            </Col>
            <Col md={6}>
                <h1>Hello</h1>
            </Col>
        </Row>
    )
}

export default MeshConfigurator