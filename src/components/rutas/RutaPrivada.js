import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

const RutaPrivada = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { autenticado, usuarioAutenticado, cargando } = authContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return !autenticado && !cargando ? <Navigate to="/" /> : children;
};

<<<<<<< HEAD
export default RutaPrivada;
=======

    return (!autenticado && !cargando) ? <Navigate to="/" /> : children

}

export default RutaPrivada;
>>>>>>> mati
