import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { cambiarPassword } from '../../services/Usuario';

const initialForm = {
  password: '',
  confirmPassword: '',
};

export const CambiarPassword = ({
  showCambiarPassword,
  setShowCambiarPassword,
  setUsuarios,
  usuarios,
  setUsuario,
  usuario,
}) => {
  const [form, setForm] = useState(initialForm);
  const { nombres, apellidos } = usuario;
  const { password, confirmPassword } = form;

  const handleChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ValdiarsH!
    if ([password.trim(), confirmPassword.trim()].includes('')) {
      NotificationManager.warning(
        'Debe completar todos los campos del formulario',
        'Advertencia!',
        2500
      );
      return;
    }

    if (password !== confirmPassword) {
      NotificationManager.warning(
        'Las contraseñas no coinciden',
        'Advertencia!',
        2500
      );
      return;
    }

    const respuesta = await cambiarPassword(usuario._id, form);
    if (respuesta.ok === true) {
      NotificationManager.success(
        'Contraseña cambiada exitosamente',
        'Éxito!',
        2500
      );
    }

    const listaUsuarios = usuarios.map((bombero) =>
      bombero._id === usuario._id ? usuario : bombero
    );

    setUsuarios(listaUsuarios);
    setForm(initialForm);
    setShowCambiarPassword(false);
  };

  return (
    <>
      <NotificationContainer />
      <Modal
        show={showCambiarPassword}
        onHide={() => {
          setShowCambiarPassword(!showCambiarPassword);
          setUsuario(initialForm);
        }}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Cambiar Clave de usuario: {nombres} {apellidos}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col sm={12} md={6} xl={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese Contraseña"
                    value={password}
                    name="password"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sm={12} md={6} xl={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Repetir Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirme Contraseña"
                    value={confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowCambiarPassword(!showCambiarPassword);
              setForm(initialForm);
            }}
          >
            Cerrar
          </Button>
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
