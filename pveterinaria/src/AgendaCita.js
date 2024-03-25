import React, { useState,useEffect } from 'react';
import './css/registro.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import imagen from './img/imagen1.jpg'; // Ruta de la imagen que deseas utilizar
import { useUser } from './UserContext';
import Swal from 'sweetalert2';
const AgendarCita = () => {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const navigate = useNavigate();

  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [servicio, setServicio] = useState('');
  const [categoria, setCategoria] = useState(''); // Agregamos estado para la categoría
  const [fechaCitaError, setFechaCitaError] = useState('');
  const [horaCitaError, setHoraCitaError] = useState('');
  const [servicioError, setServicioError] = useState('');
  const [horariosDisponibles, setHorariosDisponibles] = useState([]); // Agregamos la definición de estado para los horarios disponibles

  
  const { user,logoutUser } = useUser();

  const obtenerIdUsuario = (user) => {
    return user && user.idUsuario ? user.idUsuario : null;
  };
  const obtenerNombre = (user) => {
    return user && user.Nombre ? user.Nombre : null;
  };
  const obtenerApellido = (user) => {
    return user && user.ApellidoPaterno ? user.ApellidoPaterno : null;
  };
  const obtenerApellidoM = (user) => {
    return user && user.ApellidoMaterno ? user.ApellidoMaterno : null;
  };
  const obtenerCorreo = (user) => {
    return user && user.Correo ? user.Correo : null;
  };
  const obtenerTelefono = (user) => {
    return user && user.Telefono ? user.Telefono : null;
  };
  

  const id = obtenerIdUsuario(user);
  const nombreUser = obtenerNombre(user);
  const ApellidoPa= obtenerApellido(user);
  const Tel= obtenerTelefono(user)
  const CorreUser=obtenerCorreo(user)
  const ApellidoMa=obtenerApellidoM(user)
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
     
      validateFechaCita(fechaCita) &&
      validateHoraCita(horaCita) &&
      validateServicio(servicio)
    ) {
      const horaCita1='12:09'
      const data = new FormData();
        data.append("usuario_id", id);
        data.append("servicio_id", servicio);
        data.append("Fecha", fechaCita);
        data.append("Telefono", Tel);
        data.append("Correo", CorreUser);
        data.append("Hora", horaCita);

        fetch(
          apiurll+"api/CasaDelMarisco/AgregarCita?usuario_id=" +
          id +
          "&servicio_id=" +
          servicio +
          "&Fecha=" +
          fechaCita +
          "&Telefono=" +
            Tel +
          "&Correo=" +
          CorreUser +
          "&Hora=" +
          horaCita,
          {
            method: "POST",
            body: data,
          }
        )
          .then((res) => res.json())
          .then((result) => {
            Swal.fire({
              icon: 'success',
              title: 'Cita Registrada',
              text: '¡Gracias por preferirnos!',
              didClose: () => {
                window.location.href = './'; // Redireccionar al home después de cerrar el SweetAlert
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
      setFechaCitaError('La estética no abre los fines de semana, por favor seleccione un día hábil.');
      return false;
    } else {
      setFechaCitaError('');
      return true;
    }
  };

  const validateHoraCita = (horaCita) => {
    const selectedHour = parseInt(horaCita.split(":")[0]);
    if (selectedHour < 9 || selectedHour > 15) {
      setHoraCitaError('Seleccione una hora para la cita entre las 9:00 AM y las 3:00 PM.');
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

  useEffect(() => {
    if (fechaCita !== '') {
      obtenerHorariosDisponibles(fechaCita);
    }
  }, [fechaCita]);

  const obtenerHorariosDisponibles = async (fechaCita) => {
    // Aquí puedes hacer una llamada a la API para obtener los horarios disponibles para la fecha seleccionada
    // Por ahora, solo generamos algunos horarios de ejemplo para demostración
    const horarios = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
    setHorariosDisponibles(horarios);
  };


  return (
    <div className="registro-form-containerRegistro">
      <div className="registro-image-containerRegistro">
        <img src={imagen} alt="Estética Canina" className="registro-imageRegistro" />
      </div>
      <div className="registro-formRegistro">
        <p className='loginTitulo'>Agendar Cita</p>
        <form onSubmit={handleSubmit} className='formulario'>
          <div>
            <label htmlFor="nombre" className='RegistroLabel'>Nombre* :</label>
            <input
              id="nombre"
              name="nombre"
              value={nombreUser}
              
            />
           
          </div>
          <div>
            <label htmlFor="apellidoP" className='RegistroLabel'>Apellido Paterno* :</label>
            <input
              id="apellidoP"
              name="apellidoP"
              value={ApellidoPa}
             
            />

          </div>
          <div>
            <label htmlFor="apellidoM" className='RegistroLabel'>Apellido Materno* :</label>
            <input
              id="apellidoM"
              name="apellidoM"
              value={ApellidoMa}
             
            />
            
          </div>
          <div>
            <label htmlFor="email" className='RegistroLabel'>Correo* :</label>
            <input
              id="email"
              name="email"
              value={CorreUser}
             
            />
           
          </div>
          <div>
            <label htmlFor="telefono" className='RegistroLabel'>Teléfono* :</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={Tel}
             
            />
           
          </div>
          <div>
            <label htmlFor="fechaCita" className='RegistroLabel'>Fecha de Cita* :</label>
            <input
              type="date"
              id="fechaCita"
              name="fechaCita"
              value={fechaCita}
              onChange={(e) => setFechaCita(e.target.value)}
              onBlur={() => validateFechaCita(fechaCita)}
              className={fechaCitaError ? 'input-error' : ''}
              required
            />
            {fechaCitaError && <p className="error-message">{fechaCitaError}</p>}
          </div>
          <div>
            <label htmlFor="horaCita" className='RegistroLabel'>Hora de Cita* :</label>
            <select
              id="horaCita"
              name="horaCita"
              value={horaCita}
              onChange={(e) => setHoraCita(e.target.value)}
              onBlur={() => validateHoraCita(horaCita)}
              className={horaCitaError ? 'input-error' : ''}
              required
            >
              <option value="">Seleccionar horario</option>
              {horariosDisponibles.map((horario, index) => (
                <option key={index} value={horario}>{horario}</option>
              ))}
            </select>
            {horaCitaError && <p className="error-message">{horaCitaError}</p>}
          </div>

          <div>
            <label htmlFor="servicio" className='RegistroLabel'>Servicio* :</label>
            <input
              type="text"
              id="servicio"
              name="servicio"
              value={servicio}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="categoria" className='RegistroLabel'>Categoría:</label>
            <input
              type="text"
              id="categoria"
              name="categoria"
              value={categoria}
              readOnly
            />
          </div>



          <button className='btn btn-warning text2' type="submit">Agendar Cita</button>
        </form>
      </div>
    </div>
  );
};

export default AgendarCita;
