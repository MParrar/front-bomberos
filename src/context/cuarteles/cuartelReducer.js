import { AGREGAR_CUARTEL, OBTENER_CUARTELES } from "../../types";


export const CuartelReducer = (state, action) => {
    switch (action.type) {
        case OBTENER_CUARTELES:
            return {
                ...state,
                cuarteles: action.payload
            }
        case AGREGAR_CUARTEL:
            localStorage.setItem('cuartel', action.payload);
            return {
                ...state,
                cuartel: action.payload
            }

        default:
            return state;
    }
}