import { useEffect, useState } from 'react';
import { Col, Form, Pagination, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Maquina from './Maquina';

const Tabla = ({
  maquinas,
  setMaquina,
  setShow,
  eliminarMaquina,
  cuarteles,
}) => {
  const [maxRows, setMaxRows] = useState(10);
  const [minRows, setMinRows] = useState(0);
  const [pages, setPage] = useState(null);
  const [activePage, setActivePage] = useState(0);
  const [buscador, setBuscador] = useState('');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const contPages = Math.ceil(maquinas.length / 10);
    const totalPages = new Array(contPages).fill(0);
    setPage(totalPages);
    setTableData(maquinas);
  }, [maquinas]);

  const handleNextPage = () => {
    setMaxRows((rows) => rows + 10);
    setMinRows((rows) => rows + 10);
    setActivePage(Math.round(maxRows / 10));
  };

  const handlePrevPage = () => {
    if (minRows > 0) {
      setMaxRows((rows) => rows - 10);
      setMinRows((rows) => rows - 10);
      console.log(minRows, Math.round(maxRows / 10));
      setActivePage(Math.round(minRows / 10) - 1);
    }
  };

  const handlePagination = (index) => {
    setActivePage(index);
    if (index === 0) {
      setMaxRows(10);
      setMinRows(0);
      return;
    }
    setMaxRows((rows) => (index + 1) * 10);
    setMinRows((rows) => index * 10);
  };

  const handleFirstPage = () => {
    setMaxRows(10);
    setMinRows(0);
    setActivePage(0);
  };

  const handleLastPage = () => {
    setMaxRows(pages.length * 10);
    setMinRows(pages.length * 10 - 10);
    setActivePage(pages.length - 1);
  };

  const handleChangeBuscador = ({ target: { value } }) => {
    setBuscador(value);
    console.log(value);
    const maquinasFiltradas = maquinas
      .map(
        (maquina) =>
          (maquina.nombre.toLowerCase().includes(value.toLowerCase()) ||
            maquina.cuartel.nombre
              .toLowerCase()
              .includes(value.toLowerCase())) &&
          maquina
      )
      .filter((maquina) => maquina !== false);
    console.log(maquinasFiltradas);
    setTableData(maquinasFiltradas);
    setMaxRows(10);
    setMinRows(0);
    setActivePage(0);
  };
  return (
    <>
      <Row>
        <Col md={8}></Col>
        <Col md={4}>
          <Form.Control
            type="text"
            style={{ marginBottom: '6px' }}
            value={buscador}
            onChange={handleChangeBuscador}
            placeholder="Buscador..."
          />
        </Col>
      </Row>
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
              {tableData?.length > 0 ? (
                tableData?.map((maquina, index) => {
                  if (index < maxRows && index >= minRows) {
                    return (
                      <Maquina
                        key={maquina?._id}
                        maquina={maquina}
                        index={index}
                        setMaquina={setMaquina}
                        setShow={setShow}
                        eliminarMaquina={eliminarMaquina}
                        cuarteles={cuarteles}
                      />
                    );
                  }
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No existen datos
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          {pages?.length > 1 && (
            <Pagination>
              {activePage > 0 && (
                <>
                  <Pagination.First onClick={handleFirstPage} />
                  <Pagination.Prev onClick={handlePrevPage} />
                </>
              )}

              {pages &&
                pages?.map((page, index) => (
                  <Pagination.Item
                    key={index}
                    active={index === activePage && true}
                    onClick={() => handlePagination(index)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}

              {activePage < pages?.length - 1 && (
                <>
                  <Pagination.Next onClick={handleNextPage} />
                  <Pagination.Last onClick={handleLastPage} />
                </>
              )}
            </Pagination>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Tabla;
