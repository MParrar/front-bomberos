import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Login = () => {

    const [usuario, guardarUsuario] = useState({
        rut: '',
        password: ''
    });

    const { rut, password } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="form-usuario">
            {/* { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> )  : null } */}

            <div className="contenedor-form sombra-dark mb-4">
                <h1>Iniciar Sesión</h1>

                <form
                    className='mt-4'
                // onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Rut</label>
                        <input
                            type="text"
                            id="rut"
                            name="rut"
                            placeholder="Ingrese Rut"
                            value={rut}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingrese Password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <Link to='/inicio' style={{ margin: '0 auto' }}>
                            <Button variant='secondary' >
                                Iniciar Sesion
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
