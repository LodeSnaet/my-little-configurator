import {Outlet} from "react-router-dom";
import Nav from "./components/navigation/Nav.tsx";
import {Container} from "react-bootstrap";
import {Leva} from "leva";

function Layout() {
    return (
        <Container>
            <Leva hidden={import.meta.env.PROD} />

            <header>
                <Nav />
            </header>
            <main>
                <Outlet />
            </main>
        </Container>
    )
}

export default Layout