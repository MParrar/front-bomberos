import React, { useContext, useEffect } from 'react'
import { ListaBomberos } from '../components/Bombero/ListaBomberos'
import AuthContext from '../context/autenticacion/authContext'

export const Inicio = () => {

    const authContext = useContext(AuthContext);
    const { usuarioAutenticado, autenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    return (
        <>
            <ListaBomberos />
        </>
    )
}
