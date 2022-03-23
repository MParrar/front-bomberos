import {
  CERRAR_SESION,
  COMENZAR_INICIO_SESION,
  LOGIN_ERROR,
  LOGIN_EXITOSO,
  OBTENER_USUARIO,
} from '../../types';

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload,
        cargando: false,
      };
    case COMENZAR_INICIO_SESION:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_EXITOSO:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        autenticado: true,
        mensaje: null,
        cargando: false,
        loading: false,

      };
    case CERRAR_SESION:
    case LOGIN_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        mensaje: action.payload,
        cargando: false,
        usuario: null,
        token: null,
        autenticado: false,
        loading: false,

      };
    default:
      return state;
  }
};
