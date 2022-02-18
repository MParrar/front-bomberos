import { useEffect, useState } from 'react';
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
import {
  eliminarUsuarioService,
  obtenerUsuariosService,
} from '../services/Usuario';
import Confirmacion from '../components/Confirmacion';

const initialForm = {
  nombres: '',
  apellidos: '',
  rut: '',
  cargo: '',
  codigo: '',
  password: '',
  rol: '',
  confirmPassword: '',
  imagen: '',
};

export const Usuario = () => {
  const [show, setShow] = useState(false);
  const [showCambiarPassword, setShowCambiarPassword] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showConfirm, setshowConfirm] = useState(false);
  const [idConfirm, setIdConfirm] = useState(null);

  useEffect(() => {
    const listarUsuarios = async () => {
      const respuesta = await obtenerUsuariosService();
      setUsuarios(respuesta);
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
    <>
      <h1 className="mt-3 text-center">USUARIOS</h1>
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
