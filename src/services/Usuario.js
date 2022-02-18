import clienteAxios from '../config/axios';

export const crearUsuario = async (usuario) => {
  try {
    const { data } = await clienteAxios.post('/usuario', usuario);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerUsuariosService = async () => {
  try {
    const { data } = await clienteAxios.get('/usuario');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editarUsuario = async (usuario) => {
  try {
    const { data } = await clienteAxios.put(`/usuario/${usuario._id}`, usuario);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const eliminarUsuarioService = async (id) => {
  try {
    const { data } = await clienteAxios.delete(`/usuario/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const cambiarPassword = async (id, password) => {
  try {
    const { data } = await clienteAxios.put(
      `/usuario/generar-password/${id}`,
      password
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerBomberosEnServicio = async () => {
  try {
    const { data } = await clienteAxios.get('/usuario/en-servicio');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerBomberosActivos = async () => {
  try {
    const { data } = await clienteAxios.get('/usuario/activos');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const bomberoServicio = async (id, servicio) => {
  try {
    const { data } = await clienteAxios.put(
      `/usuario/servicio/${id}`,
      servicio
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const desactivarUsuario = async (id, activo) => {
  try {
    const { data } = await clienteAxios.put(`/usuario/alta-naja/${id}`);
  } catch (error) {
    console.log(error);
  }
};
