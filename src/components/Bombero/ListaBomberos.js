import React, { useEffect, useState } from 'react';
import { Col, FormControl, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {
  bomberoServicio,
  obtenerBomberosActivos,
} from '../../services/Usuario';
import { Bombero } from './Bombero';
import { SwitchBombero } from './SwitchBombero';

export const ListaBomberos = () => {
  const [bomberos, setBomberos] = useState([]);
  const [busqueda, setBusqueda] = useState(false);
  const [bombero, setBombero] = useState({});
  const [browser, setBrowser] = useState('');

  const getBomberos = async () => {
    const respuestaActivos = await obtenerBomberosActivos();
    setBomberos(respuestaActivos);
  };

  useEffect(() => {
    getBomberos();
  }, []);

  useEffect(() => {
    const listaBomberos = bomberos.map((bomberoLista) =>
      bomberoLista.rut === bombero.rut ? bombero : bomberoLista
    );
    setBomberos(listaBomberos);
    // eslint-disable-next-line
  }, [bombero]);

  const handleBusqueda = ({ target: { value, name } }) => {
    setBrowser(value);

    let bomberoEncontrado = bomberos.filter((bombero) => bombero.rut === value);

    if (!value) {
      setBusqueda(false);
      setBrowser('');
    }

    if (bomberoEncontrado[0]) {
      setBusqueda(true);
      setBrowser(bomberoEncontrado[0].rut);
      setBombero(bomberoEncontrado[0]);
      setBrowser(value);
    }
  };

  const handleChange = async ({ target: { value } }) => {
    value = value === 'on' && !bombero.servicio;
    setBombero({ ...bombero, servicio: value });
    const respuesta = await bomberoServicio(bombero._id, { servicio: value });
    setBusqueda(false);
    setBrowser('');
  };

  return (
    <Container>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Col xs={12} sm={12} md={4} xl={4} xxl={4}>
          <FormControl
            type="search"
            placeholder="Buscar por Rut o Nombre"
            id="browser"
            list="browsers"
            aria-label="Search"
            style={{ margin: '0 auto' }}
            name="browser"
            onChange={handleBusqueda}
            value={browser}
          />
          <datalist id="browsers">
            {bomberos.map((bombero) => (
              <option
                key={bombero._id}
                value={bombero.rut}
                label={bombero.nombres}
              />
            ))}
          </datalist>
        </Col>
      </Row>

      {busqueda ? (
        <SwitchBombero
          handleChange={handleChange}
          bombero={bombero}
          setBusqueda={setBusqueda}
          setBrowser={setBrowser}
        />
      ) : (
        <div className="content">
          <div className="cuerpo">
            <div className="cards mr-2">
              {bomberos?.map((bombero) => {
                if (bombero.servicio && bombero.activo) {
                  return (
                    <Bombero
                      key={bombero._id}
                      bombero={bombero}
                      setBusqueda={setBusqueda}
                      setBombero={setBombero}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};
