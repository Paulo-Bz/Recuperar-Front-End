import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



const FormularioRegistrarUsuario = () => {


    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
    const [errores, setErrores] = useState({});

    const navigate = useNavigate();

    const cambiarUsuario = (e) => {
        setUsuario(e.target.value);
    }
    const cambiarContraseña = (e) => {
        setContraseña(e.target.value);
    }
    const cambiarNombres = (e) => {
        setNombres(e.target.value);
    }
    const cambiarApellidos = (e) => {
        setApellidos(e.target.value);
    }


    const verificarDatos = async () => {
        let datosVacios = {}

        if (usuario.length === 0) {
            datosVacios.usuario = 'Introducir al menos un usuario';
        }
        if (contraseña.length === 0) {
            datosVacios.contraseña = 'Introducir al menos una contraseña'
        }
        if (nombres.length === 0) {
            datosVacios.nombres = 'Introducir al menos un nombre';
        }
        if (apellidos.length === 0) {
            datosVacios.apellidos = 'Introducir al menos un apellido';
        }

        setErrores(datosVacios);

        if (Object.entries(datosVacios).length === 0) {
            setDeshabilitarBoton(true);

            await enviarDatos();
        }
    }

    const enviarDatos = async () => {
        const url = 'http://localhost:3000/usuario';

        const datos = {
            usuario: usuario,
            contraseña: contraseña,
            nombres: nombres,
            apellidos: apellidos,
        }
        try {
            const respuesta = await axios.post(url, datos);

            if (respuesta.status === 200) {
                return navigate('/');

            } else {
                setErrores({ error: 'Ocurrio un error al enviar Datos' });
            }
        } catch (error) {
            setErrores({ error: 'Ocurrio un error' });
        }

        setDeshabilitarBoton(false);
    }
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label style={{ color: "blue" }}>Usuario</Form.Label>
                <Form.Control type="text" onInput={cambiarUsuario} />
                {
                    errores.usuario && (
                        <span style={{ color: "red" }}>
                            {errores.usuario}
                        </span>)
                }
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label style={{ color: "blue" }}>Contraseña</Form.Label>
                <Form.Control type="password" onInput={cambiarContraseña} />
                {
                    errores.contraseña && (
                        <span style={{ color: "red" }}>
                            {errores.contraseña}
                        </span>)
                }
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label style={{ color: "blue" }}>Nombres</Form.Label>
                <Form.Control type="text" onInput={cambiarNombres} />
                {
                    errores.nombres && (
                        <span style={{ color: "red" }}>
                            {errores.nombres}
                        </span>)
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label style={{ color: "blue" }}>Apellidos</Form.Label>
                <Form.Control type="text" onInput={cambiarApellidos} />
                {
                    errores.apellidos && (
                        <span style={{ color: "red" }}>
                            {errores.apellidos}
                        </span>)
                }
            </Form.Group>
            {
                errores.error && (
                    <Alert variant="warning">
                        {errores.error}
                    </Alert>
                )
            }

            <Button variant="primary" onClick={verificarDatos} disabled={deshabilitarBoton}>Registrar Usuario</Button>
            {
                deshabilitarBoton ? 'Datos Enviados' : 'Esperando enviar datos'
            }

        </Form>
    );
}

export default FormularioRegistrarUsuario;