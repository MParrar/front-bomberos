import React from 'react'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faKey } from '@fortawesome/free-solid-svg-icons';

export const Usuario = ({ usuario, index, setUsuario, setShow, setShowCambiarPassword }) => {

    const { nombres, apellidos, cargo } = usuario
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{nombres}</td>
            <td>{apellidos}</td>
            <td>{cargo}</td>
            <td className='text-center'>
                <Button
                    size='sm'
                    style={{ marginRight: '7px' }}
                    variant='warning'
                    onClick={() => {
                        setUsuario(usuario);
                        setShow(true)
                    }}>
                    <FontAwesomeIcon
                        icon={faPenToSquare}
                    />
                </Button>

                <Button
                    size='sm'
                    style={{ marginRight: '7px' }}
                    variant='danger'
                    className='ml-3'>
                    <FontAwesomeIcon
                        icon={faTrash}
                    />

                </Button>

                <Button
                    size='sm'
                    style={{ marginRight: '7px' }}
                    variant='secondary'
                    onClick={() => {
                        setUsuario(usuario);
                        setShowCambiarPassword(true)
                    }}
                    className='ml-3'>
                    <FontAwesomeIcon
                        icon={faKey}
                    />

                </Button>

            </td>
        </tr>
    )
}
