import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const Maquina = ({ maquina, index, setMaquina, setShow, eliminarMaquina }) => {
  const { _id, nombre, estado, cuartel } = maquina;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{nombre}</td>
      <td>{estado ? 'En servicio' : 'Fuera de servicio'}</td>
      <td>{cuartel.nombre}</td>
      <td className="text-center">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-editar">Editar</Tooltip>}
        >
          <Button
            size="sm"
            style={{ marginRight: '7px' }}
            variant="warning"
            onClick={() => {
              setMaquina(maquina);
              setShow(true);
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-eliminar">Eliminar</Tooltip>}
        >
          <Button
            size="sm"
            style={{ marginRight: '7px' }}
            variant="danger"
            className="ml-3"
            onClick={() => eliminarMaquina(_id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );
};

export default Maquina;
