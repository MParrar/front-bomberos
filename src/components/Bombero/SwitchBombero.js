import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';

export const SwitchBombero = ({
  bombero,
  handleChange,
  setBusqueda,
  setBrowser,
}) => {
  const [loading, setLoading] = useState(false);
  const { nombres, apellidos, cargo, codigo, servicio, imagen } = bombero;

  const navigate = useNavigate();

  const handleClick = () => {
    setLoading(true);
    setBusqueda(false);
    setBrowser('');
    navigate('/inicio');
    setLoading(false);
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
          <Card className="mr-2 mt-4" style={{ margin: '0 auto' }}>
            <Card.Header style={{ fontSize: '1.2rem' }}>
              <Form.Check
                type="switch"
                id="custom-switch"
                label={`${servicio ? 'Fuera de Servicio' : 'En servicio'}`}
                checked={servicio}
                onChange={(e) => handleChange(e)}
                style={{ float: 'right' }}
              />
            </Card.Header>
            <Card.Img variant="top" src={imagen} width={230} height={260} />
            <Card.Body className="cuerpo-card">
              <p className="text-center nombre">{`${nombres} ${apellidos}`}</p>
              <p className="text-center cargo">{cargo}</p>
              <p className="text-center codigo">{codigo}</p>
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
