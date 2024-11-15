import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import solidgauge from 'highcharts/modules/solid-gauge';
HighchartsMore(Highcharts);
solidgauge(Highcharts);

const CalcularCitas = () => {
  const [respuestasPorPregunta, setRespuestasPorPregunta] = useState([]);
  const [mediaGeneral, setMediaGeneral] = useState(0);
  const [usuariosContestaron, setUsuariosContestaron] = useState(0);

  useEffect(() => {
    const fetchRespuestasPorPregunta = async () => {
      try {
        const numPreguntas = 2;
        const respuestas = [];

        for (let i = 1; i <= numPreguntas; i++) {
          const response = await fetch(`https://lacasadelmariscoweb.azurewebsites.net/api/EsteticaApi/ObtenerRespuestasPorIdPregunta/${i}`);
          const data = await response.json();
          respuestas.push({ idPregunta: i, respuestas: data });
        }
        setUsuariosContestaron(respuestas.length / 2);
        setRespuestasPorPregunta(respuestas);

        const calificaciones = respuestas.flatMap(r => r.respuestas.map(respuesta => respuesta.Calificacion));
        if (calificaciones.length > 0) {
          const media = calificaciones.reduce((acc, cal) => acc + cal, 0) / calificaciones.length;
          setMediaGeneral(media);
        }
      } catch (error) {
        console.error('Error al obtener las respuestas:', error);
      }
    };

    fetchRespuestasPorPregunta();
  }, []);

  const calcularPromedioYColor = (calificaciones) => {
    const promedio = calificaciones.reduce((acc, cal) => acc + cal, 0) / calificaciones.length;
    let color = '#FF0000';

    if (promedio >= 2.5) {
      color = '#0000FF';
    } else if (promedio >= 2) {
      color = '#FFFF00';
    }

    return { promedio, color };
    
  };

  const generarOpcionesGrafica = (calificaciones, pregunta) => {
    const { promedio, color } = calcularPromedioYColor(calificaciones);
    let tituloPregunta = '';

    if (pregunta === 1) {
      tituloPregunta = '¿Qué tan fácil fue navegar por la el sitio web para agendar su cita?';
    } else if (pregunta === 2) {
      tituloPregunta = '¿Qué tan satisfecho(a) está con el diseño y la rapidez de carga de la aplicación?';
    }

    return {
      chart: {
        type: 'solidgauge',
        height: '250px'
      },
      title: {
        text: tituloPregunta,
        fontSize: '9px',
      },
      pane: {
        center: ['50%', '80%'],
        size: '160%',
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: '#f1f1f1',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc',
        },
      },
      yAxis: {
        min: 0,
        max: 3,
        lineWidth: 0,
        tickPositions: [],
      },
      series: [{
        name: 'Promedio',
        data: [promedio],
        tooltip: {
          valueSuffix: ' puntos',
        },
        dataLabels: {
          enabled: true,
          format: '{y:.2f} puntos',
          style: {
            fontSize: '13px',
            fontWeight: 'bold',
          },
        },
        dial: {
          backgroundColor: color,
        },
      }],
    };
  };

  const opcionesGraficaGeneral = {
    chart: {
      type: 'solidgauge',
      height: '250px'
    },
    title: {
      text: 'Promedio General de Calificaciones',
      style: {
        fontSize: '13px',
        fontWeight: 'bold',
      },
    },
    pane: {
      center: ['50%', '80%'],
      size: '160%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: '#f1f1f1',
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc',
      },
    },
    yAxis: {
      min: 0,
      max: 3,
      lineWidth: 0,
      tickPositions: [],
    },
    series: [{
      name: 'Promedio General',
      data: [mediaGeneral],
      tooltip: {
        valueSuffix: ' puntos',
      },
      dataLabels: {
        enabled: true,
        format: '{y:.2f} puntos',
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
        },
      },
      dial: {
        backgroundColor: mediaGeneral >= 2.5 ? '#0000FF' : (mediaGeneral >= 2 ? '#FFFF00' : '#FF0000'),
      },
    }],
  };

  return (
    <AdminLayout>
      <style>
        {`
          .container {
            padding: 1rem;
          }

          .header {
            text-align: center;
            font-size: 2rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 1rem;
          }

          .subheader {
            text-align: center;
            font-size: 1.25rem;
            font-weight: bold;
            color: #555;
            margin-bottom: 2rem;
          }

          .charts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            max-width: 800px;
            margin: 0 auto;
          }

          .chart-card {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            min-height: 250px;
          }

          .chart-wrapper {
            max-width: 400px;
            max-height: 300px;
          }

          .general-chart {
            margin-top: 2rem;
            text-align: center;
          }

          .general-chart-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 1rem;
          }

          .general-chart-subtitle {
            font-size: 1.25rem;
            font-weight: bold;
            color: #555;
            margin-bottom: 2rem;
          }

          .general-chart-container {
            display: flex;
            justify-content: center;
            padding: 1rem;
          }
        `}
      </style>

      <div className="container">
      <h1 className="general-chart-title">Gráficas de Calificaciones por Pregunta</h1>
        <h4 className="subheader">Usuarios que contestaron la encuesta: {usuariosContestaron}</h4>

        <div className="charts-grid">
          
          {respuestasPorPregunta.map((preguntaData) => (
            <div key={preguntaData.idPregunta} className="chart-card">
              <div className="chart-wrapper">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={generarOpcionesGrafica(preguntaData.respuestas.map(res => res.Calificacion), preguntaData.idPregunta)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="general-chart">
          <h3 className="general-chart-title">Gráfica General de Calificación Promedio</h3>
          <h4 className="general-chart-subtitle">Usuarios que contestaron la encuesta: {usuariosContestaron}</h4>
          <div className="general-chart-container">
            <HighchartsReact
              highcharts={Highcharts}
              options={opcionesGraficaGeneral}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CalcularCitas;
