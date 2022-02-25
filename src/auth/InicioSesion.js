import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import AuthContext from '../context/autenticacion/authContext';
import { Alerta } from '../components/Alerta';
import { Spinner } from '../components/Spinner';

export const InicioSesion = () => {

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const authContext = useContext(AuthContext);
    const { autenticado, iniciarSesion, mensaje } = authContext;
    const [loading, setLoading] = useState(false);

    const [usuario, guardarUsuario] = useState({
        rut: '',
        password: ''
    });
    const { rut, password } = usuario;
    useEffect(() => {

        if (autenticado) {
            navigate('/inicio');
        }
        if (mensaje) {
            setError(mensaje);
        }
    }, [mensaje, autenticado, navigate]);

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        if (rut.trim() === '' || password.trim() === '') {
            setError('Todos los campos son requeridos');
            setTimeout(() => {
                setError('')
            }, 2000);
            return;
        }

        setLoading(true);
        iniciarSesion({ rut, password });
        setLoading(false);
    }
    return (
        loading ?
            <Spinner />
            :
            <div className="form-usuario">

                <div className="contenedor-form sombra-dark mb-4">
                    {error && (<Alerta > {error} </Alerta>)}
                    <h1>Iniciar Sesión</h1>

                    <form
                        className='mt-4'
                    // onSubmit={onSubmit}
                    >
                        <div className="campo-form">
                            {/* <label htmlFor="email">Rut</label> */}
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
                            {/* <label htmlFor="password">Password</label> */}
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Ingrese Contraseña"
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        <div className="campo-form">
                            <Button
                                style={{ margin: '0 auto' }}
                                variant='secondary'
                                onClick={onSubmit}
                            >
                                Iniciar Sesion
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
    )
}
