import React, { useState, useContext } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import AuthContext from '../../context/autenticacion/authContext'
import CuartelContext from '../../context/cuarteles/cuartelContext'


export const ModalCuartel = ({ show, cambiar }) => {
    const authContext = useContext(AuthContext);
    const { agregarCuartel } = authContext;

    const cuartelContext = useContext(CuartelContext);
    const { cuarteles } = cuartelContext;

    const [cuartel, setCuartel] = useState('');
    const handleChange = ({ target: { value } }) => {
        setCuartel(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        agregarCuartel(cuartel)
        cambiar()
    }
    return (
        <Modal show={show} centered>
            <Modal.Header closeButton>
                <Modal.Title>Elija Cuartel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        as="select"
                        onChange={handleChange}
                    >
                        <option value=''>-- Seleccione Cuartel- -</option>
                        {cuarteles.length > 0 && cuarteles.map((item) => (
                            <option key={item._id} value={item._id}>{item.nombre}</option>

                        ))

                        }

                    </Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="success"
                    type="submit"
                    disabled={!cuartel}
                    onClick={(e) => handleSubmit(e)}
                >
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
