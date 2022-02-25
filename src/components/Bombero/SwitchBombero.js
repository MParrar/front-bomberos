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

  return (
    loading ?
      <Spinner />
      :
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
              <Card.Header>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={`${servicio ? 'Desactivar' : 'Activar'}`}
                  checked={servicio}
                  onChange={(e) => handleChange(e)}
                  style={{ float: 'right' }}
                />
              </Card.Header>
              <Card.Img variant="top" src={imagen} width={270} height={300} />
              <Card.Body>
                <Card.Title className="text-center">{`${nombres} ${apellidos}`}</Card.Title>
                <Card.Text className="text-center">{cargo}</Card.Text>
                <Card.Text className="text-center">{codigo}</Card.Text>
              </Card.Body>
              <Card.Footer
                onClick={handleClick}
                style={{
                  justifyContent: 'center',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <FontAwesomeIcon icon={faArrowLeftLong} size="3x" />
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
  );
};
