import React, { useContext, useEffect } from 'react';
import { InicioSesion } from '../auth/InicioSesion';
import AuthContext from '../context/autenticacion/authContext';
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const authContext = useContext(AuthContext);
  const { token } = authContext;

  return token ? <Navigate to="/inicio" /> : <InicioSesion />;
};
