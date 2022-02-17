import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Usuario } from './Pages/Usuario';
import { Inicio } from './Pages/Inicio';
import { Login } from './Pages/Login';
import AuthState from './context/autenticacion/authState';
import { tokenAuth } from './config/token';
import RutaPrivada from './components/rutas/RutaPrivada';

const token = localStorage.getItem('token');

if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} >
          </Route>
          <Route exact path="/inicio" element={
            <RutaPrivada>
              <Inicio />
            </RutaPrivada>
          } />
          <Route exact path="/usuario" element={
            <RutaPrivada>
              <Usuario />
            </RutaPrivada>
          } />
          {/* <Route path='/inicio' element={<Layout />} >
            <Route index element={<Inicio />} />
          </Route> */}
          {/* <Route path='/usuario' element={<Layout />} >
            <Route index element={<Usuario />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;
