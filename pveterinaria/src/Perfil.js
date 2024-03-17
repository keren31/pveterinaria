import React from 'react';
import { useUser } from './UserContext'; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './css/Perfil.css'; // Asegúrate de ajustar la ruta según tu estructura de archivos

const Perfil = () => {
  const navigate = useNavigate();
  const { user, logoutUser } = useUser();
  
  const cerrarSesion = () => {
    logoutUser();
    navigate('/');
    Swal.fire({
      icon: 'warning',
      title: 'Nos vemos pronto',
      text: 'Cerraste sesión, nos vemos Regresa cuando quieras embellecer a tu mejor amigo',
    });
  };

  return (
    <div className="card" style={{marginTop:'50px'}}>
      <div className="profile-info">
        <div>
          {/* Si tienes una imagen de perfil, puedes agregarla aquí */}
        </div>
        <div className="profile-details">
          <h4>Perfil de Usuario</h4>
          <h4 className="subtitle">Correo: {user ? user.Correo : 'Correo del Usuario'}</h4>
          <h4 className="subtitle">Teléfono: {user ? user.Telefono : 'Telefono del Usuario'}</h4>
          <h4 className="subtitle">Estado de la cuenta: {user ? user.Rol : 'Estado de la cuenta del Usuario'}</h4>
        </div>
      </div>
      <div className="options">
        <h4>Opciones</h4>
        <ul>
          <li>
            {/* Aquí puedes agregar más elementos de la lista según sea necesario */}
            <button>Cambiar Contraseña</button>
          </li>
        </ul>
        <button className="edit-profile-button" onClick={cerrarSesion}>
          Editar Perfil
        </button>
        <button className="logout-button" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Perfil;
