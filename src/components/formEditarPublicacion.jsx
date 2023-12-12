import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { traerDatosDePublicacionPorID } from './../utils/llamados.js';

const FormularioEditar = (props) => {
    const { id, usuario, token } = props;
    const url = 'http://localhost:3000/publicacion';

    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
    const [errores, setErrores] = useState({});

    const navigate = useNavigate();


    const cambiarTitulo = (e) => {
        setTitulo(e.target.value);
    }

    const cambiarContenido = (e) => {
        setContenido(e.target.value);
    }

    const verificarDatos = async () => {
        let datosVacios = {}

        if (titulo.length === 0) {
            datosVacios.titulo = 'Debe introducir al menos un titulo.';
        }

        if (contenido.length === 0) {
            datosVacios.contenido = 'Debe introducir al menos una descripcion.';
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
            titulo: titulo,
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
                setErrores({ error: 'Ocurrió un error inesperado' });
            }
        } catch (error) {
            setErrores({ error: 'Ocurrió un error inesperado' });
        }

        setDeshabilitarBoton(false);
    }

    const traerDatos = async () => {
        if (usuario) {
            const respuesta = await traerDatosDePublicacionPorID(id);

            if (respuesta) {
                if (usuario.id !== respuesta.autor) {
                    return navigate('/');
                }

                setTitulo(respuesta.titulo);
                setContenido(respuesta.contenido);
            } else {
                setErrores({ error: 'Ocurrió un error inesperado. No se pudo obtener la publicación' });
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
                <Form.Label style={{ color: "blue" }}>Titulo</Form.Label>
                <Form.Control type="text" onInput={cambiarTitulo} defaultValue={titulo} />
                {
                    errores.titulo && (<span style={{ color: "red" }}>{errores.titulo}</span>)
                }
            </Form.Group>
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
            <Button variant="primary" onClick={verificarDatos} disabled={deshabilitarBoton}>Editar Publicacion</Button>
            {
                deshabilitarBoton ? 'Datos Enviados' : 'Esperando enviar datos'
            }
        </Form>
    );
}

export default FormularioEditar;