import { createBrowserRouter } from "react-router-dom";

import Inicio from "./views/inicio";
import RegistrarUsuario from "./views/registrarDatos";
import EliminarPublicacion from "./views/eliminarPublicacion";
import Editar from "./views/editarPublicacion";
import Ver from "./views/ver";
import Login from "./views/login.jsx";
import CrearPublicacion from "./views/crearPublicacion";


const rutas = createBrowserRouter([
    {
        path: "/",
        element: <Inicio />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/crear",
        element: <CrearPublicacion />,
    },
    {
        path: "/register",
        element: <RegistrarUsuario />,
    },
    {
        path: "/Ver/:id",
        element: <Ver />,
    },
    {
        path: "/editar/:id",
        element: <Editar />,
    },
    {
        path: "/eliminar/:id",
        element: <EliminarPublicacion />,
    },
]);

export { rutas };