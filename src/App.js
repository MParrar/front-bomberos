import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import { Layout } from './components/Layout';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Usuario } from './Pages/Usuario';
import { Inicio } from './Pages/Inicio';
import { Login } from './Pages/Login';
import AuthState from './context/autenticacion/authState';
import { tokenAuth } from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada';
import Estadisticas from './Pages/Estadisticas';
import { Citaciones } from './Pages/Citaciones';
import CuartelState from './context/cuarteles/cuartelState';
import Maquina from './Pages/Maquina';

const token = localStorage.getItem('token');

if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <AuthState>
      <CuartelState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route
              exact
              path="/inicio"
              element={
                <RutaPrivada>
                  <Layout />
                  <Inicio />
                </RutaPrivada>
              }
            />
            <Route
              exact
              path="/usuario"
              element={
                <RutaPrivada>
                  <Layout />
                  <Usuario />
                </RutaPrivada>
              }
            />
            <Route
              exact
              path="/estadisticas"
              element={
                <RutaPrivada>
                  <Layout />
                  <Estadisticas />
                </RutaPrivada>
              }
            />
            <Route
              exact
              path="/citaciones"
              element={
                <RutaPrivada>
                  <Layout />
                  <Citaciones />
                </RutaPrivada>
              }
            />
            <Route
              exact
              path="/maquinas"
              element={
                <RutaPrivada>
                  <Layout />
                  <Maquina />
                </RutaPrivada>
              }
            />
          </Routes>
        </BrowserRouter>
      </CuartelState>
    </AuthState>
  );
}

export default App;
