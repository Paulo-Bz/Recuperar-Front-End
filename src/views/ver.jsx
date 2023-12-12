import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { traerDatosDePublicacionPorID, traerComentariosDePublicacionPorID } from '../utils/llamados.js';
import { useAuthContext } from '../context/AuthContext.jsx';
import { Container } from 'react-bootstrap';

const Ver = () => {
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [comentarios, setComentarios] = useState([]);
    const [miComentario, setMiComentario] = useState('');
    const { token } = useAuthContext();


    const traerDatos = async () => {
        const respuesta = await traerDatosDePublicacionPorID(id);

        if (respuesta) {
            setTitulo(respuesta.titulo);
            setContenido(respuesta.contenido);

            await traerComentarios()
        } else {
            console.log('No se obtubo la publicacion con el id ' + id)
        }
    }
    const traerComentarios = async () => {
        const respuesta = await traerComentariosDePublicacionPorID(id)

        if (respuesta) {
            setComentarios(respuesta)
        } else {
            console.log('No se obtubo los comentarios')
        }
    }


    const enviarComentario = async () => {
        const url = 'http://localhost:3000/comentarios'


        const datos = {
            contenido: miComentario,
            idPublicacion: id,
        }
        const headers = {
            token: token
        }

        try {
            const respuesta = await axios.post(url, datos, { headers: headers })
            if (respuesta.status === 200) {
                setMiComentario('')

                await traerComentarios()
            } else {
                console.log({ error: 'Ocurrio un error' })
            }
        } catch (error) {
            console.log({ error: 'Ocurrio un error' })
        }
    }

    useEffect(() => {
        traerDatos()
    }, []);



    return (
        <Card.Body style={{ backgroundImage: `url(https://www.kedin.es/wp-content/uploads/2018/09/imagenes-gratis.jpg)` }}>
            <Container style={{ marginBlock: '300px' }}>
                <Card style={{ fontSize: '25px' }} className="text-center">
                    <Card.Body style={{ backgroundColor: 'aliceblue' }}>
                        <Card.Title>{titulo}</Card.Title>
                        <Card.Text>
                            {contenido}
                        </Card.Text>
                        <Button variant="primary">Editar</Button>
                    </Card.Body>
                </Card>

                <br />

                <Card className="text-center">
                    <Card.Header>Comentarios</Card.Header>
                    <Card.Body>


                        {
                            comentarios.map((comentario, key) => (
                                <div key={key}>

                                    <Card className="text-center">
                                        <Card.Body>
                                            <Card.Title>{comentario.autor.apellidos + ' ' + comentario.autor.nombres}</Card.Title>
                                            <Card.Text>
                                                {comentario.contenido}
                                            </Card.Text>
                                            <Button variant="primary">Editar comentario</Button>
                                            <Button variant="warning">Eliminar comentario</Button>
                                        </Card.Body>
                                    </Card>
                                    <br />
                                </div>
                            ))
                        }
                        <br />
                        <Card>
                            <Card.Body>
                                <Card.Title>Agregar Comentario</Card.Title>
                                <br />
                                <FloatingLabel controlId="comentario" label="Comentario">
                                    <Form.Control
                                        onInput={(e) => setMiComentario(e.target.value)}
                                        value={miComentario}
                                        as="textarea"
                                        placeholder="Ingrese un comentario"
                                        style={{ height: '50px' }}
                                    />
                                </FloatingLabel>
                                <br />
                                <Button variant="primary" onClick={enviarComentario}>
                                    Agregar
                                </Button>
                            </Card.Body>
                        </Card>
                    </Card.Body>
                </Card>
            </Container>
        </Card.Body>
    );
}

export default Ver;