import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import { Layout } from './components/Layout';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Usuario } from './Pages/Usuario';
import { Inicio } from './Pages/Inicio';
import { Login } from './Pages/Login';
import AuthState from './context/autenticacion/authState';
import { tokenAuth } from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada';
import Estadisticas from './Pages/Estadisticas';

const token = localStorage.getItem('token');

if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <AuthState>
      <HashRouter>
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
        </Routes>
      </HashRouter>
    </AuthState>
  );
}

export default App;
