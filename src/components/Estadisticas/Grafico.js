import React, { useContext, useEffect, useState } from "react";
import {
  obtenerEstadisticas,
  obtenerEstadisticaUsuario,
  obtenerMisLogs,
  obtenerUsuarios,
} from "../../services/Usuario";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Spinner } from "../Spinner";
import AuthContext from "../../context/autenticacion/authContext";
import { descargarExcel } from "../../helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

let initialTimes = [0, 0, 0, 0, 0, 0, 0];
const labels = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const options = {
  fill: true,
  scales: {
    y: {
      min: 0,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
};
const Grafico = () => {
  const authContext = useContext(AuthContext);
  const { autenticado, usuario, token } = authContext;

  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({});
  const [tiempos, setTiempos] = useState(initialTimes);
  const [estadisticas, setEstadisticas] = useState([]);
  const [excel, setExcel] = useState({
    nombre: "",
    data: [],
    ejecutar: false
  });
  const [loading, setLoading] = useState(false);

  let scores = [0, 0, 0, 0, 0, 0, 0];

  const buscarInformacion = async () => {
    setLoading(true);
    if (usuario.usuario.rol === "Bombero") {
      const respuestaMisLogs = await obtenerMisLogs(usuario?.usuario?._id);
      calcularLog(respuestaMisLogs);
      setEstadisticas(respuestaMisLogs);
      setLoading(false);
    } else {
      const respuestaLogs = await obtenerEstadisticas();
      setEstadisticas(respuestaLogs);
      const respuestaUsuarios = await obtenerUsuarios();
      setUsuarios(respuestaUsuarios);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autenticado) {
      buscarInformacion();
    }
  }, [autenticado]);

  const data = {
    datasets: [
      {
        label: "Horas en servicio",
        tension: 0.3,
        data: tiempos,
        borderColor: "rgb(6, 11, 38)",
        backgroundColor: "rgba(6, 11, 38, 0.8)",
      },
    ],
    labels,
  };

  const handleChange = ({ target: { value, name } }) => {
    const usuario = usuarios.filter((usuario) => usuario._id === value)[0];
    if (usuario) {
      setUsuarioSeleccionado(usuario);
      const busquedaLogs = estadisticas.filter(
        (log) => log.usuario?._id === usuario?._id
      );
      calcularLog(busquedaLogs);
    }
  };

  const handleChangeBuscar = async ({ target: { value, name } }) => {
    const usuario = usuarios.filter((usuario) => usuario._id === value)[0];
    console.log(usuario);
    if (usuario) {
      setUsuarioSeleccionado(usuario);
      const { _id } = usuario;
      let respuesta = await obtenerEstadisticaUsuario(_id);
      setExcel({
        nombre: usuario.nombres,
        data: respuesta.estadisticas,
        ejecutar: true
      });
    }
  };

  const calcularLog = (busquedaLogs) => {
    if (busquedaLogs.length > 0) {
      busquedaLogs.map((log) => {
        const dia = new Date(log.createdAt).getDay().toLocaleString("es-CL");
        if (log.total) {
          if (dia === "1") {
            scores[0] += log.total / 60;
            setTiempos(scores);
          }
          if (dia === "2") {
            scores[1] += log.total / 60;
            setTiempos(scores);
          }
          if (dia === "3") {
            scores[2] += log.total / 60;
            setTiempos(scores);
          }
          if (dia === "4") {
            scores[3] += log.total / 60;
            setTiempos(scores);
          }
          if (dia === "5") {
            scores[4] += log.total / 60;
            setTiempos(scores);
          }
          if (dia === "6") {
            scores[5] += log.total / 60;
            setTiempos(scores);
          }
          if (dia === "0") {
            scores[6] += log.total / 60;
            setTiempos(scores);
          }
        }
      });
    } else {
      setTiempos(initialTimes);
    }
  };

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Row>
            <Col>
              <Row>
                <Col xs={0} sm={2} md={4} xl={4} xxl={4}></Col>
                <Col xs={12} sm={8} md={4} xl={4} xxl={4}>
                  {usuario?.usuario.rol === "Bombero" ? (
                    <h4 className="text-center">
                      Información horas en servicio
                    </h4>
                  ) : (
                    <Form.Control
                      as="select"
                      name="usuario"
                      value={usuarioSeleccionado._id}
                      onChange={handleChange}
                    >
                      <option>-- Seleccione Usuario- -</option>
                      {usuarios &&
                        usuarios.map((usuario) => (
                          <option
                            key={usuario._id}
                            value={usuario._id}
                          >{`${usuario.nombres} ${usuario.apellidos}`}</option>
                        ))}
                    </Form.Control>
                  )}
                </Col>
                <Col xs={0} sm={2} md={4} xl={4} xxl={4}></Col>
              </Row>
              <Container>
                <Bar data={data} options={options} />
              </Container>
            </Col>
            <Col>
              <Form.Control
                as="select"
                name="usuario"
                className="mb-4"
                value={usuarioSeleccionado._id}
                onChange={handleChangeBuscar}
              >
                <option>-- Seleccione Usuario- -</option>
                {usuarios &&
                  usuarios.map((usuario) => (
                    <option
                      key={usuario._id}
                      value={usuario._id}
                    >{`${usuario.nombres} ${usuario.apellidos}`}</option>
                  ))}
              </Form.Control>

              <div className="text-center">
                {excel.ejecutar && (
                  excel.data.length > 0 ?
                    descargarExcel(excel.data, excel.nombre)
                    :
                    <>
                      Usuario no registra estadisticas...
                    </>
                )
                }{" "}
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Grafico;
