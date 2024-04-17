import React from "react";
import PerfilLayout from "./PerfilLayout";
import { useState ,useEffect} from "react";
import Layout from "../Layout";
import { ChevronDownIcon, HomeIcon } from '@heroicons/react/20/solid';
import { useLocation } from "react-router-dom";
import { setId } from "@material-tailwind/react/components/Tabs/TabsContext";
import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function EditarCita(){
    const location=useLocation();
    const idCita = location.state ? location.state.IdCita : null;

    useEffect(() => {
        traerDatosCita();
       obtenerDatosServicios();
    }, [])


    const [fechaCita, setFechaCita] = useState('');
  const [horaCita, setHoraCita] = useState('');
  const [servicio, setServicio] = useState('');
  const [fechaCitaError, setFechaCitaError] = useState('');
  const [horaCitaError, setHoraCitaError] = useState('');
  const [servicioError, setServicioError] = useState('');

  const horarios = ['09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00'];
  const [horariosDisponibles, setHorariosDisponibles] = useState(horarios);
  const [valorhora,setValorHora]=useState(true)

    const [idServicio,setIdServicio]=useState();
    const [fecha,setFecha]=useState();
    const [hora,setHora]=useState();
    const [telefono,setTelefono]=useState();
    const [dataServicio,setDataServicio]=useState([]);

    const obtenerDatosServicios = async () => {
        try {
          const response = await fetch(
            apiurll+'api/CasaDelMarisco/ObtenerServiciosCAN',
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

    
    const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
    const traerDatosCita=()=>{
        

    const proData=new FormData();
    proData.append("idCita",idCita);

    fetch(
        apiurll+"api/CasaDelMarisco/TraerCitaPorID?idCita=" + idCita,
        {
            method: 'POST',
            body: proData,
        }
    ) .then((res) => res.json())
    .then((result) => {
       setServicio(result.servicio_id)
        setFechaCita(result.fecha.split('T')[0])
        setHoraCita(result.Hora)
        setTelefono(result.Telefono)
    })
    .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
       
    })
  
    } 

    const pasarServicio=()=>{
        if(idServicio===1){
            setServicio('Corte de pelo')
        }
    }
      
        const tipoServicio = () => {
            if (idServicio === 1) {
                return 'Corte de pelo';
            } else if (idServicio === 2) {
                return 'Baño de Perros';
            } else if (idServicio === 3) {
                return 'Corte de Uñas';
            } else if (idServicio === 4) {
                return 'Limpieza Dental';
            } else {
                return 'Tipo de servicio desconocido';
            }
        }
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

      const handleFechaCitaChange = (e) => {
        const nuevaFechaCita = e.target.value;
        setFechaCita(nuevaFechaCita);
       
        obtenerhorariosFecha(nuevaFechaCita);
       
      };
      
      
    
      const obtenerhorariosFecha = (fecha) => {
        const proData = new FormData();
        proData.append("fecha", fecha);
    
        fetch(apiurll+"api/CasaDelMarisco/ObtenerDiasInhabiles?fecha=" + fecha, {
            method: 'POST',
            body: proData,
        }).then((res) => res.json())
        .then((result) => {
            console.log(result);
            if (result === "Si hay servicio") {
                // No hay servicio, usar horarios por defecto
                setHorariosDisponibles(horarios.map(horario => ({ hora: horario, ocupada: false })));
            } else {
                const horariosOcupados = result; // Suponiendo que result contiene los horarios ocupados
                const horariosDisponiblesConEstado = horarios.map(horario => ({ hora: horario, ocupada: false }));
    
                // Marcar los horarios ocupados
                horariosOcupados.forEach(horarioOcupado => {
                    const [horaInicioOcupada, horaFinOcupada] = horarioOcupado.split('-'); // Dividimos la cadena en horaInicio y horaFin
                    horariosDisponiblesConEstado.forEach(horario => {
                        if (horario.hora >= horaInicioOcupada && horario.hora <= horaFinOcupada) {
                            horario.ocupada = true;
                        }
                    });
                });
    
                // Realizar la segunda llamada a la API después de marcar los horarios ocupados
                fetch(apiurll+"api/CasaDelMarisco/ObtenerHorasDisponibles?fecha=" + fecha, {
                    method: 'POST',
                    body: proData,
                }).then((res) => res.json())
                .then((result) => {
                    if (result === "No hay horas") {
                        // No hay horas disponibles, usar el primer marcado
                        setHorariosDisponibles(horariosDisponiblesConEstado);
                    } else {
                        const horariosOcupados2 = result; // Suponiendo que result contiene los horarios ocupados
    
                        // Filtrar los horarios ocupados del segundo conjunto de horarios
                        const horariosDisponibles2 = horariosDisponiblesConEstado.map(horario => {
                            if (horario.ocupada && horariosOcupados2.includes(horario.hora)) {
                                return { hora: horario.hora, ocupada: true };
                            } else {
                                return { hora: horario.hora, ocupada: false };
                            }
                        });
    
                        // Usar el segundo conjunto de horarios con el marcado
                        setHorariosDisponibles(horariosDisponibles2);
                    }
                });
            }
        });
    }
    
    
    const enviarDatosActualizados =()=>{
        const data= new FormData();
        data.append("idCita",idCita);
        data.append("servicio_id", servicio);
        data.append("Fecha",fechaCita);
        data.append("Hora",horaCita);
        data.append("Telefono",telefono);

        fetch (
            apiurll+"api/CasaDelMarisco/EditarCita?idCita=" + idCita +"&servicio_id="+ servicio + "&Fecha=" + fechaCita + "&Hora=" + horaCita + "&Telefono=" +telefono,
            {
                method: "POST",
                body:data,
            }
        ).then((res)=> res.json())
        .then((result)=>{
            if(result==="Cita a sido editada exitosamente!!"){
                Swal.fire({
                    icon: 'success',
                    title: 'Cita Actualiza',
                    text: '¡Gracias por preferirnos!',
                    
                });
            }else{
                Swal.fire({
                    icon: 'success',
                    title: 'Solicitud no realizada',
                    text: '¡Gracias por preferirnos!',
                  
                });
            }
        })

    }


    return(
        <Layout>
        <PerfilLayout>
            <div className="isolate bg-white px-6 py-24 lg:px-8" style={{marginLeft:'20%', marginTop:'3%'}}>
        <div
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
        >
            <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
                clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            />
        </div>
        <div className="mx-auto max-w-2xl text-center items-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Editar Cita</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
            Por favor ingrese los datos a editar, gracias por su compresion
            </p>
        </div>
        <form className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
                <label htmlFor="first-name" className="block font-semibold leading-6 text-gray-900">
                Tipo De Servicio
                </label>
                <div className="mt-2.5">
                    <select
                    value={servicio}
                    onChange={(e) => setServicio(e.target.value)}
                    className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        <option value="">Selecciona un servicio</option>
                        {dataServicio.map(servicio1 => (
                        <option key={servicio1.idServicio} value={servicio1.idServicio}>
                            {servicio1.nombre}
                        </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <label htmlFor="last-name" className="block font-semibold leading-6 text-gray-900">
                fecha
                </label>
                <div className=" flex ">
                <input
                    type="date"
                    value={fechaCita}
                    onChange={handleFechaCitaChange}
                    onBlur={() => validateFechaCita(fechaCita)}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 <Button color='blue' className='text-xl ml-3' onClick={()=> setValorHora(false)}>Ver horaio</Button>
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
            <option
                key={index}
                value={horario.hora}
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

            <div className="sm:col-span-2">
                <label htmlFor="email" className="block font-semibold leading-6 text-gray-900">
                Telefono
                </label>
                <div className="mt-2.5">
                <input
                    value={telefono}
                    type="number"
                    

                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
            </div>
          
            
            </div>
                <div className="mt-10">
                <Button
                    
                    color="orange"
                    className="mt-4 text-xl"
                    onClick={()=> enviarDatosActualizados()}
                >
                    Actualizar Cita
                </Button>
                </div>
          
        </form>
            </div>
        </PerfilLayout>
        </Layout>
    );
}