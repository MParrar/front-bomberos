import React, { useEffect, useState } from 'react';
import { Col, FormControl, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import clienteAxios from '../../config/axios';
import { Bombero } from './Bombero';

const Padre = styled.div`
    display: flex;
  justify-content: center;
  align-items: center;
  background-color: blue;
`

const Buscador = styled.div`
    background-color: red;
    margin-top: 3rem;
    margin: 0 auto;
    position: relative;
`;

export const ListaBomberos = () => {
    const [bomberos, setBomberos] = useState([]);

    const getBomberos = async () => {
        // el filtro debe trar por servicio =  true

        const { data } = await clienteAxios.get('/usuarios');
        setBomberos(data)
    }
    useEffect(() => {
        getBomberos()
    }, []);

    return (
        <Container>
            <>

                <Row style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Col xs={12} sm={12} md={4} xl={4} xxl={4}>

                        <FormControl
                            type="search"
                            placeholder="Buscar por Rut o Nombre"
                            className="me-2"
                            id="browser"
                            list="browsers"
                            aria-label="Search"
                            style={{ margin: '0 auto' }}
                        />
                        <datalist id="browsers">
                            {
                                bomberos.map(bombero => (
                                    <option value={bombero.nombres} label={bombero.rut} />
                                ))
                            }
                        </datalist>

                    </Col>
                </Row>
            </>


            <div className="content">
                <div className="cuerpo">
                    <div className="cards mr-2">
                        {
                            bomberos?.map(bombero => {
                                if (bombero.servicio && bombero.activo) {
                                    return (
                                        <Bombero
                                            key={bombero.id}
                                            bombero={bombero}
                                        />
                                    )
                                } else {
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </Container>
    )
}
