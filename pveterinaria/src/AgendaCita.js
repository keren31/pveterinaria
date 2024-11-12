import React, { useState, useEffect } from 'react';
import './css/agendarCitas.css';
import imagen from './img/imagen1.jpg'; // Ruta de la imagen que deseas utilizar
import { useUser } from './UserContext';
import Swal from 'sweetalert2';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const AgendarCita = () => {
  const navigate = useNavigate(); // Mueve useNavigate al nivel superior
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

  useEffect(() => {
    obtenerDatosServicios();
  }, []);

  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [servicio, setServicio] = useState('');
  const [fechaCitaError, setFechaCitaError] = useState('');
  const [horaCitaError, setHoraCitaError] = useState('');
  const [servicioError, setServicioError] = useState('');
  const [dataServicio, setDataServicio] = useState([]);
  const { user } = useUser();

  const obtenerIdUsuario = (user) => user?.idUsuario || null;
  const obtenerNombre = (user) => user?.Nombre || null;
  const obtenerApellido = (user) => user?.ApellidoPaterno || null;
  const obtenerApellidoM = (user) => user?.ApellidoMaterno || null;
  const obtenerCorreo = (user) => user?.Correo || null;
  const obtenerTelefono = (user) => user?.Telefono || null;

  const obtenerDatosServicios = async () => {
    try {
      const response = await fetch(apiurll + 'api/CasaDelMarisco/ObtenerServiciosCAN', {
        method: 'GET'
      });
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

  const id = obtenerIdUsuario(user);
  const nombreUser = obtenerNombre(user);
  const ApellidoPa = obtenerApellido(user);
  const Tel = obtenerTelefono(user);
  const CorreUser = obtenerCorreo(user);
  const ApellidoMa = obtenerApellidoM(user);

  const handleEncuestaSatisfaccion = () => {
    Swal.fire({
        title: 'Encuesta de satisfacción',
        html: `
            <p>¡Ayúdanos a mejorar! Responde una breve encuesta sobre tu experiencia al agendar tu cita. ¡Tus comentarios son muy valiosos para nosotros!</p>
            <div style="text-align: left; margin-top: 15px;">
                <label>¿Qué tan fácil fue navegar por la aplicación móvil para agendar su cita?</label>
                <div>
                    <input type="radio" name="pregunta1" value="1"> 1. Muy fácil<br>
                    <input type="radio" name="pregunta1" value="2"> 2. Fácil<br>
                    <input type="radio" name="pregunta1" value="3"> 3. Neutral<br>
                    <input type="radio" name="pregunta1" value="4"> 4. Difícil<br>
                    <input type="radio" name="pregunta1" value="5"> 5. Muy difícil<br>
                </div>
                
                <label style="margin-top: 15px; display: block;">¿Los pasos para completar la cita fueron claros y fáciles de seguir?</label>
                <div>
                    <input type="radio" name="pregunta2" value="1"> 1. Muy fácil<br>
                    <input type="radio" name="pregunta2" value="2"> 2. Fácil<br>
                    <input type="radio" name="pregunta2" value="3"> 3. Neutral<br>
                    <input type="radio" name="pregunta2" value="4"> 4. Difícil<br>
                    <input type="radio" name="pregunta2" value="5"> 5. Muy difícil<br>
                </div>

                <label style="margin-top: 15px; display: block;">¿Qué tan satisfecho(a) está con el diseño y la rapidez de carga de la aplicación?</label>
                <div>
                    <input type="radio" name="pregunta3" value="1"> 1. Muy fácil<br>
                    <input type="radio" name="pregunta3" value="2"> 2. Fácil<br>
                    <input type="radio" name="pregunta3" value="3"> 3. Neutral<br>
                    <input type="radio" name="pregunta3" value="4"> 4. Difícil<br>
                    <input type="radio" name="pregunta3" value="5"> 5. Muy difícil<br>
                </div>
            </div>
        `,
        confirmButtonText: 'Enviar',
        showCancelButton: true,
        preConfirm: () => {
            const pregunta1 = document.querySelector('input[name="pregunta1"]:checked')?.value;
            const pregunta2 = document.querySelector('input[name="pregunta2"]:checked')?.value;
            const pregunta3 = document.querySelector('input[name="pregunta3"]:checked')?.value;

            if (!pregunta1 || !pregunta2 || !pregunta3) {
                Swal.showValidationMessage('Por favor, responde todas las preguntas.');
                return false;
            }

            return {
                pregunta1,
                pregunta2,
                pregunta3
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('Respuestas:', result.value);
            Swal.fire('Gracias', 'Gracias por tu retroalimentación', 'success');
        }
    });
};

const handleSubmit = async (event) => {

  event.preventDefault();

  if (validateFechaCita(fechaCita) && validateHoraCita(horaCita) && validateServicio(servicio)) {
    const data = new FormData();
    data.append("usuario_id", id);
    data.append("servicio_id", servicio);
    data.append("Fecha", fechaCita);
    data.append("Telefono", Tel);
    data.append("Correo", CorreUser);
    data.append("Hora", horaCita);

    fetch(apiurll + "/api/CasaDelMarisco/AgregarCita?usuario_id=" + id +
      "&servicio_id=" + servicio +
      "&Fecha=" + fechaCita +
      "&Hora=" + horaCita +
      "&Telefono=" + Tel +
      "&Correo=" + CorreUser, {
        method: "POST",
        body: data,
      })
      .then((res) => res.json())
      .then((result) => {
        Swal.fire({
          icon: 'success',
          title: 'Cita Registrada',
          text: '¡Gracias por preferirnos!',
          didClose: () => {
            localStorage.setItem('mostrarEncuestaSatisfaccion', 'true'); // Guardar señal para mostrar encuesta
            navigate('/'); // Redirige al inicio
          }
        });
      });
  } else {
    console.log('Formulario no válido');
  }
};

  const validateFechaCita = (fechaCita) => {
    const selectedDate = new Date(fechaCita);
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek === 5 || dayOfWeek === 6) {
      setFechaCitaError('No abre los fines de semana eliga otro dia porfavor');
      return false;
    } else {
      setFechaCitaError('');
      return true;
    }
  };

  const validateHoraCita = (horaCita) => {
    const selectedHour = parseInt(horaCita.split(":")[0]);
    if (selectedHour < 9 || selectedHour > 16) {
      setHoraCitaError('Seleccione una hora entre las 9:00 AM y las 4:00 PM.');
      return false;
    } else {
      setHoraCitaError('');
      return true;
    }
  };

  const validateServicio = (servicio) => {
    if (servicio.trim() === '') {
      setServicioError('Seleccione un servicio');
      return false;
    } else {
      setServicioError('');
      return true;
    }
  };

  const horarios = ['09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00'];
  const [horariosDisponibles, setHorariosDisponibles] = useState(horarios);

  const obtenerhorariosFecha = (fecha) => {
    const proData = new FormData();
    proData.append("fecha", fecha);

    fetch(apiurll + "api/CasaDelMarisco/ObtenerDiasInhabiles?fecha=" + fecha, {
      method: 'POST',
      body: proData,
    }).then((res) => res.json())
      .then((result) => {
        console.log(result)
        if (result === "Si hay servicio") {
          fetch(apiurll + "api/CasaDelMarisco/ObtenerHorasDisponibles?fecha=" + fecha, {
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
        }
      });
  };

  const handleFechaCitaChange = (e) => {
    const nuevaFechaCita = e.target.value;
    setFechaCita(nuevaFechaCita);
    obtenerhorariosFecha(nuevaFechaCita);
  };

  const [valorhora, setValorHora] = useState(true);

  return (
    <Layout>
      <div className="registro-form-containerRegistro">
        <div className="registro-image-containerRegistro">
          <img src={imagen} alt="Estética Canina" className="registro-imageRegistro" />
        </div>
        <div className="registro-formRegistro">
          <p className='loginTitulo'>Agendar Cita</p>
          <form onSubmit={handleSubmit} className="formulario">
            <div>
              <label htmlFor="nombre" className="RegistroLabel">Nombre* :</label>
              <input id="nombre" name="nombre" value={nombreUser} readOnly />
            </div>
            <div>
              <label htmlFor="apellidoP" className="RegistroLabel">Apellido Paterno* :</label>
              <input id="apellidoP" name="apellidoP" value={ApellidoPa} readOnly />
            </div>
            <div>
              <label htmlFor="apellidoM" className="RegistroLabel">Apellido Materno* :</label>
              <input id="apellidoM" name="apellidoM" value={ApellidoMa} readOnly />
            </div>
            <div>
              <label htmlFor="email" className="RegistroLabel">Correo* :</label>
              <input id="email" name="email" value={CorreUser} readOnly />
            </div>
            <div>
              <label htmlFor="telefono" className="RegistroLabel">Teléfono* :</label>
              <input type="tel" id="telefono" name="telefono" value={Tel} readOnly />
            </div>
            <div>
              <label htmlFor="fechaCita" className="RegistroLabel">Fecha de Cita* :</label>
              <input
                type="date"
                id="fechaCita"
                name="fechaCita"
                value={fechaCita}
                onChange={handleFechaCitaChange}
                onBlur={() => validateFechaCita(fechaCita)}
                className={fechaCitaError ? 'input-error' : ''}
                required
              />
              {fechaCitaError && <p className="error-message">{fechaCitaError}</p>}
            </div>
            <div className="horario-container">
              <button
                className="btn"
                onClick={() => setValorHora(false)}
                style={{ marginRight: '10px' }}
              >
                Ver Horarios
              </button>
            </div>
            <div>
              <label htmlFor="horaCita" className="RegistroLabel">Hora de Cita* :</label>
              <select
                id="horaCita"
                name="horaCita"
                disabled={valorhora}
                value={horaCita}
                onChange={(e) => setHoraCita(e.target.value)}
                onBlur={() => validateHoraCita(horaCita)}
                className={horaCitaError ? 'input-error' : ''}
              >
                <option value="">Seleccionar horario</option>
                {horariosDisponibles.map((horario, index) => (
                  <option
                    key={index}
                    value={horario.hora}
                    disabled={horario.ocupada}
                    style={{
                      backgroundColor: horario.ocupada ? 'lightgray' : 'white',
                      color: horario.ocupada ? 'gray' : 'black'
                    }}
                  >
                    {horario.hora} {horario.ocupada && "(Ocupada)"}
                  </option>
                ))}
              </select>
              {horaCitaError && <p className="error-message">{horaCitaError}</p>}
            </div>
            <div>
              <label htmlFor="servicio" className="RegistroLabel">Servicio* :</label>
              <select
                id="servicio"
                name="servicio"
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
              >
                <option value="">Selecciona un servicio</option>
                {dataServicio.map(servicio1 => (
                  <option key={servicio1.idServicio} value={servicio1.idServicio}>
                    {servicio1.nombre}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn text2" type="submit">
              Agendar Cita
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AgendarCita;
