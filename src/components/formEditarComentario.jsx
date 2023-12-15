import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { traerComentarioDePublicacionPorID } from "../utils/llamados";

const FormularioEditarComentario = (props) => {
    const { id, token } = props;
    const url = 'http://localhost:3000/comentario';


    const [contenido, setContenido] = useState('');
    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
    const [errores, setErrores] = useState({});

    const navigate = useNavigate();


    const cambiarContenido = (e) => {
        setContenido(e.target.value);
    }

    const verificarDatos = async () => {
        let datosVacios = {}

        if (contenido.length === 0) {
            datosVacios.contenido = 'Debe introducir al menos un contenido.';
        }
        setErrores(datosVacios);

        if (Object.entries(datosVacios).length === 0) {
            setDeshabilitarBoton(true);

            await mandarDatos();
        }
    }

    const mandarDatos = async () => {
        const datos = {
            id: id,
            contenido: contenido,
        }

        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.put(url, datos, { headers: headers });

            if (respuesta.status === 200) {
                return navigate('/');

            } else {
                setErrores({ error: 'Ocurrio un error' });
            }
        } catch (error) {
            setErrores({ error: 'No esta autorizado a editar este contenido' });
        }

        setDeshabilitarBoton(false);
    }

    const traerDatos = async () => {
        if (usuario) {
            const respuesta = await traerComentarioDePublicacionPorID(id);

            if (respuesta) {
                if (usuario.id !== respuesta.autor) {
                    return navigate('/');
                }

                setContenido(respuesta.contenido);

            } else {
                setErrores({ error: 'Ocurrió un error inesperado. No se pudo obtener el comentario' });
                setDeshabilitarBoton(true);
            }
        } else {
            return navigate('/');
        }

    }
    useEffect(() => {
        traerDatos();
    }, []);

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label style={{ color: "blue" }}>Contenido</Form.Label>
                <Form.Control type="text" onInput={cambiarContenido} defaultValue={contenido} />
                {
                    errores.contenido && (<span style={{ color: "red" }}>{errores.contenido}</span>)
                }
            </Form.Group>
            {
                errores.error && (<Alert variant="warning">{errores.error}</Alert>)
            }
            <Button variant="primary" onClick={verificarDatos} disabled={deshabilitarBoton}>Editar Comentario</Button>
            {
                deshabilitarBoton ? 'Datos Enviados' : 'Esperando enviar datos'
            }
        </Form>
    );
}

export default FormularioEditarComentario;