import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import NotificationContainer from 'react-notifications/lib/NotificationContainer';
import Confirmacion from '../components/Confirmacion';
import Formulario from '../components/Maquina/Formulario';
import Tabla from '../components/Maquina/Tabla';
import { eliminarMaquinaService, obtenerMaquinas } from '../services/Maquina';
import CuartelContext from '../context/cuarteles/cuartelContext';

const initialForm = {
  nombre: '',
  estado: '',
};

const Maquina = () => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [idConfirm, setIdConfirm] = useState(null);
  const [maquinas, setMaquinas] = useState([]);
  const [maquina, setMaquina] = useState(initialForm);

  const cuartelContext = useContext(CuartelContext);
  const { cuarteles, obtenerCuarteles } = cuartelContext;

  useEffect(() => {
    const listarInfo = async () => {
      obtenerCuarteles();
      const respuesta = await obtenerMaquinas();
      setMaquinas(respuesta);
    };
    listarInfo();
  }, []);

  const eliminarMaquina = (id) => {
    setShowConfirm(true);
    setIdConfirm(id);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    const respuesta = await eliminarMaquinaService(idConfirm);
    if (respuesta.ok === true) {
      setMaquinas(maquinas.filter((maquina) => maquina._id !== idConfirm));
      NotificationManager.success(
        'Máquina eliminada correctamente',
        'Excelente!',
        2000
      );
    }
  };

  const handleClose = () => {
    setShowConfirm(!showConfirm);
    setIdConfirm(null);
  };

  return (
    <>
      <h1 className="mt-3 text-center ">Lista de Máquinas</h1>
      <div className="container">
        <NotificationContainer />
        <hr />
        <Button className="mb-4" onClick={() => setShow(!show)}>
          Agregar Máquina <FontAwesomeIcon className="ml-2" icon={faTruck} />
        </Button>
        <NotificationContainer />
        <Tabla
          cuarteles={cuarteles}
          maquinas={maquinas}
          setMaquina={setMaquina}
          setShow={setShow}
          eliminarMaquina={eliminarMaquina}
        />
        <Formulario
          cuarteles={cuarteles}
          setShow={setShow}
          show={show}
          setMaquinas={setMaquinas}
          maquinas={maquinas}
          maquina={maquina}
          initialForm={initialForm}
          setMaquina={setMaquina}
        />
        <Confirmacion
          title={'Eliminando Máquina'}
          mensaje={'¿Está seguro que desea eliminar ésta maquinaW?'}
          showConfirm={showConfirm}
          handleClose={handleClose}
          handleConfirm={handleConfirm}
        />
      </div>
    </>
  );
};

export default Maquina;
