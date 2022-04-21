import React, { useContext, useEffect, useState } from 'react'
import { ListaBomberos } from '../components/Bombero/ListaBomberos'
import { ModalCuartel } from '../components/ModalCuartel/Modal';
import AuthContext from '../context/autenticacion/authContext'
import CuartelContext from '../context/cuarteles/cuartelContext';


export const Inicio = () => {

    const authContext = useContext(AuthContext);
    const { usuarioAutenticado, usuario, cuartel } = authContext;
    const cuartelContext = useContext(CuartelContext);

    const [show, setShow] = useState(false);

    useEffect(() => {
        usuarioAutenticado();
    }, [cuartel]);

    const cambiar = () => {
        setShow(true)
    }

    return (
        <>
            {usuario?.usuario?.rol === 'Cuartel' && !cuartel ? <ModalCuartel
                show={usuario?.usuario?.rol === 'Cuartel' && !cuartel ? true : false}
                cambiar={cambiar}
            /> :
                <ListaBomberos />}

        </>
    )
}
