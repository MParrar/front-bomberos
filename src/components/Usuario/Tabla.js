import { Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Usuario } from './Usuario';

export const Tabla = ({
  usuarios,
  setUsuario,
  setShow,
  setShowCambiarPassword,
  showCambiarPassword,
  eliminarUsuario,
}) => {
  return (
    <Row>
      <Col xs={12} sm={12} md={12} xl={12} xxl={12}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Cargo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario, index) => (
                <Usuario
                  key={usuario._id}
                  usuario={usuario}
                  index={index}
                  setUsuario={setUsuario}
                  setShow={setShow}
                  setShowCambiarPassword={setShowCambiarPassword}
                  showCambiarPassword={showCambiarPassword}
                  eliminarUsuario={eliminarUsuario}
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
