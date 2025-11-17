import {Canvas} from "@react-three/fiber";
import {cameraSettings} from "../scripts/globalSettings.ts";
import Experience from "../components/Experience.tsx";
import {Col, Row} from "react-bootstrap";

function Configurator() {
    return (
        <Row>
            <Col lg={"10"} className={"mx-auto"}>
                <div className={"c-configurator"}>
                    <Canvas shadows camera={cameraSettings}>
                        <Experience />
                    </Canvas>
                </div>
            </Col>
        </Row>
    );
}

export default Configurator