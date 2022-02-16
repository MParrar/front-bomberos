import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button'
import { CambiarPassword } from '../components/Usuario/CambiarPassword'
import { Formulario } from '../components/Usuario/Formulario'
import { Tabla } from '../components/Usuario/Tabla'
import clienteAxios from '../config/axios'


const initialForm = {
    nombres: '',
    apellidos: '',
    rut: '',
    cargo: '',
    codigo: '',
    password: '',
    rol: '',
    confirmPassword: ''
}

export const Usuario = () => {

    const [show, setShow] = useState(false);
    const [showCambiarPassword, setShowCambiarPassword] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [usuario, setUsuario] = useState(initialForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {

        const obtenerUsuarios = async () => {
            const respuesta = (await clienteAxios.get("/usuarios")).data;
            setUsuarios(respuesta);
        };
        obtenerUsuarios();
    }, []);

    return (
        <>
            <h1 className='mt-3 text-center'>USUARIOS</h1>
            <div className='container'>
                <hr />
                <Button
                    className='mb-4'
                    onClick={() => setShow(!show)}
                >
                    Agregar Usuario  {' '}

                    <FontAwesomeIcon className='ml-2' icon={faUserPlus} />

                </Button>
                <Formulario
                    setShow={setShow}
                    show={show}
                    setUsuarios={setUsuarios}
                    usuarios={usuarios}
                    setUsuario={setUsuario}
                    usuario={usuario}
                    initialForm={initialForm}
                    setErrors={setErrors}
                    errors={errors}
                />
                <Tabla
                    usuarios={usuarios}
                    setUsuario={setUsuario}
                    setShow={setShow}
                    showCambiarPassword={showCambiarPassword}
                    setShowCambiarPassword={setShowCambiarPassword}
                />
                <CambiarPassword
                    showCambiarPassword={showCambiarPassword}
                    setShowCambiarPassword={setShowCambiarPassword}
                    usuario={usuario}
                    setUsuarios={setUsuarios}
                    setUsuario={setUsuario}
                    initialForm={initialForm}

                />
            </div>
        </>
    )
}
