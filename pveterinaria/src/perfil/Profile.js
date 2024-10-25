import React from 'react';
import { useUser } from '../UserContext'; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Layout from '../Layout';
import PerfilLayout from '../perfil/PerfilLayout';

const Perfil = () => {
  const navigate = useNavigate(); 
  const { user, logoutUser } = useUser();
  
  const cerrarSesion = () => {
    logoutUser();
    navigate('/');
    Swal.fire({
      icon: 'warning',
      title: 'Nos vemos pronto',
      text: 'Cerraste sesión, nos vemos. Regresa cuando quieras embellecer a tu mejor amigo.',
    });
  };

  return (
    <Layout>
      <PerfilLayout>
        <div className="card" style={{ marginTop: '50px', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', maxWidth: '600px', margin: '50px auto' }}>
          <div className="profile-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
            <div style={{ width: '100%', maxWidth: '150px' }}>
              {/* Si tienes una imagen de perfil, puedes agregarla aquí */}
              <img
                src={user?.Icono || 'https://via.placeholder.com/150'}
                alt="Imagen de perfil"
                style={{ width: '100%', borderRadius: '50%', objectFit: 'cover' }}
              />
            </div>
            <div className="profile-details" style={{ width: '100%' }}>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Perfil de Usuario</h4>
              <h4 className="subtitle" style={{ fontSize: '1rem', marginBottom: '5px' }}>Correo: {user ? user.Correo : 'Correo del Usuario'}</h4>
              <h4 className="subtitle" style={{ fontSize: '1rem', marginBottom: '5px' }}>Teléfono: {user ? user.Telefono : 'Teléfono del Usuario'}</h4>
              <h4 className="subtitle" style={{ fontSize: '1rem', marginBottom: '5px' }}>Estado de la cuenta: {user ? user.Rol : 'Estado de la cuenta del Usuario'}</h4>
            </div>
          </div>
          <div className="options" style={{ marginTop: '20px' }}>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center' }}>Opciones</h4>
            <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center', margin: '20px 0' }}>
              <li style={{ marginBottom: '10px' }}>
                <button
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '1rem',
                    borderRadius: '5px',
                    backgroundColor: '#0a5cb8',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Cambiar Contraseña
                </button>
              </li>
            </ul>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                className="edit-profile-button"
                onClick={cerrarSesion}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '1rem',
                  borderRadius: '5px',
                  backgroundColor: '#0a5cb8',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Editar Perfil
              </button>
              <button
                className="logout-button"
                onClick={cerrarSesion}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '1rem',
                  borderRadius: '5px',
                  backgroundColor: '#ff0000',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </PerfilLayout>
    </Layout>
  );
};

export default Perfil;
