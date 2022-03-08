import clienteAxios from '../config/axios';

export const crearCitacion = async (citacion) => {
    try {
        const { data } = await clienteAxios.post('/citacion', citacion);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const editarCitacion = async (citacion) => {
    try {
        const { data } = await clienteAxios.put(`/citacion/${citacion._id}`, citacion);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const obtenerCitaciones = async () => {
    try {
        const { data } = await clienteAxios.get('/citacion');
        return data;
    } catch (error) {
        console.log(error);
    }
};


export const eliminarCitacion = async (id) => {
    try {
        const { data } = await clienteAxios.delete(`/citacion/${id}`);
        return data;
    } catch (error) {
        console.log(error);
    }
};