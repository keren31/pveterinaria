import React, { useState ,useEffect} from 'react';
import './calendar.css';
import AdminLayout from './AdminLayout';
import Swal from 'sweetalert2'
import { Typography } from '@material-tailwind/react';

const AdminEditCita = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fecha, setFecha]=useState()
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [showSpecificTimeInput, setShowSpecificTimeInput] = useState(false);
  const [showRangeTimeInput, setShowRangeTimeInput] = useState(false);
  const [startHour, setStartHour] = useState('');
  const [startHour2, setStartHour2] = useState('');
  const [endHour, setEndHour] = useState('');

   const handleDateChange = date => {
    setSelectedDate(date);
    setShowTimeInput(true);
  };

  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setFecha(formattedDate);
  }, [selectedDate]);

  useEffect(() => {
    console.log(fecha);
  }, [fecha]);



  const handleSpecificTimeClick = () => {
    setShowSpecificTimeInput(true);
    setShowRangeTimeInput(false);
    
  };

  const handleRangeTimeClick = () => {
    setShowSpecificTimeInput(false);
    setShowRangeTimeInput(true);
  };

  const handleTimeSubmit = () => {

    let hora;
    if(showSpecificTimeInput){
      hora=startHour2
      setStartHour('')
      setEndHour('')
    }else{
      hora=startHour + '-' + endHour;
      setStartHour2('')
    }

    const data = new FormData()
    data.append("Fecha",fecha);
    data.append("Hora",hora);
    fetch (
      apiurll + "api/CasaDelMarisco/AgregarDiaInhabil?Fecha=" + fecha + '&Hora=' + hora,
      {
        method: 'POST',
        body: data,
      }
    ).then((res) => res.json())
    .then((result) => {
      if (result === "Agregado!!") {
        Swal.fire({
          icon: "success",
          title: "Se realizo con exito",
        });
      }
    });
  };



  const getDayOfWeekText = date => {
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  };

  const getMonthText = date => {
    if (date) {
      const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      const monthIndex = date.getMonth();
      return months[monthIndex];
    } else {
      return '';
    }
  };

  const getDaysOfMonth = date => {
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDayOfWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
    const previousMonthDays = Array.from({ length: firstDayOfWeek }, () => '');

    return [...previousMonthDays, ...days];
  };

  return (
    <AdminLayout>
      <div className="container">
      <Typography variant="h1" color="blue-gray" size="xl" >
              Actualiza horarios de trabajo 
            </Typography>
        <div className="calendario-container">
          <div className="calendario">
            <div className="calendario-header">
              <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>{'<'}</button>
              <span>{getMonthText(selectedDate)} {selectedDate.getFullYear()}</span>
              <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>{'>'}</button>
            </div>
            <div className="calendario-days">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                <div key={day} className="calendario-day">{day}</div>
              ))}
            </div>
            <div className="calendario-dates">
              {getDaysOfMonth(selectedDate).map((day, index) => (
                <div
                  key={index}
                  className={`calendario-date${selectedDate && selectedDate.getDate() === day ? ' selected' : ''}`}
                  onClick={() => handleDateChange(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>
        {selectedDate && showTimeInput && (
          <div className="time-container">
            <br/>
            <p>Has seleccionado la fecha: {getDayOfWeekText(selectedDate)}, {selectedDate.getDate()} de {getMonthText(selectedDate)} de {selectedDate.getFullYear()}</p>
            <br/>
            <div className="time-selection-container">
              <div>
                <button onClick={handleSpecificTimeClick}>Seleccionar horas específicas</button>
                <button onClick={handleRangeTimeClick}>Seleccionar rango de horas</button>
              </div>
              {showSpecificTimeInput && (
                <div>
                  <label>Selecciona una hora:</label>
                  
                  <select value={startHour2} onChange={(e) => setStartHour2(e.target.value)}>
                    <option value="">Selecciona una hora</option>
                    <option value="09:00:00-09:59:00">09:00 am</option>
                    <option value="10:00:00-10:59:00">10:00 am</option>
                    <option value="11:00:00-11:59:00">11:00 am</option>
                    <option value="12:00:00-12:59:00">12:00 pm</option>
                    <option value="13:00:00-13:59:00">13:00 pm</option>
                    <option value="14:00:00-14:59:00">14:00 pm</option>
                    <option value="15:00:00-15:59:00">15:00 pm</option>
                    <option value="16:00:00-16:59:00">16:00 pm</option>
                  </select>
                  <button onClick={handleTimeSubmit}>Guardar hora</button>
                </div>
              )}
              {showRangeTimeInput && (
                <div>
                  <br/>
                  <label>Hora de inicio:</label>
                  <br/>
                  <select value={startHour} onChange={(e) => setStartHour(e.target.value)}>
                    <option value="">Selecciona una hora</option>
                    <option value="09:00:00">09:00 am</option>
                    <option value="10:00:00">10:00 am</option>
                    <option value="11:00:00">11:00 am</option>
                    <option value="12:00:00">12:00 pm</option>
                    <option value="13:00:00">13:00 pm</option>
                    <option value="14:00:00">14:00 pm</option>
                    <option value="15:00:00">15:00 pm</option>
                    <option value="16:00:00">16:00 pm</option>
                    
                  </select>
                  <br/>
                  <label>Hora de fin:</label>
                  <br/>
                  <select value={endHour} onChange={(e) => setEndHour(e.target.value)}>
                    <option value="">Selecciona una hora</option>
                    <option value="10:00:00">10:00 am</option>
                    <option value="11:00:00">11:00 am</option>
                    <option value="12:00:00">12:00 pm</option>
                    <option value="13:00:00">13:00 pm</option>
                    <option value="14:00:00">14:00 pm</option>
                    <option value="15:00:00">15:00 pm</option>
                    <option value="16:00:00">16:00 pm</option>

                  </select>
                  <button onClick={handleTimeSubmit}>Guardar rango de horas</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminEditCita;
