import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import AuthContext from '../../context/autenticacion/authContext';
import fotogenerica from '../../img/fotoperfilgenerico.png'

export const Bombero = ({ bombero, setBusqueda, setBombero }) => {
  const { nombres, apellidos, cargo, imagen, cuartel, especialidad, maquinasAManejar } = bombero;
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;
  const handleClick = () => {
    setBusqueda(true);
    setBombero(bombero);
  };
  return (
    <Card className="mr-4 mt-4 imgHover" style={{
      border: cuartel?.nombre.toUpperCase() === 'PRIMERA' ? '3px solid blue' :
        cuartel?.nombre.toUpperCase() === 'SEGUNDA' ? '3px solid orange' : '3px solid green'
    }}>
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
        src={imagen ? imagen : fotogenerica}
      />
      <Card.Body className="cuerpo-card">
        <h6 className="text-center cargo">{`${cargo[0]}${cargo.slice(1, cargo.length).toLowerCase()}`}</h6>
        <h6 className="text-center nombre">{`${nombres} ${apellidos}`}</h6>
        <h6 className="text-center nombre">{`${cuartel?.nombre}`}</h6>
        {especialidad && <h6 className="text-center nombre">{`${especialidad}`}</h6>
        }
        {maquinasAManejar.map((maquina, i) => (
          <h6 style={{ display: 'inline-block', marginRight: '2px' }}>{maquina.nombre} {i !== maquinasAManejar.length - 1 && '-'}</h6>
        ))}
      </Card.Body>
    </Card>
  );
};
