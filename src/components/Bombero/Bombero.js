import React from 'react'
import { Card } from 'react-bootstrap'


export const Bombero = ({ bombero }) => {

    const { nombres, apellidos, cargo, codigo } = bombero;

    return (

        <Card className='mr-2 mt-4'>
            <Card.Img variant="top" src="https://ten-golf.com/wp-content/uploads/2018/04/parzialebombero.jpg" />
            <Card.Body>
                <Card.Title className='text-center'>{`${nombres} ${apellidos}`}</Card.Title>
                <Card.Text className='text-center'>
                    {cargo}
                </Card.Text>
                <Card.Text className='text-center'>
                    {codigo}
                </Card.Text>

            </Card.Body>
        </Card>


    )
}
