import React, { useEffect } from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'

export const SwitchBombero = ({ bombero, setBombero, setBomberos, bomberos, setBusqueda, setBrowser }) => {

    useEffect(() => {
        const listaBomberos = bomberos.map(bomberoLista => bomberoLista.rut === rut ? bombero : bomberoLista);
        setBomberos(listaBomberos);

    }, [bombero]);

    const { nombres, apellidos, cargo, codigo, servicio, rut } = bombero;
    const handleChange = ({ target: { value } }) => {
        value = value === 'on' && !servicio
        setBombero({ ...bombero, servicio: value })
        setTimeout(() => {
            setBusqueda(false)
            setBrowser('')

        }, 1000);
    }

    return (
        <Container>
            <Row style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Col xs={12} sm={12} md={4} xl={4} xxl={4}>
                    <Card className='mr-2 mt-4' style={{ margin: '0 auto' }}>
                        <Card.Header>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label={`${servicio ? 'Desactivar' : 'Activar'}`}
                                checked={servicio}
                                onChange={handleChange}
                                style={{ float: 'right' }}
                            />
                        </Card.Header>
                        <Card.Img variant="top" src="https://ten-golf.com/wp-content/uploads/2018/04/parzialebombero.jpg" />
                        <Card.Body>
                            <Card.Title className='text-center'>{`${nombres} ${apellidos}`}</Card.Title>
                            <Card.Text className='text-center'>
                                {cargo}
                            </Card.Text>
                            <Card.Text className='text-center'>
                                {codigo}
                            </Card.Text>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
