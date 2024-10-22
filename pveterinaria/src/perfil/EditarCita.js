import React, { useState, useEffect } from "react";
import PerfilLayout from "./PerfilLayout";
import Layout from "../Layout";

import { useLocation } from "react-router-dom";

import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";


export default function EditarCita() {
  const location = useLocation();
  const idCita = location.state ? location.state.IdCita : null;

  useEffect(() => {
    traerDatosCita();
    obtenerDatosServicios();
  }, []);

  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [servicio, setServicio] = useState('');
  const [fechaCitaError, setFechaCitaError] = useState('');
  const [horaCitaError, setHoraCitaError] = useState('');
  const [servicioError] = useState('');
  const horarios = ['09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00'];
  const [horariosDisponibles, setHorariosDisponibles] = useState(horarios);
  
  const [idServicio, setIdServicio] = useState();
  
  const [telefono, setTelefono] = useState();
  const [dataServicio, setDataServicio] = useState([]);
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";


  const obtenerDatosServicios = async () => {
    try {
      const response = await fetch(
        apiurll +'api/CasaDelMarisco/ObtenerServiciosCAN',
        {
          method: 'GET',
          // No es necesario incluir el body para una solicitud GET
        }
      );


      if (response.ok) {
        const dataService = await response.json();
        setDataServicio(dataService);
        console.log(dataService);
      } else {
        console.error('Error al obtener datos de los usuarios:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };


  const traerDatosCita = () => {
    const proData = new FormData();
    proData.append("idCita", idCita);

    fetch(
      'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerCitaPorID?idCita=' + idCita,
      {
        method: 'POST',
        body: proData,
      }
    ).then((res) => res.json())
      .then((result) => {
        setServicio(result.servicio_id);
        setFechaCita(result.fecha.split('T')[0]);
        setHoraCita(result.Hora);
        setTelefono(result.Telefono);
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
      });
  };

  const obtenerhorariosFecha = (fecha) => {
    const proData = new FormData();
    proData.append("fecha", fecha);

    fetch('https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/ObtenerDiasInhabiles?fecha=' + fecha, {
      method: 'POST',
      body: proData,
    }).then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result === "Si hay servicio") {
          fetch('https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/ObtenerHorasDisponibles?fecha=' + fecha, {
            method: 'POST',
            body: proData,
          }).then((res) => res.json())
            .then((result) => {
              console.log(result);
              if (result === "No hay horas") {
                setHorariosDisponibles(horarios.map(horario => ({ hora: horario, ocupada: false })));
              } else {
                const horariosOcupados2 = result;
                const horariosConEstadoActualizado = horarios.map(horario => ({
                  hora: horario,
                  ocupada: horariosOcupados2.includes(horario)
                }));

                setHorariosDisponibles(horariosConEstadoActualizado);
              }
            });
        } else {
          const horariosOcupados = result;
          const horariosDisponiblesConEstado = horarios.map(horario => ({ hora: horario, ocupada: false }));

          horariosOcupados.forEach(horarioOcupado => {
            const [horaInicioOcupada, horaFinOcupada] = horarioOcupado.split('-');
            horariosDisponiblesConEstado.forEach(horario => {
              if (horario.hora >= horaInicioOcupada && horario.hora <= horaFinOcupada) {
                horario.ocupada = true;
              }
            });
          });

          fetch('https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/ObtenerHorasDisponibles?fecha=' + fecha, {
            method: 'POST',
            body: proData,
          }).then((res) => res.json())
            .then((result) => {
              console.log(result);
              if (result === "No hay horas") {
                setHorariosDisponibles(horariosDisponiblesConEstado);
              } else {
                const horariosOcupados2 = result;
                const horasOcupadas2 = horariosOcupados2.map(horario => horario.substring(0, 5));
                const horariosActualizados = horariosDisponiblesConEstado.map(horario => ({
                  hora: horario.hora,
                  ocupada: horasOcupadas2.includes(horario.hora.substring(0, 5)) || horario.ocupada
                }));

                setHorariosDisponibles(horariosActualizados);
              }
            });
        }
      });
  };

  

  

  

  const handleFechaCitaChange = (e) => {
    const nuevaFechaCita = e.target.value;
    setFechaCita(nuevaFechaCita);
    obtenerhorariosFecha(nuevaFechaCita);
  };

  const enviarDatosActualizados = () => {
    const data = new FormData();
    data.append("idCita", idCita);
    data.append("servicio_id", servicio);
    data.append("Fecha", fechaCita);
    data.append("Hora", horaCita);
    data.append("Telefono", telefono);

    fetch('https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/EditarCita?idCita=' + idCita + "&servicio_id=" + servicio + "&Fecha=" + fechaCita + "&Hora=" + horaCita + "&Telefono=" + telefono,
      {
        method: "POST",
        body: data,
      }
    ).then((res) => res.json())
      .then((result) => {
        if (result === "Cita a sido editada exitosamente!!") {
          Swal.fire({
            icon: 'success',
            title: 'Cita Actualiza',
            text: '¡Gracias por preferirnos!',
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Solicitud no realizada',
            text: 'A ocurrio un problema, por favor intenta de nuevo',
          });
        }
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
      });
  };

  return (
    <div>
      <Layout>
        <PerfilLayout>
          <div className="py-4">
            <div className="container mx-auto px-4">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Editar Cita</h1>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Servicio
                    </label>
                    <select
                      value={servicio}
                      onChange={(e) => setServicio(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Seleccionar servicio</option>
                      {dataServicio.map((servicio) => (
                        <option key={servicio.Id} value={servicio.Id}>
                          {servicio.Descripcion}
                        </option>
                      ))}
                    </select>
                    {servicioError && (
                      <p className="text-red-500 text-xs italic">{servicioError}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Fecha de la cita
                    </label>
                    <input
                      type="date"
                      value={fechaCita}
                      onChange={handleFechaCitaChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {fechaCitaError && (
                      <p className="text-red-500 text-xs italic">{fechaCitaError}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Hora de la cita
                    </label>
                    <select
                      value={horaCita}
                      onChange={(e) => setHoraCita(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Seleccionar hora</option>
                      {horariosDisponibles.map((horario) => (
                        <option key={horario.hora} value={horario.hora} disabled={horario.ocupada}>
                          {horario.hora} {horario.ocupada ? '(Ocupada)' : ''}
                        </option>
                      ))}
                    </select>
                    {horaCitaError && (
                      <p className="text-red-500 text-xs italic">{horaCitaError}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Button color="blue" onClick={enviarDatosActualizados}>
                      Actualizar Cita
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </PerfilLayout>
      </Layout>
    </div>
  );
}
