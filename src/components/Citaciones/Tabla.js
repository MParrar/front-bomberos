import { Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Citacion } from './Citacion';

export const Tabla = ({
    citaciones,
    setCitacion,
    setShow,
    eliminarCitacion,
    cuarteles
}) => {
    return (
        <Row >
            <Col
                xs={12}
                sm={12}
                md={12}
                xl={12}
                xxl={12}
                style={{ overflowX: 'auto' }}
            >
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Cuartel</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citaciones.length > 0 ? (
                            citaciones.map((citacion, index) => (
                                <Citacion
                                    key={citacion?._id}
                                    citacion={citacion}
                                    index={index}
                                    setCitacion={setCitacion}
                                    setShow={setShow}
                                    // setShowCambiarPassword={setShowCambiarPassword}
                                    // showCambiarPassword={showCambiarPassword}
                                    eliminarCitacion={eliminarCitacion}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    No existen datos
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
};
