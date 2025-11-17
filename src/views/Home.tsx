import {Link, useLocation} from "react-router-dom";
import {Row} from "react-bootstrap";
import {Canvas} from "@react-three/fiber";
import Experience from '../components/Experience.tsx';
import {cameraSettings} from "../scripts/globalSettings.ts";


function Home() {
    const location = useLocation();
    return (
        <Row>
            <section className={"c-hero"}>
                <Canvas shadows camera={cameraSettings}>
                    <Experience />
                </Canvas>
                <Link
                    to={"/configure"}
                    state={{prevPath: location.pathname}}
                >
                    <button className={"c-button"}>Configure!</button>
                </Link>
            </section>
        </Row>
    );
}

export default Home;
