import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faTrash,
  faKey,
} from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export const Usuario = ({
  usuario,
  index,
  setUsuario,
  setShow,
  setShowCambiarPassword,
  eliminarUsuario,
}) => {
  const { nombres, apellidos, cargo, _id } = usuario;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{nombres}</td>
      <td>{apellidos}</td>
      <td>{cargo}</td>
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
              setUsuario(usuario);
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
            onClick={() => eliminarUsuario(_id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-password">Cambiar Contraseña</Tooltip>}
        >
          <Button
            size="sm"
            style={{ marginRight: '7px' }}
            variant="secondary"
            onClick={() => {
              setUsuario(usuario);
              setShowCambiarPassword(true);
            }}
            className="ml-3"
          >
            <FontAwesomeIcon icon={faKey} />
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );
};
