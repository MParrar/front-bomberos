import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from './components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Usuario } from './Pages/Usuario';
import { Inicio } from './Pages/Inicio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Inicio />} />
        </Route>
        <Route path='/usuario' element={<Layout />} >
          <Route index element={<Usuario />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
