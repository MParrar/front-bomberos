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
        width={190}
        height={120}
        variant="top"
        src={imagen}
      />
      <Card.Body className="cuerpo-card">
        <h6 className="text-center nombre">{`${nombres} ${apellidos}`}</h6>
        <h6 className="text-center cargo">{`${cargo[0]}${cargo.slice(1, cargo.length).toLowerCase()}`}</h6>
        <h6 className="text-center codigo">{codigo}</h6>
      </Card.Body>
    </Card>
  );
};
