import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { crearUsuario, editarUsuario } from '../../services/Usuario';
import { Fn, formatRut } from '../../helpers';

export const Formulario = ({
  show,
  setShow,
  setUsuarios,
  usuarios,
  setUsuario,
  usuario,
  initialForm,
  errors,
  setErrors,
}) => {
  const {
    nombres,
    apellidos,
    rut,
    cargo,
    codigo,
    rol,
    servicio,
    activo,
    imagen,
    _id,
    especialidad
  } = usuario;

  const validarFormulario = (usuario) => {
    let errors = {};

    if (!usuario.nombres.trim()) {
      errors.nombres = 'El campo Nombres es requerido';
    }
    if (!usuario.apellidos.trim()) {
      errors.apellidos = 'El campo Apellidos es requerido';
    }
    if (!usuario.rut.trim()) {
      errors.rut = 'El campo Rut es requerido';
    }
    if (!usuario.cargo.trim()) {
      errors.cargo = 'El campo Cargo es requerido';
    }
    if (!usuario.codigo.trim()) {
      errors.codigo = 'El campo Codigo es requerido';
    }
    if (!usuario.imagen.trim()) {
      errors.nombimagenes = 'El campo Imagen es requerido';
    }
    return errors;
  };

  const handleBlur = (e) => {
    // handleChange(e);
    setErrors(validarFormulario(usuario));
  };

  const handleChange = ({ target: { name, value, type, checked } }) => {
    if (type === 'checkbox') {
      if (checked === true) {
        setUsuario({
          ...usuario,
          rol: 'Administrador',
        });
      } else {
        setUsuario({
          ...usuario,
          rol: '',
        });
      }
    } else {
      setUsuario({
        ...usuario,
        [name]: value,
      });
    }
  };

  const handleChangeSwitch = ({ target: { name, value, type, checked } }) => {
    if (servicio) {
      NotificationManager.warning(
        'No se puede dar de baja a un Usuario en servicio',
        'Advertencia!',
        2500
      );
      return;
    }
    setUsuario({ ...usuario, activo: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ValdiarsH!
    if (
      [
        nombres.trim(),
        apellidos.trim(),
        rut.trim(),
        cargo.trim(),
        codigo.trim(),
        imagen.trim(),
      ].includes('')
    ) {
      NotificationManager.warning(
        'Debe completar todos los campos del formulario',
        'Advertencia!',
        2500
      );
      return;
    }
    if (!Fn.validaRut(rut.replace(/\./g, '')) || rut.length < 2) {
      NotificationManager.warning(
        'El Rut ingresado no es válido',
        'Advertencia!',
        2500
      );
      return;
    }
    const respuesta = await crearUsuario(usuario);
    setUsuarios([...usuarios, respuesta]);
    NotificationManager.success(
      'Usuario registrado correctamente',
      'Registro Exitoso!',
      2500
    );
    setUsuario(initialForm);
    setShow(false);
  };

  const handleEdit = async () => {
    if (
      [
        nombres.trim(),
        apellidos.trim(),
        rut.trim(),
        cargo.trim(),
        codigo.trim(),
        imagen.trim(),
      ].includes('')
    ) {
      NotificationManager.warning(
        'Debe completar todos los campos del formulario',
        'Advertencia!',
        2500
      );
      return;
    }
    const respuesta = await editarUsuario(usuario);
    if (respuesta.ok === true) {
      NotificationManager.success(`${respuesta.msg}`, 'Éxito!', 2500);
    }
    const listaUsuarios = usuarios.map((bombero) =>
      bombero._id === usuario._id ? usuario : bombero
    );
    setUsuarios(listaUsuarios);
    setUsuario(initialForm);
    setShow(false);
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = '';
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFileInputChange = (e) => {
    let file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file['base64'] = result;
        setUsuario({ ...usuario, imagen: result });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <NotificationContainer />
      <Modal
        show={show}
        onHide={() => {
          setShow(!show);
          setUsuario(initialForm);
        }}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {_id ? 'Editar Usuario' : 'Registrar Usuario'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col sm={12} md={6} xl={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="nombres">Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese Nombre"
                    value={nombres}
                    name="nombres"
                    id="nombres"
                    onChange={handleChange}
                    onBlur={(e) => handleBlur(e)}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6} xl={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="apellidos">Apellidos</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese Apellidos"
                    value={apellidos}
                    name="apellidos"
                    id="apellidos"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6} xl={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="rut">Rut</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese  Rut"
                    value={_id ? formatRut(rut) : rut}
                    onBlur={
                      rut.length > 2
                        ? (e) =>
                          setUsuario({
                            ...usuario,
                            rut: formatRut(e.target.value),
                          })
                        : undefined
                    }
                    name="rut"
                    id="rut"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6} xl={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Cargo</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="cargo"
                    value={cargo}
                    onChange={handleChange}
                  >
                    <option>-- Seleccione Cargo- -</option>
                    <option value="COMANDANTE">COMANDANTE</option>
                    <option value="SEGUNDO COMANDANTE">SEGUNDO COMANDANTE</option>
                    <option value="VICESUPERINTENDENTE">
                      VICESUPERINTENDENTE - VICESUPERINTENDENTA
                    </option>
                    <option value="TESORERA GENERAL">TESORERA GENERAL - TESORERO GENERAL</option>
                    <option value="SECRETARIO GENERAL">SECRETARIO GENERAL - SECRETARIA GENERAL</option>
                    <option value="SEGUNDO INTENDETE">SSEGUNDO INTENDETE - SEGUNDA INTENDETE</option>
                    <option value="CAPITAN">CAPITAN - CAPITANA</option>
                    <option value="DIRECTOR">DIRECTOR - DIRECTORA</option>
                    <option value="TENIENTE PRIMERO">TENIENTE PRIMERO</option>
                    <option value="TENIENTE SEGUNDO">TENIENTE SEGUNDO</option>
                    <option value="AYUDANTE DE CIA">AYUDANTE DE CIA</option>
                    <option value="SECRETARIA ">SECRETARIA - SECRETARIO </option>
                    <option value="TESORERO">TESORERO - TESORERA</option>
                    <option value="VOLUNTARIO">BOMBERO - BOMBERA</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6} xl={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Especialidad</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="especialidad"
                    value={especialidad}
                    onChange={handleChange}
                  >
                    <option>-- Seleccione Especialidad- -</option>
                    <option value="RESCATE">RESCATE</option>
                    <option value="MAQUINISTA">
                      MAQUINISTA
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={12} md={6} xl={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="rol">Rol</Form.Label>
                  <Form.Check
                    type="checkbox"
                    label="Administrador"
                    value={rol}
                    checked={rol === '' || rol === 'Bombero' ? false : true}
                    name="rol"
                    id="rol"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm={12} md={6} xl={6}>
                {imagen && (
                  <img
                    src={imagen}
                    width={200}
                    height={200}
                    className="mb-2"
                    alt="Imagen Bombero"
                  ></img>
                )}
                <Form.Group className="mb-3">
                  <div className="mb-3">
                    {!imagen && (
                      <Form.Label htmlFor="formFile" className="form-label">
                        Seleccione Imagen
                      </Form.Label>
                    )}
                    <Form.Control
                      className="form-control"
                      type="file"
                      id="formFile"
                      name="imagen"
                      accept="image/x-png,image/gif,image/jpeg"
                      onChange={handleFileInputChange}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        {_id ? (
          <Modal.Footer style={{ display: 'inline' }}>
            <Row>
              <Col xs={6} sm={6} md={9} xl={10} xxl={10}>
                <Form.Label>Activar/Desactivar</Form.Label>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={activo ? 'Desactivar' : 'Activar'}
                  checked={activo}
                  value={activo}
                  onChange={handleChangeSwitch}
                />
              </Col>
              <Col xs={6} sm={6} md={3} xl={2} xxl={2}>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShow(!show);
                    setUsuario(initialForm);
                  }}
                >
                  Cerrar
                </Button>
                {'  '}
                <Button variant="success" onClick={(e) => handleEdit(e)}>
                  Editar
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        ) : (
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShow(!show);
                setUsuario(initialForm);
              }}
            >
              Cerrar
            </Button>
            {'  '}
            <Button variant="success" onClick={(e) => handleSubmit(e)}>
              Guardar
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};
