import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


const EliminarPublicacion = () => {

    const [error, setError] = useState(false);
    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const volver = () => {
        navigate('/');
    }
    const eliminar = async () => {
        setError(false);
        setDeshabilitarBoton(true);

        try {
            const url = 'http://localhost:3000/publicacion'
            const respuesta = await axios.delete(url, { data: { id: id } });

            if (respuesta.status === 200) {
                return navigate('/');

            } else {
                setError('Ocurrio un error al eliminar');
            }
        } catch (error) {
            setError('Ocurrio un error');
        }
        setDeshabilitarBoton(false);
    }
    return (


        <Card.Body>
            <Alert style={{ borderColor: "red", fontSize: 25, textAlign: "center" }} variant="warning">
                ¿Esta seguro que desea eliminar la publicacion con este ID? {id}
            </Alert>
            {
                error && (<Alert variant="warning">{error}</Alert>)
            }
            <div style={{ textAlign: "center" }}>
                <ButtonGroup>
                    <Button variant="success" onClick={volver} disabled={deshabilitarBoton}>
                        Volver
                    </Button>
                    <Button variant="warning" onClick={eliminar} disabled={deshabilitarBoton}>
                        Eliminar
                    </Button>
                </ButtonGroup>
            </div>
        </Card.Body>


    )
}
export default EliminarPublicacion;