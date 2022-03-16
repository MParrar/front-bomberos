import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';
import { crearCitacion, editarCitacion } from '../../services/Citacion';

export const Formulario = ({
    show,
    setShow,
    setCitaciones,
    citaciones,
    setCitacion,
    citacion,
    initialForm,
    errors,
    setErrors,
    cuarteles
}) => {
    const {

        _id,
        cuartel
    } = citacion;

    const validarFormulario = (citacion) => {
        let errors = {};

        if (!citacion.citacion.trim()) {
            errors.citacion = 'El campo Citación es requerido';
        }
        return errors;
    };

    const handleBlur = (e) => {
        // handleChange(e);
        setErrors(validarFormulario(citacion));
    };

    const handleChange = ({ target: { name, value, type, checked } }) => {
        if (name === 'cuartel') {
            const cuartelFind = cuarteles.find(item => item._id === value)
            setCitacion({
                ...citacion,
                [name]: cuartelFind,
            });
            return;
        }
        setCitacion({
            ...citacion,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // ValdiarsH!
        if (
            [
                citacion.citacion.trim(),
                cuartel?._id.trim()
            ].includes('')
        ) {
            NotificationManager.warning(
                'Debe completar todos los campos del formulario',
                'Advertencia!',
                2500
            );
            return;
        }

        const respuesta = await crearCitacion(citacion);
        setCitaciones([...citaciones, respuesta]);
        NotificationManager.success(
            'Citación registrada correctamente',
            'Registro Exitoso!',
            2500
        );
        setCitacion(initialForm);
        setShow(false);
    };

    const handleEdit = async () => {
        if (
            [
                citacion.citacion.trim(),
                cuartel?._id.trim()
            ].includes('')
        ) {
            NotificationManager.warning(
                'Debe completar todos los campos del formulario',
                'Advertencia!',
                2500
            );
            return;
        }
        const respuesta = await editarCitacion(citacion);
        if (respuesta.ok === true) {
            NotificationManager.success(`${respuesta.msg}`, 'Éxito!', 2500);
        }
        const listaCitaciones = citaciones.map((item) =>
            item._id === citacion._id ? citacion : item
        );
        setCitaciones(listaCitaciones);
        setCitacion(initialForm);
        setShow(false);
    };


    return (
        <>
            <NotificationContainer />
            <Modal
                show={show}
                onHide={() => {
                    setShow(!show);
                    setCitacion(initialForm);
                }}
                size="md"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {_id ? 'Editar Citación' : 'Registrar Citación'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col sm={12} md={12} xl={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="citacion">Citación</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese Citación"
                                        value={citacion.citacion}
                                        name="citacion"
                                        id="citacion"
                                        onChange={handleChange}
                                        onBlur={(e) => handleBlur(e)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12} md={12} xl={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Cuartel</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        name="cuartel"
                                        value={cuartel?._id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option>-- Seleccione Cuarteles- -</option>
                                        {cuarteles?.map(cuartel => (
                                            <option key={cuartel._id} value={cuartel._id}>{cuartel.nombre}</option>

                                        ))}

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                {_id ? (
                    <Modal.Footer style={{ display: 'inline' }}>
                        <Row>
                            <Col xs={6} sm={6} md={3} xl={2} xxl={2}>
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setShow(!show);
                                        setCitacion(initialForm);
                                    }}
                                >
                                    Cerrar
                                </Button>
                                {'  '}
                                <Button variant="success" onClick={(e) => handleEdit(e)}>
                                    Editar
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                ) : (
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setShow(!show);
                                setCitacion(initialForm);
                            }}
                        >
                            Cerrar
                        </Button>
                        {'  '}
                        <Button variant="success" onClick={(e) => handleSubmit(e)}>
                            Guardar
                        </Button>
                    </Modal.Footer>
                )}
            </Modal>
        </>
    );
};
