import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Inicio } from '../Pages/Inicio';
import { Layout } from './Layout';
import { Usuario } from '../Pages/Usuario';

const RutasAdmin = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="usuario" element={<Usuario />} />
      </Route>
    </Routes>
  );
};

export default RutasAdmin;
