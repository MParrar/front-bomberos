import React, { useEffect, useState } from 'react';
import { Col, FormControl, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import clienteAxios from '../../config/axios';
import { Bombero } from './Bombero';
import { SwitchBombero } from './SwitchBombero';



export const ListaBomberos = () => {
    const [bomberos, setBomberos] = useState([]);
    const [busqueda, setBusqueda] = useState(false);
    const [bombero, setBombero] = useState({});
    const [browser, setBrowser] = useState('');

    const getBomberos = async () => {
        // el filtro debe trar por servicio =  true

        const { data } = await clienteAxios.get('/usuarios');
        setBomberos(data)
    }
    useEffect(() => {
        getBomberos()
    }, []);

    const handleBusqueda = ({ target: { value, name } }) => {
        setBrowser(value)
        let bomberoEncontrado = bomberos.filter(bombero => bombero.rut === value);
        if (!value) {
            setBusqueda(false);
            setBrowser('')
        }
        if (bomberoEncontrado[0]) {
            setBusqueda(true);
            setBrowser(bomberoEncontrado[0].rut)
            setBombero(bomberoEncontrado[0]);
            setBrowser(value)
        }
    }
    return (
        <Container >
            <Row style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Col xs={12} sm={12} md={4} xl={4} xxl={4}>

                    <FormControl
                        type="search"
                        placeholder="Buscar por Rut o Nombre"
                        id="browser"
                        list="browsers"
                        aria-label="Search"
                        style={{ margin: '0 auto' }}
                        name='browser'
                        onChange={handleBusqueda}
                        value={browser}

                    />
                    <datalist id="browsers">
                        {
                            bomberos.map(bombero => (
                                <option value={bombero.rut} label={bombero.nombres} />
                            ))
                        }
                    </datalist>

                </Col>
            </Row>




            {
                busqueda
                    ?
                    (
                        <SwitchBombero
                            bombero={bombero}
                            setBusqueda={setBusqueda}
                            setBombero={setBombero}
                            setBomberos={setBomberos}
                            bomberos={bomberos}
                            setBusqueda={setBusqueda}
                            setBrowser={setBrowser}
                        />
                    )
                    :
                    <>
                        <div className="content">
                            <div className="cuerpo">
                                <div className="cards mr-2">
                                    {(
                                        bomberos?.map(bombero => {
                                            if (bombero.servicio && bombero.activo) {
                                                return (
                                                    <Bombero
                                                        key={bombero.id}
                                                        bombero={bombero}
                                                        setBusqueda={setBusqueda}
                                                        setBombero={setBombero}

                                                    />
                                                )
                                            } else {
                                            }
                                        })
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
            }

        </Container>
    )
}
