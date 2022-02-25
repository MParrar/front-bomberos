import React from 'react';
import { Button, Card } from 'react-bootstrap';

export const Bombero = ({ bombero, setBusqueda, setBombero }) => {
  const { nombres, apellidos, cargo, codigo, imagen } = bombero;

  return (
    <Card className="mr-4 mt-4" >
      <Card.Img
        onClick={() => {
          setBusqueda(true);
          setBombero(bombero);
        }}
        style={{
          cursor: 'pointer',

        }}
        className='imgHover'
        width={270}
        height={230}
        variant="top"
        src={imagen}
      />
      <Card.Body>
        <Card.Title className="text-center">{`${nombres} ${apellidos}`}</Card.Title>
        <Card.Text className="text-center">{cargo}</Card.Text>
        <Card.Text className="text-center">{codigo}</Card.Text>
      </Card.Body>
    </Card>
  );
};
