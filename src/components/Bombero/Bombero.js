import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import AuthContext from '../../context/autenticacion/authContext';

export const Bombero = ({ bombero, setBusqueda, setBombero }) => {
  const { nombres, apellidos, cargo, codigo, imagen } = bombero;

  const authContext = useContext(AuthContext);
  const { usuario } = authContext;
  const handleClick = () => {
    setBusqueda(true);
    setBombero(bombero);
  };
  return (
    <Card className="mr-4 mt-4 imgHover">
      <Card.Img
        onClick={() =>
          usuario?.usuario?.rol !== 'Bombero' ? handleClick() : null
        }
        style={{
          cursor: 'pointer',
        }}
        width={270}
        height={230}
        variant="top"
        src={imagen}
      />
      <Card.Body className="cuerpo-card">
        <p className="text-center nombre">{`${nombres} ${apellidos}`}</p>
        <p className="text-center cargo">{cargo}</p>
        <p className="text-center codigo">{codigo}</p>
      </Card.Body>
    </Card>
  );
};
