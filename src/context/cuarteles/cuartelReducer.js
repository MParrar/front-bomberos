import { OBTENER_CUARTELES } from "../../types";


export const CuartelReducer = (state, action) => {
    switch (action.type) {
        case OBTENER_CUARTELES:
            return {
                ...state,
                cuarteles: action.payload
            }

        default:
            return state;
    }
}