import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';


const FormularioCrearPublicacion = () => {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
    const [errores, setErrores] = useState({});
    const navigate = useNavigate();
    const { token } = useAuthContext();

    const cambiarTitulo = (e) => {
        setTitulo(e.target.value);
    }

    const cambiarContenido = (e) => {
        setContenido(e.target.value);
    }

    const verificarDatos = async () => {
        let datosVacios = {}

        if (titulo.length === 0) {
            datosVacios.titulo = 'Debe introducir un título.';
        }

        if (contenido.length === 0) {
            datosVacios.contenido = 'Debe introducir un contenido.';
        }

        setErrores(datosVacios);

        if (Object.entries(datosVacios).length === 0) {
            setDeshabilitarBoton(true);

            await mandarDatos();
        }
    }

    const mandarDatos = async () => {
        const url = 'http://localhost:3000/publicacion';

        const datos = {
            titulo: titulo,
            contenido: contenido,
        }

        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.post(url, datos, { headers: headers });

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

    return (
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Titulo
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarTitulo} />
                    {
                        errores.titulo && (
                            <span style={{ color: 'red' }}>
                                {errores.titulo}
                            </span>
                        )
                    }
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Contenido
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" onInput={cambiarContenido} />
                    {
                        errores.contenido && (
                            <span style={{ color: 'red' }}>
                                {errores.contenido}
                            </span>
                        )
                    }
                </Col>
            </Form.Group>

            {
                errores.error && (
                    <Alert variant="warning">
                        {errores.error}
                    </Alert>
                )
            }

            <Button variant="primary" onClick={verificarDatos} disabled={deshabilitarBoton}>
                Crear publicación
            </Button>
        </Form>
    );
}

export default FormularioCrearPublicacion;