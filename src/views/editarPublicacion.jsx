import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext.jsx';
import FormularioEditar from '../components/formEditarPublicacion.jsx';


const Editar = () => {
    const { id } = useParams();
    const { token, usuario } = useAuthContext();

    return (
        <Card.Body>
            <FormularioEditar id={id} token={token} usuario={usuario} />
        </Card.Body>
    )
}

export default Editar