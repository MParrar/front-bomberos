import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import clienteAxios from '../../config/axios';

export const Formulario = ({ show, setShow, setUsuarios, usuarios, setUsuario, usuario, initialForm }) => {

    const { nombres, apellidos, rut, cargo, codigo, password, rol, confirmPassword, id, activo } = usuario;

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
    }
    const handleSubmit = async e => {
        e.preventDefault();
        // ValdiarsH!

        const respuesta = (await clienteAxios.post('/usuarios', usuario)).data;
        setUsuarios([...usuarios, respuesta]);
        setUsuario(initialForm);
        setShow(false);
    }
    return (
        <Modal show={show}
            onHide={() => {
                setShow(!show)
                setUsuario(initialForm)
            }}
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title>Registrar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col sm={12} md={6} xl={6}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese Nombre"
                                    value={nombres}
                                    name='nombres'
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6} xl={6}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese Apellidos"
                                    value={apellidos}
                                    name='apellidos'
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={6} xl={6}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Rut</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese Rut"
                                    value={rut}
                                    name='rut'
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6} xl={6}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Cargo</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    name='cargo'
                                    value={cargo}
                                    onChange={handleChange}
                                >
                                    <option>-- Seleccione Cargo- -</option>
                                    <option value="COMANDANTE">COMANDANTE</option>
                                    <option value="VICESUPERINTENDENTE">VICESUPERINTENDENTE</option>
                                    <option value="TESORERA GENERAL">TESORERA GENERAL</option>
                                    <option value="CAPITAN">CAPITAN</option>
                                    <option value="DIRECTOR">DIRECTOR</option>
                                    <option value="TENIENTE PRIMERO">TENIENTE PRIMERO</option>
                                    <option value="TENIENTE SEGUNDO">TENIENTE SEGUNDOL</option>
                                    <option value="AYUDANTE DE CIA">AYUDANTE DE CIA</option>
                                    <option value="SECRETARIA ">SECRETARIA </option>
                                    <option value="TESORERO">TESORERO</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    {!id && <Row>
                        <Col sm={12} md={6} xl={6}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Ingrese Contraseña"
                                    value={password}
                                    name='password'
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6} xl={6}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Repetir Contraseña</Form.Label>
                                <Form.Control
                                    type="confirmPassword"
                                    placeholder="Confirme Contraseña"
                                    value={confirmPassword}
                                    name='confirmPassword'
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>}
                    <Row>
                        <Col sm={12} md={6} xl={6}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Codigo</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese Codigo"
                                    value={codigo}
                                    name='codigo'
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6} xl={6}>
                            <Form.Group className="mb-3">
                                <div className="mb-3">
                                    <label htmlFor="formFile" className="form-label">Seleccione Imagen</label>
                                    <input className="form-control" type="file" id="formFile" />
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={6} xl={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Rol</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    label="Administrador"
                                    value={rol}
                                    checked={rol === '' ? false : true}
                                    name='rol'
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6} xl={6}>
                            <Form.Label>Activar/Desactivar</Form.Label>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label={activo ? 'Desactivar' : 'Activar'}
                                // checked={activo}
                                onChange={handleChangeSwitch}
                            />
                        </Col>

                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    setShow(!show)
                    setUsuario(initialForm)
                }}>
                    Cerrar
                </Button>
                <Button variant="success" onClick={(e) => handleSubmit(e)}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
