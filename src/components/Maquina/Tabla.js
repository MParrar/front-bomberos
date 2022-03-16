import { Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Maquina from './Maquina';

const Tabla = ({ maquinas, setMaquina, setShow, eliminarMaquina, cuarteles }) => {
  return (
    <Row className="tablaUsuario">
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
              <th>Estado</th>
              <th>Cuartel</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {maquinas?.length > 0 ? (
              maquinas?.map((maquina, index) => (
                <Maquina
                  key={maquina?._id}
                  maquina={maquina}
                  index={index}
                  setMaquina={setMaquina}
                  setShow={setShow}
                  eliminarMaquina={eliminarMaquina}
                  cuarteles={cuarteles}
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

export default Tabla;
