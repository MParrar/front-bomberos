import clienteAxios from '../config/axios';

export const crearUsuario = async (usuario) => {
  try {
    const { data } = await clienteAxios.post('/usuario', usuario);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const obtenerUsuarios = async () => {
  try {
    const { data } = await clienteAxios.get('/usuario');
    console.log(data);
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

export const bomberoServicio = async (id, servicio, idCuartel) => {
  try {
    const { data } = await clienteAxios.put(`/usuario/servicio/${id}`, {
      servicio,
      idCuartel,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const desactivarUsuario = async (id, activo) => {
  try {
    const { data } = await clienteAxios.put(`/usuario/alta-naja/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerEstadisticas = async () => {
  try {
    const { data } = await clienteAxios.get('/usuario/logs');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerMisLogs = async (id) => {
  try {
    const { data } = await clienteAxios.get(`/usuario/mislogs/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const conducirMaquina = async (id, idMaquina) => {
  try {
    const { data } = await clienteAxios.post(
      `/usuario/maquina-conducir/${id}`,
      { idMaquina }
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const obtenerEstadisticaUsuario = async (id) => {
  try {
    const { data } = await clienteAxios.get(`/usuario/estadistica/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
