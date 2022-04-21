import { useReducer } from "react";
import clienteAxios from "../../config/axios";
import { AGREGAR_CUARTEL, OBTENER_CUARTELES } from "../../types";
import CuartelContext from "./cuartelContext";
import { CuartelReducer } from "./cuartelReducer";


const CuartelState = ({ children }) => {
    const initialState = {
        cuarteles: [],
    }

    const [state, dispatch] = useReducer(CuartelReducer, initialState);

    const obtenerCuarteles = async () => {
        try {
            const respuesta = await clienteAxios.get('/cuartel');
            dispatch({
                type: OBTENER_CUARTELES,
                payload: respuesta.data
            })
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <CuartelContext.Provider
            value={{
                cuarteles: state.cuarteles,
                obtenerCuarteles,
            }}
        >
            {children}
        </CuartelContext.Provider>
    )
}

export default CuartelState;