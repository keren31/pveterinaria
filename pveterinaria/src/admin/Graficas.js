import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

export function DashboardGrafica2() {
    const [respuestasPorPregunta, setRespuestasPorPregunta] = useState([]);
    const [setMediaGeneral] = useState(0);
    const [usuariosContestaron, setUsuariosContestaron] = useState(0);

    useEffect(() => {
        const fetchRespuestasPorPregunta = async () => {
            try {
                const numPreguntas = 5;
                const respuestas = [];
                let respuestasE = 0;
                for (let i = 4; i <= numPreguntas; i++) {
                    const response = await fetch(
                        `https://lacasadelmariscoweb.azurewebsites.net/api/EsteticaApi/ObtenerRespuestasPorIdPregunta/${i}`
                    );
                    const data = await response.json();
                    console.log(data);
                    respuestas.push({ idPregunta: i, respuestas: data });
                    respuestasE += respuestas[i-4].respuestas.length
                }
                console.log(respuestasE / 2);
                setUsuariosContestaron(respuestasE / 2)
                setRespuestasPorPregunta(respuestas);
                const calificaciones = respuestas.flatMap((r) =>
                    r.respuestas.map((respuesta) => respuesta.Calificacion)
                );
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

    const generarOpcionesGrafica = (calificaciones, idPregunta) => {
        const promedio = calificaciones.reduce((acc, cal) => acc + cal, 0) / calificaciones.length;

        // Definir el color principal basado en el ID de la pregunta
        let colorPrincipal;
        if (idPregunta === 4) {
            colorPrincipal = '#FFA500'; // Naranja
        } else if (idPregunta === 5) {
            colorPrincipal = '#0000FF'; // Azul
        } else if (idPregunta === 6) {
            colorPrincipal = '#008000'; // Verde
        }

        // Determinar el color según el promedio
        const color = promedio >= 2.5 ? colorPrincipal : promedio >= 2 ? '#FFFF00' : '#FF0000'; // Amarillo o Rojo

        return {
            title: {
                text: promedio.toFixed(2) + '🌟',
                left: 'center',
                top: '45%',
                textStyle: {
                    fontSize: 22,
                    fontWeight: 'bold',
                },
            },
            series: [
                {
                    type: 'pie',
                    radius: ['60%', '80%'], // Radio interno y externo para lograr el efecto de media luna
                    startAngle: 180, // Inicia desde la parte inferior
                    data: [
                        {
                            value: promedio,
                            itemStyle: {
                                color, // Color calculado dinámicamente
                            },
                        },
                        {
                            value: 3 - promedio, // Resto del círculo no lleno
                            itemStyle: {
                                color: 'transparent',
                            },
                        },
                    ],
                    label: {
                        show: false, // Ocultar etiquetas
                    },
                },
            ],
        };
    };

    const opcionesGraficaGeneral = generarOpcionesGrafica(
        respuestasPorPregunta.flatMap((p) => p.respuestas.map((r) => r.Calificacion)),
        'General'
    );

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <h2 className="text-2xl font-bold text-center">Gráficas de Calificaciones por Pregunta</h2>
            <h4 className="text-2xl font-bold text-center">Usuarios que contestaron la encuesta: {usuariosContestaron}</h4>

            <div className="grid grid-cols-3 gap-2">
                {respuestasPorPregunta.map((preguntaData) => {
                    // Determinar el título basado en el ID de la pregunta
                    let tituloPregunta;
                    if (preguntaData.idPregunta === 4) {
                        tituloPregunta = '¿Qué tan fácil fue navegar por la aplicación móvil para agendar su cita?';
                    } else if (preguntaData.idPregunta === 5) {
                        tituloPregunta = '¿Qué tan satisfecho(a) está con el diseño y la rapidez de carga de la aplicación?';
                    } else if (preguntaData.idPregunta === 3) {
                        tituloPregunta = '¿Qué te pareció el proceso de pago de tu pedido?';
                    }

                    return (
                        <div key={preguntaData.idPregunta} className="card flex flex-col justify-center items-center">
                            {/* Mostrar el título dinámico de la pregunta */}

                            <ReactECharts
                                option={generarOpcionesGrafica(
                                    preguntaData.respuestas.map((res) => res.Calificacion),
                                    preguntaData.idPregunta
                                )}
                                style={{ height: 250, width: 250 }}
                            />
                            <h3 className="text-lg font-bold text-center mb-2">{tituloPregunta}</h3>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 flex flex-col items-center justify-center">
                <h3 className="text-xl text-center font-bold mb-4">Gráfica General de Calificación Promedio</h3>
                <ReactECharts option={opcionesGraficaGeneral} style={{ height: 250, width: 250 }} />
            </div>

        </div>

    );
}

export default DashboardGrafica2;