import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faNewspaper
} from '@fortawesome/free-solid-svg-icons';
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';
import { Tabla } from '../components/Citaciones/Tabla'
import { Formulario } from '../components/Citaciones/Formulario';
import Confirmacion from '../components/Confirmacion';
import { obtenerCitaciones } from '../services/Citacion';
import { Spinner } from '../components/Spinner';
import CuartelContext from '../context/cuarteles/cuartelContext';

const initialForm = {
    citacion: '',
};

export const Citaciones = () => {

    const [loading, setLoading] = useState(false);
    const [citaciones, setCitaciones] = useState([]);
    const [show, setShow] = useState(false);
    const [citacion, setCitacion] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [showConfirm, setshowConfirm] = useState(false);
    const [idConfirm, setIdConfirm] = useState(null);

    const cuartelContext = useContext(CuartelContext);
    const { obtenerCuarteles, cuarteles } = cuartelContext;

    useEffect(() => {
        setLoading(true);
        const listaCitaciones = async () => {
            obtenerCuarteles();
            const respuesta = await obtenerCitaciones();
            setCitaciones(respuesta);
            setLoading(false);
        };
        listaCitaciones();
    }, []);

    const eliminarCitacion = (id) => {
        setshowConfirm(true);
        setIdConfirm(id);
    };

    const handleConfirm = async () => {
        setshowConfirm(false);
        const respuesta = await eliminarCitacion(idConfirm);
        if (respuesta.ok === true) {
            setCitaciones(citaciones.filter((item) => item._id !== idConfirm));
            NotificationManager.success(
                'Citacion eliminada correctamente',
                'Excelente!',
                2000
            );
        }
    };

    const handleClose = () => {
        setshowConfirm(!showConfirm);
        setIdConfirm(null);
    };
    return (
        loading ?
            <Spinner />
            :
            <>
                <h1 className="mt-3 text-center ">Lista de Citaciones</h1>
                <div className="container">
                    <NotificationContainer />
                    <hr />
                    <Button className="mb-4 mr-2" onClick={() => setShow(!show)}>
                        Agregar Citación <FontAwesomeIcon className="ml-3" icon={faNewspaper} />
                    </Button>
                    <Confirmacion
                        title={'Eliminando Citación'}
                        mensaje={'¿Está seguro que desea eliminar ésta citación?'}
                        showConfirm={showConfirm}
                        handleClose={handleClose}
                        handleConfirm={handleConfirm}
                    />
                    <Formulario
                        setShow={setShow}
                        show={show}
                        setCitaciones={setCitaciones}
                        citaciones={citaciones}
                        setCitacion={setCitacion}
                        citacion={citacion}
                        initialForm={initialForm}
                        setErrors={setErrors}
                        errors={errors}
                        cuarteles={cuarteles}
                    />
                    <Tabla
                        citaciones={citaciones}
                        setCitacion={setCitacion}
                        setShow={setShow}
                        eliminarCitacion={eliminarCitacion}
                    />

                </div>
            </>
    )
}
