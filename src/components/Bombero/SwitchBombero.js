import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { obtenerMaquinasEnServicio } from '../../services/Maquina';
import fotogenerica from '../../img/fotoperfilgenerico.png';

export const SwitchBombero = ({
  bombero,
  handleChange,
  setBusqueda,
  setBrowser,
  idCuartel,
  setSwitchTab,
}) => {
  const [loading, setLoading] = useState(false);
  const {
    nombres,
    apellidos,
    cargo,
    servicio,
    imagen,
    cuartel,
    maquinasAManejar,
    especialidad,
  } = bombero;
  const [maquinas, setMaquinas] = useState([]);

  useEffect(() => {
    setSwitchTab(true);
    const listarInfo = async () => {
      const respuesta = await obtenerMaquinasEnServicio();
      setMaquinas(respuesta);
    };
    listarInfo();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    setLoading(true);
    setBusqueda(false);
    setBrowser('');
    setLoading(false);
    setSwitchTab(false);
    navigate('/inicio');
  };

  return loading ? (
    <Spinner />
  ) : (
    <Container>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Col xs={12} sm={12} md={4} xl={4} xxl={4}>
          <Card
            className="mr-2 mt-4"
            style={{
              margin: '0 auto',
              border:
                cuartel?.nombre.toUpperCase() === 'PRIMERA'
                  ? '3px solid blue'
                  : cuartel?.nombre.toUpperCase() === 'SEGUNDA'
                    ? '3px solid orange'
                    : '3px solid green',
              width: '25rem',
            }}
          >
            <Card.Header style={{ fontSize: '1.2rem' }}>
              <Form.Check
                type="switch"
                id="custom-switch"
                label={`${servicio ? 'Fuera de Servicio' : 'En servicio'}`}
                checked={servicio}
                onChange={(e) => handleChange(e, idCuartel)}
                style={{ float: 'right' }}
              />
            </Card.Header>
            <Card.Img
              variant="top"
              src={imagen ? imagen : fotogenerica}
              height={200}
            />
            <Card.Body className="cuerpo-card">
              <p className="text-center nombre">{`${nombres} ${apellidos}`}</p>
              <p className="text-center cargo">{cargo}</p>
              <>
                {especialidad === 'MAQUINISTA' &&
                  maquinas.map((maquinaCheck) => (
                    <Form.Check
                      key={maquinaCheck?._id}
                      type={'switch'}
                      id={`default-${maquinaCheck._id}`}
                      label={maquinaCheck.nombre}
                      onChange={(e) => handleChange(e, null, maquinaCheck)}
                      checked={
                        maquinasAManejar?.find(
                          (maquina) => maquina?._id === maquinaCheck._id
                        )
                          ? true
                          : false
                      }
                    />
                  ))}
              </>
            </Card.Body>
            <Card.Body
              onClick={handleClick}
              className="footer-card"
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              <FontAwesomeIcon icon={faArrowLeftLong} size="3x" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
