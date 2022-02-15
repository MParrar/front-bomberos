import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import clienteAxios from '../../config/axios';

export const CambiarPassword = ({ showCambiarPassword, setShowCambiarPassword, setUsuarios, usuarios, setUsuario, usuario, initialForm }) => {

    const { nombres, apellidos, password, confirmPassword } = usuario;

    const handleChange = ({ target: { name, value, } }) => {
        setUsuario({
            ...usuario,
            [name]: value,
        });

    };


    const handleSubmit = async e => {
        e.preventDefault();
        // ValdiarsH!

        const respuesta = (await clienteAxios.post('/usuarios', usuario)).data;
        setUsuarios([...usuarios, respuesta]);
        setUsuario(initialForm);
        setShowCambiarPassword(false);
    }
    return (
        <Modal show={showCambiarPassword}
            onHide={() => {
                setShowCambiarPassword(!showCambiarPassword)
                setUsuario(initialForm)
            }}
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title>Cambiar Clave de usuario: {nombres} {apellidos}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col sm={12} md={6} xl={6}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Ingrese Contraseña"
                                    value={password || ''}
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
                                    value={confirmPassword || ''}
                                    name='confirmPassword'
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    setShowCambiarPassword(!showCambiarPassword)
                    setUsuario(initialForm)
                }}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={(e) => handleSubmit(e)}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
