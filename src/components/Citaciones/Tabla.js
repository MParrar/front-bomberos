import { useEffect, useState } from 'react';
import { Col, Form, Pagination, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Citacion } from './Citacion';

export const Tabla = ({
  citaciones,
  setCitacion,
  setShow,
  eliminarCitacion,
}) => {
  const [maxRows, setMaxRows] = useState(10);
  const [minRows, setMinRows] = useState(0);
  const [pages, setPage] = useState(null);
  const [activePage, setActivePage] = useState(0);
  const [buscador, setBuscador] = useState('');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    console.log(citaciones);
    const contPages = Math.ceil(citaciones?.length / 10);
    console.log(contPages);
    const totalPages = new Array(contPages).fill(0);
    setPage(totalPages);
    setTableData(citaciones);
  }, [citaciones]);

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
    const citacionesFiltradas = citaciones
      .map(
        (citacion) =>
          (citacion.citacion.toLowerCase().includes(value.toLowerCase()) ||
            citacion.cuartel.nombre
              .toLowerCase()
              .includes(value.toLowerCase())) &&
          citacion
      )
      .filter((citacion) => citacion !== false);
    console.log(citacionesFiltradas);
    setTableData(citacionesFiltradas);
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
      <Row>
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
              {tableData.length > 0 ? (
                tableData.map((citacion, index) => {
                  if (index < maxRows && index >= minRows) {
                    return (
                      <Citacion
                        key={citacion?._id}
                        citacion={citacion}
                        index={index}
                        setCitacion={setCitacion}
                        setShow={setShow}
                        eliminarCitacion={eliminarCitacion}
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
