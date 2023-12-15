import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext.jsx';
import FormularioEditarComentario from '../components/formEditarComentario.jsx'


const EditarComentario = () => {
    const { id } = useParams();
    const { token, usuario } = useAuthContext();

    return (
        <Card.Body>
            <FormularioEditarComentario id={id} token={token} usuario={usuario} />
        </Card.Body>
    )
}

export default EditarComentario;