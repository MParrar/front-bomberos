import clienteAxios from '../config/axios';

export const crearMaquina = async (maquina) => {
  try {
    const { data } = await clienteAxios.post('/maquina', maquina);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerMaquinas = async () => {
  try {
    const { data } = await clienteAxios.get('/maquina');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerMaquinasEnServicio = async () => {
  try {
    const { data } = await clienteAxios.get('/maquina/servicio');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editarMaquina = async (maquina) => {
  try {
    const { data } = await clienteAxios.put(`/maquina/${maquina._id}`, maquina);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const eliminarMaquinaService = async (id) => {
  try {
    const { data } = await clienteAxios.delete(`/maquina/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
