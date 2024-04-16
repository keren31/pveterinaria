import React, { useState } from 'react';
import './calendar.css';
import AdminLayout from './AdminLayout';

const AdminEditCita = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [showSpecificTimeInput, setShowSpecificTimeInput] = useState(false);
  const [showRangeTimeInput, setShowRangeTimeInput] = useState(false);
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');

  const handleDateChange = date => {
    setSelectedDate(date);
    setShowTimeInput(true);
    console.log('Fecha seleccionada:', date);
  };

  const handleSpecificTimeClick = () => {
    setShowSpecificTimeInput(true);
    setShowRangeTimeInput(false);
  };

  const handleRangeTimeClick = () => {
    setShowSpecificTimeInput(false);
    setShowRangeTimeInput(true);
  };

  const handleTimeSubmit = () => {
    console.log('Hora de inicio:', startHour);
    console.log('Hora de fin:', endHour);
  };

  const generateHoursOptions = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const hour = `${i < 10 ? '0' : ''}${i}:00`;
      hours.push(hour);
    }
    return hours.map((hour, index) => (
      <option key={index} value={hour}>{hour}</option>
    ));
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
    const previousMonthDays = Array.from({ length: firstDayOfWeek }, (_, index) => '');

    return [...previousMonthDays, ...days];
  };

  return (
    <AdminLayout>
      <div className="container">
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
            <p>Has seleccionado la fecha: {getDayOfWeekText(selectedDate)}, {selectedDate.getDate()} de {getMonthText(selectedDate)} de {selectedDate.getFullYear()}</p>
            <div className="time-selection-container">
              <div>
                <button onClick={handleSpecificTimeClick}>Seleccionar horas específicas</button>
                <button onClick={handleRangeTimeClick}>Seleccionar rango de horas</button>
              </div>
              {showSpecificTimeInput && (
                <div>
                  <label>Selecciona una hora:</label>
                  <select value={startHour} onChange={(e) => setStartHour(e.target.value)}>
                    <option value="">Selecciona una hora</option>
                    {generateHoursOptions()}
                  </select>
                  <button onClick={handleTimeSubmit}>Guardar hora</button>
                </div>
              )}
              {showRangeTimeInput && (
                <div>
                  <label>Hora de inicio:</label>
                  <select value={startHour} onChange={(e) => setStartHour(e.target.value)}>
                    <option value="">Selecciona una hora</option>
                    {generateHoursOptions()}
                  </select>
                  <label>Hora de fin:</label>
                  <select value={endHour} onChange={(e) => setEndHour(e.target.value)}>
                    <option value="">Selecciona una hora</option>
                    {generateHoursOptions()}
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
