import React from 'react'
import Alert from 'react-bootstrap/Alert'

export const Alerta = ({ children }) => {
    return (
        <Alert className='alert alerta-error text-center' variant={'danger'}>
            {children}
        </Alert>
    )
}
