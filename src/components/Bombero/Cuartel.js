import React, { useState } from 'react';
import { Container, Row, Col, FormControl } from 'react-bootstrap';
import { Footer } from '../Footer';
import { Bombero } from './Bombero';
import { SwitchBombero } from './SwitchBombero';

export const Cuartel = ({
  setBombero,
  bomberos,
  setBrowser,
  setBusqueda,
  usuario,
  handleBusqueda,
  browser,
  busqueda,
  handleChange,
  bombero,
  idCuartel,
  nombreCuartel,
  setSwitchTab,
}) => {
  return (
    <>
      <Container style={{ opacity: '100' }}>
        <h2>
          Listado bomberos en servicio <b> {nombreCuartel}</b>
        </h2>
        {usuario?.usuario?.rol !== 'Bombero' && (
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
        )}

        {busqueda ? (
          <SwitchBombero
            handleChange={handleChange}
            bombero={bombero}
            setBusqueda={setBusqueda}
            setBrowser={setBrowser}
            idCuartel={idCuartel}
            setSwitchTab={setSwitchTab}
          />
        ) : bomberos?.filter((item) => item.servicio && item.activo).length >
          0 ? (
          <div className="content">
            <div className="cuerpo">
              <div className="cards mr-4">
                {bomberos?.map((bombero) => {
                  if (
                    bombero.servicio &&
                    bombero.activo &&
                    bombero.cuartelServicio?._id === idCuartel
                  ) {
                    return (
                      <Bombero
                        key={bombero._id}
                        bombero={bombero}
                        setBusqueda={setBusqueda}
                        setBombero={setBombero}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p
              className="text-center mt-4"
              style={{ fontSize: '1.2rem', margin: '0 auto' }}
            >
              No hay Bomberos en el cuartel...
            </p>
          </div>
        )}
      </Container>
      <Footer idCuartel={idCuartel} />
    </>
  );
};
