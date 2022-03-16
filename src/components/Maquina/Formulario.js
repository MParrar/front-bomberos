import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications';
import { crearMaquina, editarMaquina } from '../../services/Maquina';

const estados = [
  { value: true, label: 'En servicio' },
  { value: false, label: 'Fuera de servicio' },
];

const Formulario = ({
  maquina,
  show,
  initialForm,
  maquinas,
  setMaquina,
  setShow,
  setMaquinas,
  cuarteles
}) => {
  const { _id, nombre, estado, cuartel } = maquina;

  const handleChange = ({ target: { name, value, type } }) => {
    if (type === 'number') value = Number(value);
    if (type === 'select-one') value = value === 'true' ? true : false;
    if (type)
      setMaquina({
        ...maquina,
        [name]: value,
      });
  };

  const handleChangeCuartel = ({ target: { name, value, type } }) => {
    setMaquina({
      ...maquina,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre.trim(),
      estado].includes(''),
      cuartel?._id.trim()
    ) {
      NotificationManager.warning(
        'Debe completar todos los campos del formulario',
        'Advertencia!',
        2500
      );
      return;
    }
    const respuesta = await crearMaquina(maquina);
    setMaquinas([...maquinas, respuesta]);
    NotificationManager.success(
      'Máquina registrada correctamente',
      'Exito!',
      2500
    );
    setMaquina(initialForm);
    setShow(false);
  };

  const handleEdit = async () => {
    if ([nombre.trim(),
      estado].includes(''),
      cuartel?._id.trim()
    ) {
      NotificationManager.warning(
        'Debe completar todos los campos del formulario',
        'Advertencia!',
        2500
      );
      return;
    }
    const respuesta = await editarMaquina(maquina);
    if (respuesta.ok === true) {
      NotificationManager.success(`${respuesta.msg}`, 'Éxito!', 2500);
    }
    const listaMaquinas = maquinas.map((mm) =>
      mm._id === maquina._id ? maquina : mm
    );
    setMaquinas(listaMaquinas);
    setMaquina(initialForm);
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(!show);
        setMaquina(initialForm);
      }}
      size="md"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {_id ? 'Editar Usuario' : 'Registrar Usuario'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col sm={12} md={12} xl={12}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="nombres">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese Nombre"
                  value={nombre}
                  name="nombre"
                  id="nombre"
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12} xl={12}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="apellidos">Estado</Form.Label>
                <Form.Control
                  as="select"
                  placeholder="Seleccione estado"
                  value={estado}
                  name="estado"
                  id="estado"
                  onChange={handleChange}
                >
                  <option value="">-- Seleccione estado --</option>
                  {estados?.map((estado, idx) => (
                    <option key={idx} value={estado.value}>
                      {estado.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={12} xl={12}>
              <Form.Group className="mb-3">
                <Form.Label>Cuartel</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="cuartel"
                  value={cuartel?._id}
                  onChange={handleChangeCuartel}
                  required
                >
                  <option>-- Seleccione Cuarteles- -</option>
                  {cuarteles?.map(cuartel => (
                    <option key={cuartel._id} value={cuartel._id}>{cuartel.nombre}</option>

                  ))}

                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShow(!show);
            setMaquina(initialForm);
          }}
        >
          Cerrar
        </Button>
        {'  '}
        {_id ? (
          <Button variant="success" onClick={(e) => handleEdit(e)}>
            Editar
          </Button>
        ) : (
          <Button variant="success" onClick={(e) => handleSubmit(e)}>
            Guardar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Formulario;
