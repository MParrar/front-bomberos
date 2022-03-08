import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPenToSquare,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export const Citacion = ({ citacion,
    index,
    setCitacion,
    setShow,
    setShowCambiarPassword,
    eliminarCitacion, }) => {

    const { _id } = citacion;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{citacion.citacion}</td>
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
                            setCitacion(citacion);
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
                        onClick={() => eliminarCitacion(_id)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </OverlayTrigger>
            </td>
        </tr>
    );
};
