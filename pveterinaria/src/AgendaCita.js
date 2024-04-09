import React, { useState,useEffect } from 'react';
import './css/registro.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import imagen from './img/imagen1.jpg'; // Ruta de la imagen que deseas utilizar
import { useUser } from './UserContext';
import Swal from 'sweetalert2';
import Layout from './Layout';
const AgendarCita = () => {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const navigate = useNavigate();

  useEffect(() => {
    obtenerDatosServicios();
  }, [])

  const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [servicio, setServicio] = useState('');
  const [fechaCitaError, setFechaCitaError] = useState('');
  const [horaCitaError, setHoraCitaError] = useState('');
  const [servicioError, setServicioError] = useState('');
  // Agregamos la definición de estado para los horarios disponibles
  const [dataServicio,setDataServicio]=useState([]);
 

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
  
  const obtenerDatosServicios = async () => {
    try {
      const response = await fetch(
        'http://localhost:5029/api/CasaDelMarisco/ObtenerServiciosCAN',
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
  }
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
         "http://localhost:5029/api/CasaDelMarisco/AgregarCita?usuario_id=" +
          id +
          "&servicio_id=" +
          servicio +
          "&Fecha=" +
          fechaCita +
          "&Hora=" +
          horaCita +
          "&Telefono=" +
            Tel +
          "&Correo=" +
          CorreUser,
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

 

    // Aquí puedes hacer una llamada a la API para obtener los horarios disponibles para la fecha seleccionada
    // Por ahora, solo generamos algunos horarios de ejemplo para demostración
    const horarios = ['09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00'];
    const [horariosDisponibles, setHorariosDisponibles] = useState(horarios);

    console.log(horaCita)
  const obtenerhorariosFecha=(fecha)=>{
    
    const proData=new FormData();
        proData.append("fecha",fecha);

        fetch(
            "http://localhost:5029/api/CasaDelMarisco/ObtenerHorasDisponibles?fecha=" + fecha,
            {
                method: 'POST',
                body: proData,
            }
        ) .then((res) => res.json())
        .then((result) => {
          if(result==="No hay horas"){
            setHorariosDisponibles(horarios);
            console.log('jjaja pendejo');
          }else{
            const horariosOcupados = result; // Suponiendo que result contiene los horarios ocupados
            const horariosDisponibles = horarios.filter(horario => !horariosOcupados.includes(horario));
            console.log(horariosDisponibles + 'disponibles');
            console.log(horariosOcupados +'ocupados')
            setHorariosDisponibles(horariosDisponibles);
          } 
        })
      
     
  }

  const handleFechaCitaChange = (e) => {
    const nuevaFechaCita = e.target.value;
    setFechaCita(nuevaFechaCita);
   
      obtenerhorariosFecha(nuevaFechaCita);
   
  };

  const [valorhora,setValorHora]=useState(true)


  return (
    <Layout><div className="registro-form-containerRegistro">
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
            <div className='flex'>
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
              <button className='btn btn-warning ml-3' onClick={()=> setValorHora(false)}>Ver horaio</button>
            </div>
        </div>
        <div>
          <label htmlFor="horaCita" className='RegistroLabel'>Hora de Cita* :</label>
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
              <option key={index} value={horario}>{horario}</option>
            ))}
          </select>
          {horaCitaError && <p className="error-message">{horaCitaError}</p>}
        </div>

        <div>
          <label htmlFor="servicio" className='RegistroLabel'>Servicio* :</label>
          <select
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

        <button className='btn btn-warning text2' type="submit">Agendar Cita</button>
      </form>
    </div>
  </div>
  </Layout>
  );
};

export default AgendarCita;
