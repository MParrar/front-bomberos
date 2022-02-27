import React, { useEffect, useState } from 'react';
import { obtenerEstadisticas, obtenerUsuarios } from '../../services/Usuario';
import { Doughnut } from 'react-chartjs-2';
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
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Col, Container, Form, Row } from 'react-bootstrap';

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
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

const options = {
  fill: true,
  animations: false,
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
  const [estadisticas, setEstadisticas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({});
  const [tiempos, setTiempos] = useState(initialTimes);
  let scores = [0, 0, 0, 0, 0, 0, 0];

  useEffect(() => {
    const buscarInformacion = async () => {
      const respuestaLogs = await obtenerEstadisticas();
      setEstadisticas(respuestaLogs);
      const respuestaUsuarios = await obtenerUsuarios();
      setUsuarios(respuestaUsuarios);
    };

    buscarInformacion();
    obtenerLunes();
  }, []);

  const obtenerLunes = () => {
    var nowTemp = new Date(Date.now()); // Hora actual
    var oneDayLong = 24 * 60 * 60 * 1000; // El número de milisegundos en un día
    var c_time = nowTemp.getTime(); // El tiempo de milisegundos de la hora actual
    var c_day = nowTemp.getDay() || 7; // El día de la semana a la hora actual
    var m_time = c_time - (c_day - 1) * oneDayLong; // La hora actual en milisegundos del lunes
    var monday = new Date(m_time); // Establecer objeto de hora de lunes
    var m_year = monday.getFullYear();
    var m_month = monday.getMonth() + 1;
    var m_date = monday.getDate();
  };

  const data = {
    datasets: [
      {
        label: 'Horas en servicio',
        tension: 0.3,
        data: tiempos,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(6, 11, 38, 0.8)',
      },
    ],
    labels,
  };

  const handleChange = ({ target: { value, name } }) => {
    const usuario = usuarios.filter((usuario) => usuario._id === value)[0];
    if (usuario) {
      setUsuarioSeleccionado(usuario);
      const busquedaLogs = estadisticas.filter(
        (log) => log.usuario._id === usuario._id
      );

      if (busquedaLogs.length > 0) {
        busquedaLogs.map((log) => {
          const dia = new Date(log.createdAt).getDay().toLocaleString('es-CL');
          if (log.total) {
            if (dia === '1') {
              scores[0] = (scores[0] + log.total) / 60;
              setTiempos(scores);
            }
            if (dia === '2') {
              scores[1] = (scores[1] + log.total) / 60;
              setTiempos(scores);
            }
            if (dia === '3') {
              scores[2] = (scores[2] + log.total) / 60;
              setTiempos(scores);
            }
            if (dia === '4') {
              scores[3] = (scores[3] + log.total) / 60;
              setTiempos(scores);
            }
            if (dia === '5') {
              scores[4] = (scores[4] + log.total) / 60;
              setTiempos(scores);
            }
            if (dia === '6') {
              scores[5] = (scores[5] + log.total) / 60;
              setTiempos(scores);
            }
            if (dia === '7') {
              scores[6] = (scores[6] + log.total) / 60;
              setTiempos(scores);
            }
          }
        });
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={0} sm={2} md={4} xl={4} xxl={4}></Col>
        <Col xs={12} sm={8} md={4} xl={4} xxl={4}>
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
        </Col>
        <Col xs={0} sm={2} md={4} xl={4} xxl={4}></Col>
      </Row>
      <Container>
        <Bar data={data} options={options} />
      </Container>
    </Container>
  );
};

export default Grafico;
