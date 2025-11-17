import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./styles/styles.scss";
import Home from "./views/Home.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage.tsx";
import Configurator from "./views/Configurator.tsx";
import Layout from "./Layout.tsx";
import Card from "./views/Cart.tsx";
import MeshConfigurator from "./components/MeshConfigurator.tsx";

export const router = [
    {
        index: true,
        element: <Home />,
        icon: null,
        isNav: true
    },
    {
        path: '/configure',
        element: <Configurator />,
        icon: null,
        isNav: true
    },
    {
        path: '/configure/:meshName',
        element: <MeshConfigurator />,
        icon: null,
        isNav: false
    },
    {
        path: '/cart',
        element: <Card />,
        icon: "bag",
        isNav: true
    },
    {
        path: '*',
        element: <NotFoundPage />,
        icon: null,
        isNav: false
    }
]


const Router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: router
}])

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={Router} />
    </StrictMode>,
);
