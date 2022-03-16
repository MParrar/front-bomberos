import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { CambiarPassword } from '../components/Usuario/CambiarPassword';
import { Formulario } from '../components/Usuario/Formulario';
import { Tabla } from '../components/Usuario/Tabla';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { eliminarUsuarioService, obtenerUsuarios } from '../services/Usuario';
import Confirmacion from '../components/Confirmacion';
import { Spinner } from '../components/Spinner';
import CuartelContext from '../context/cuarteles/cuartelContext';

const initialForm = {
  nombres: '',
  apellidos: '',
  rut: '',
  cargo: '',
  password: '',
  rol: '',
  confirmPassword: '',
  imagen: '',
  cuartel: '',
  especialidad: ''
};

export const Usuario = () => {
  const [show, setShow] = useState(false);
  const [showCambiarPassword, setShowCambiarPassword] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showConfirm, setshowConfirm] = useState(false);
  const [idConfirm, setIdConfirm] = useState(null);
  const [loading, setLoading] = useState(false);

  const cuartelContext = useContext(CuartelContext);
  const { cuarteles, obtenerCuarteles } = cuartelContext;

  useEffect(() => {
    setLoading(true);
    const listarUsuarios = async () => {
      obtenerCuarteles()
      const respuesta = await obtenerUsuarios();
      setUsuarios(respuesta);
      setLoading(false);
    };
    listarUsuarios();
  }, []);

  const eliminarUsuario = (id) => {
    setshowConfirm(true);
    setIdConfirm(id);
  };

  const handleConfirm = async () => {
    setshowConfirm(false);
    const respuesta = await eliminarUsuarioService(idConfirm);
    if (respuesta.ok === true) {
      setUsuarios(usuarios.filter((usuario) => usuario._id !== idConfirm));
      NotificationManager.success(
        'Usuario eliminado correctamente',
        'Excelente!',
        2000
      );
    }
  };

  const handleClose = () => {
    setshowConfirm(!showConfirm);
    setIdConfirm(null);
  };

  return (
    loading ?
      <Spinner />
      :
      <>
        <h1 className="mt-3 text-center ">Lista de Usuarios</h1>
        <div className="container">
          <NotificationContainer />
          <hr />
          <Button className="mb-4" onClick={() => setShow(!show)}>
            Agregar Usuario <FontAwesomeIcon className="ml-2" icon={faUserPlus} />
          </Button>
          <Confirmacion
            title={'Eliminando Usuario'}
            mensaje={'¿Está seguro que desea eliminar éste usuario?'}
            showConfirm={showConfirm}
            handleClose={handleClose}
            handleConfirm={handleConfirm}
          />
          <Formulario
            cuarteles={cuarteles}
            setShow={setShow}
            show={show}
            setUsuarios={setUsuarios}
            usuarios={usuarios}
            setUsuario={setUsuario}
            usuario={usuario}
            initialForm={initialForm}
            setErrors={setErrors}
            errors={errors}
          />
          <Tabla
            usuarios={usuarios}
            setUsuario={setUsuario}
            setShow={setShow}
            showCambiarPassword={showCambiarPassword}
            setShowCambiarPassword={setShowCambiarPassword}
            eliminarUsuario={eliminarUsuario}
          />
          <CambiarPassword
            showCambiarPassword={showCambiarPassword}
            setShowCambiarPassword={setShowCambiarPassword}
            usuario={usuario}
            usuarios={usuarios}
            setUsuarios={setUsuarios}
            setUsuario={setUsuario}
            initialForm={initialForm}
          />
        </div>
      </>
  );
};
