import React, { useEffect, useState, useContext } from 'react';
import { Col, FormControl, Row, Tabs } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {
  bomberoServicio,
  conducirMaquina,
  obtenerBomberosActivos,
} from '../../services/Usuario';
import { Bombero } from './Bombero';
import { SwitchBombero } from './SwitchBombero';
import { Spinner } from '../Spinner';
import AuthContext from '../../context/autenticacion/authContext';
import { Footer } from '../Footer';
import logo from '../../img/logo.png';
import { Tab } from 'bootstrap';
import CuartelContext from '../../context/cuarteles/cuartelContext';
import { Cuartel } from './Cuartel';

export const ListaBomberos = () => {
  const [bomberos, setBomberos] = useState([]);
  const [busqueda, setBusqueda] = useState(false);
  const [bombero, setBombero] = useState({});
  const [browser, setBrowser] = useState('');
  const [loading, setLoading] = useState(false);

  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

  const cuartelContext = useContext(CuartelContext);
  const { obtenerCuarteles, cuarteles } = cuartelContext;

  let { maquinasAManejar } = bombero;

  const getBomberos = async () => {
    setLoading(true);
    obtenerCuarteles();
    const respuestaActivos = await obtenerBomberosActivos();
    setBomberos(respuestaActivos);
    setLoading(false);
  };

  useEffect(() => {
    getBomberos();
  }, []);

  useEffect(() => {
    const listaBomberos = bomberos.map((bomberoLista) =>
      bomberoLista.rut === bombero.rut ? bombero : bomberoLista
    );
    setBomberos(listaBomberos);
    // eslint-disable-next-line
  }, [bombero]);

  const handleBusqueda = ({ target: { value, name } }) => {
    setBrowser(value);

    let bomberoEncontrado = bomberos.filter((bombero) => bombero.rut === value);

    if (!value) {
      setBusqueda(false);
      setBrowser('');
    }

    if (bomberoEncontrado[0]) {
      setBusqueda(true);
      setBrowser(bomberoEncontrado[0].rut);
      setBombero(bomberoEncontrado[0]);
      setBrowser(value);
    }
  };

  const handleChange = async ({ target: { value } }, idCuartel, maquinaCheck) => {
    if (maquinaCheck) {
      setLoading(true)
      conducirMaquina(bombero._id, maquinaCheck._id);
      console.log(maquinasAManejar, maquinaCheck)
      let existe = maquinasAManejar?.find(item => item?._id === maquinaCheck?._id);
      console.log(existe)
      if (existe) {
        console.log('Eliminar:', maquinasAManejar.filter(item => item._id !== maquinaCheck._id))
        maquinasAManejar = (maquinasAManejar.filter(item => item._id !== maquinaCheck._id))
        setBombero({ ...bombero, maquinasAManejar })
        setLoading(false)
        return;
      }
      console.log('Agregar')
      maquinasAManejar = ([...maquinasAManejar, maquinaCheck])
      setBombero({ ...bombero, maquinasAManejar })
      setLoading(false)
      return;
    }
    setLoading(true);
    value = value === 'on' && !bombero.servicio;
    setBombero({ ...bombero, servicio: value });
    const respuesta = await bomberoServicio(bombero._id, { servicio: value }, idCuartel);
    setBusqueda(false);
    setBrowser('');
    setLoading(false);
  };

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Tabs style={{ marginLeft: '8%', fontSize: '1.1rem', color: 'red' }} defaultActiveKey={`${cuarteles.find(item => item._id === usuario?.usuario?.cuartel)?.nombre}`} id="uncontrolled-tab-example" className="mb-3">
        {
          cuarteles.map(tab => (
            <Tab key={tab._id} eventKey={tab.nombre} title={<span style={{ color: 'black' }}>{tab.nombre}</span>}>
              <Cuartel
                setBusqueda={setBusqueda}
                setBrowser={setBrowser}
                bomberos={bomberos}
                setBombero={setBombero}
                usuario={usuario}
                handleBusqueda={handleBusqueda}
                browser={browser}
                busqueda={busqueda}
                handleChange={handleChange}
                bombero={bombero}
                idCuartel={tab._id}
                nombreCuartel={tab.nombre}
              />
            </Tab>
          ))
        }
      </Tabs>




    </>
  );
};
