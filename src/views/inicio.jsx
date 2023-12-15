import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext.jsx';
import TablaDeDatos from '../components/tablaDeDatos.jsx';



const Inicio = () => {
    const [lista, setLista] = useState([]);

    const { usuario } = useAuthContext();

    const cargarLista = async () => {
        const url = 'http://localhost:3000/publicaciones';


        let respuesta = await fetch(url);

        if (respuesta.status === 200) {
            respuesta = await respuesta.json();

            setLista(respuesta);
        }
    }

    useEffect(() => {
        cargarLista();
    }, []);

    return (
        <Card.Body style={{ color: "blue", borderBlockColor: 'fuchsia' }}>
            <div className="comentario" style={{ backgroundColor: 'fuchsia' }}>
                {usuario ? ('Hola ' + usuario.nombres + ' aqui tienes una lista de publicaciones para ver y comentar') : 'Hola si deseas realizar una publicacion o comentario deberas registrarte e iniciar una sesion'}
            </div>
            <TablaDeDatos lista={lista} usuario={usuario} />
        </Card.Body>

    )
}

export default Inicio