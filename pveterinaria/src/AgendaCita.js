import React, { useState, useEffect } from 'react';
import './css/agendarCitas.css';
import imagen from './img/imagen1.jpg';
import { useUser } from './UserContext';
import Swal from 'sweetalert2';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const AgendarCita = () => {
  const navigate = useNavigate();
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
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
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
      } else {
        console.error('Error al obtener datos de los servicios:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener datos del servicio:', error);
    }
  };

  const id = obtenerIdUsuario(user);
  const nombreUser = obtenerNombre(user);
  const ApellidoPa = obtenerApellido(user);
  const Tel = obtenerTelefono(user);
  const CorreUser = obtenerCorreo(user);
  const ApellidoMa = obtenerApellidoM(user);

  const [disbaleHora,setdisableHora]=useState(true)

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
              navigate('/');
            }
          });
        });
    } else {
      console.log('Formulario no válido');
    }
  };

  const validateFechaCita = (fechaCita) => {
    const selectedDate = new Date(fechaCita);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 para comparar solo la fecha
    selectedDate.setHours(24); // Mantener esta línea para validar si la fecha es hoy

    if (selectedDate < today) {
      setFechaCitaError('No puedes agendar una cita en una fecha pasada.');
      setHoraCita(''); 
      return false;
    } else if (selectedDate.getDay() === 5 || selectedDate.getDay() === 6) {
      setFechaCitaError('No abrimos los fines de semana. Elige otro día por favor.');

      return false;
    } else {
      setFechaCitaError('');
      return true;
    }
  };

  const validateHoraCita = (horaCita1) => {
    if (!horaCita1) {
        setHoraCitaError('Por favor, selecciona una hora.');
        return false;
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0, por eso sumamos 1
    const day = String(now.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const currentTime = `${hours}:${minutes}:${seconds}`;
    console.log("Hora actual:", currentTime);
    console.log('hora seleccionada: ',  horaCita1)
    // Convertir horas en minutos del día
    const [currentHour, currentMinute, currentSecond] = currentTime.split(":").map(Number);
    const [selectedHour, selectedMinute, selectedSecond] = horaCita1.split(":").map(Number);

    const currentTotalSeconds = currentHour * 3600 + currentMinute * 60 + currentSecond;
    const selectedTotalSeconds = selectedHour * 3600 + selectedMinute * 60 + selectedSecond;

    
    console.log("fehca que yo seleccione: ",fechaCita)
    console.log("Fecha de hoy:", formattedDate);

    if (fechaCita === formattedDate) {
      if (selectedTotalSeconds <= currentTotalSeconds) {
          console.log('No puedes agendar una cita para una hora que ya ha pasado.');
          setHoraCitaError('No puedes agendar una cita para una hora que ya ha pasado.');
          return false;
      } else {
          console.log('Hora válida para agendar la cita.');
          setHoraCitaError('');
          return true;
      }
    }else{
      setHoraCitaError('');
          return true;
    }
};


  const validateServicio = (servicio) => {
    if (servicio.trim() === '') {
      setServicioError('Selecciona un servicio');
      return false;
    } else {
      setServicioError('');
      return true;
    }
  };

  const handleFechaCitaChange = (e) => {
    const nuevaFechaCita = e.target.value;
    setFechaCita(nuevaFechaCita);
    const exito= validateFechaCita(nuevaFechaCita)
    if(exito===true){
      setdisableHora(false)
      obtenerhorariosFecha(nuevaFechaCita)
    }else{
      setdisableHora(true)
    }

};

  const horarios = ['09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00'];

  const obtenerhorariosFecha = (fecha) => {
    const proData = new FormData();
    proData.append("fecha", fecha);

    fetch(apiurll + "api/CasaDelMarisco/ObtenerDiasInhabiles?fecha=" + fecha, {
      method: 'POST',
      body: proData,
    }).then((res) => res.json())
      .then((result) => {
        if (result === "Si hay servicio") {
          fetch(apiurll + "api/CasaDelMarisco/ObtenerHorasDisponibles?fecha=" + fecha, {
            method: 'POST',
            body: proData,
          }).then((res) => res.json())
            .then((result) => {
              const now = new Date();
              const isToday = new Date(fecha).toDateString() === now.toDateString();
              
              const horariosConEstadoActualizado = horarios.map(horario => {
                const [hour, minutes] = horario.split(":").map(Number);
                const horarioTime = new Date(fecha);
                horarioTime.setHours(hour, minutes, 0, 0);

                // Determinar si el horario debe estar deshabilitado si es hoy y la hora ya pasó
                const ocupada = result.includes(horario) || (isToday && horarioTime <= now);
                
                return { hora: horario, ocupada };
              });

              setHorariosDisponibles(horariosConEstadoActualizado);
            });
        }
      });
  };

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
                className={fechaCitaError ? 'input-error' : ''}
                required
              />
              {fechaCitaError && <p className="error-message">{fechaCitaError}</p>}
            </div>
            <div>
              <label htmlFor="horaCita" className="RegistroLabel">Hora de Cita* :</label>
              <select
                id="horaCita"
                name="horaCita"
                disabled={disbaleHora}
                value={horaCita}
                onChange={(e) => {
                  setHoraCita(e.target.value);
                  validateHoraCita(e.target.value);
              }}
                className={horaCitaError ? 'input-error' : ''}
                required
              >
                <option value="">Seleccionar horario</option>
                {horariosDisponibles.map((horario, index) => (
                  <option key={index} value={horario.hora} disabled={horario.ocupada}>
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
                required
              >
                <option value="">Selecciona un servicio</option>
                {dataServicio.map(servicio1 => (
                  <option key={servicio1.idServicio} value={servicio1.idServicio}>
                    {servicio1.nombre}
                  </option>
                ))}
              </select>
              {servicioError && <p className="error-message">{servicioError}</p>}
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
