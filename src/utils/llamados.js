import axios from 'axios';

const url = 'http://localhost:3000/';

const traerDatosDePublicacionPorID = async (id) => {
    const endpoint = url + 'publicacion/' + id;

    try {
        const respuesta = await axios.get(endpoint);

        if (respuesta.status === 200) {
            return respuesta.data;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

const traerComentariosDePublicacionPorID = async (idPublicacion) => {
    const endpoint = url + 'comentarios/' + idPublicacion;

    try {
        const respuesta = await axios.get(endpoint);

        if (respuesta.status === 200) {
            return respuesta.data;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}


const traerComentarioDePublicacionPorID = async (id) => {
    const endpoint = url + 'comentario/' + id;

    try {
        const respuesta = await axios.get(endpoint);

        if (respuesta.status === 200) {
            return respuesta.data;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}


export {
    traerDatosDePublicacionPorID,
    traerComentariosDePublicacionPorID,
    traerComentarioDePublicacionPorID,
}