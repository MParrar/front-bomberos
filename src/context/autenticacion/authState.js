import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import { tokenAuth } from "../../config/token";
import { CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO } from "../../types";
import AuthContext from "./authContext";
import { AuthReducer } from "./authReducer";

const AuthState = ({ children }) => {

    const initalState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initalState);

    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        }
        try {
            const respuesta = await clienteAxios.get('/api/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: LOGIN_ERROR,
                payload: 'A ocurrido un error'
                // error.data.msg
            })
        }
    }
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });
            usuarioAutenticado()
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: 'A ocurrido un error'
                // error.data.msg
            })
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState;