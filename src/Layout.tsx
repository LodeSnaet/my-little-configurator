import {Outlet} from "react-router-dom";
import Nav from "./components/navigation/Nav.tsx";
import {Container} from "react-bootstrap";

function Layout() {
    return (
        <Container>
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