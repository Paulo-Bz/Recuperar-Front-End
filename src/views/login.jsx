import { CardBody } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { guardarDatos, guardarToken } from '../utils/login';

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [errores, setErrores] = useState({});
    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuthContext();

    const cambiarUsuario = (e) => {
        setUsuario(e.target.value);
    }
    const cambiarContraseña = (e) => {
        setContraseña(e.target.value);
    }
    const verificarDatos = async () => {
        let datosVacios = {}

        if (usuario.length === 0) {
            datosVacios.usuario = 'Introducir al menos un usuario';
        }
        if (contraseña.length === 0) {
            datosVacios.contraseña = 'Introducir al menos una contraseña'
        }

        setErrores(datosVacios);

        if (Object.entries(datosVacios).length === 0) {
            setDeshabilitarBoton(true);

            await enviarDatos();
        }
    }
    const enviarDatos = async () => {
        const url = 'http://localhost:3000/autenticar';

        const datos = {
            usuario: usuario,
            contraseña: contraseña,
        }
        try {
            const respuesta = await axios.post(url, datos);

            if (respuesta.status === 200) {
                const { datos, token } = respuesta.data;

                login(datos, token);
                navigate('/')
            } else {
                setErrores({ error: 'Ocurrio un error al enviar Datos' });
            }
        } catch (error) {
            setErrores({ error: 'Ocurrio un error' });
        }

        setDeshabilitarBoton(false);
    }


    return (

        <CardBody>
            <Form>
                <Form.Group className="mb-3" controlId="usuario">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="text" placeholder="Usuario" onInput={cambiarUsuario} />
                    {
                        errores.usuario && (
                            <Form.Text style={{ color: "red" }}>
                                {errores.usuario}
                            </Form.Text>)
                    }

                </Form.Group>
                <Form.Group className="mb-3" controlId="contraseña">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" onInput={cambiarContraseña} />
                    {
                        errores.contraseña && (
                            <Form.Text style={{ color: "red" }}>
                                {errores.contraseña}
                            </Form.Text>)
                    }
                </Form.Group>
                {
                    errores.error && (
                        <Alert variant="warning">
                            {errores.error}
                        </Alert>
                    )
                }


                <Button variant="primary" onClick={verificarDatos} disabled={deshabilitarBoton}>
                    Ingresar
                </Button>
            </Form>
        </CardBody>
    )
}

export default Login;