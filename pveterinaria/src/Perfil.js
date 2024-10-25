import React from 'react';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Layout from './Layout';
import PerfilLayout from './perfil/PerfilLayout';

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
                <div style={{
                  
                   
                    padding: '50px',
                    width: '600px',
                    margin: '50px auto',
                    textAlign: 'center',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '20px',
                    }}>
                        <img
                            src={user?.Icono || "https://via.placeholder.com/150"}
                            alt="Avatar"
                            style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '4px solid #007bff',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                marginBottom: '20px',
                            }}
                        />
                        <div style={{ textAlign: 'center' }}>
                            <h4 style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff', marginBottom: '10px' }}>
                                Perfil de Usuario
                            </h4>
                            <p style={{ color: '#555', fontSize: '16px', marginBottom: '5px' }}>
                                <strong>Correo:</strong> {user ? user.Correo : 'Correo del Usuario'}
                            </p>
                            <p style={{ color: '#555', fontSize: '16px', marginBottom: '5px' }}>
                                <strong>Teléfono:</strong> {user ? user.Telefono : 'Teléfono del Usuario'}
                            </p>
                            <p style={{ color: '#555', fontSize: '16px', marginBottom: '5px' }}>
                                <strong>Estado de la cuenta:</strong> {user ? user.Rol : 'Estado de la cuenta del Usuario'}
                            </p>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}>
                        <button style={{
                            width: '100%',
                            backgroundColor: '#007bff',
                            color: '#ffffff',
                            padding: '10px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                        >
                            Cambiar Contraseña
                        </button>
                        <button
                            style={{
                                width: '100%',
                                backgroundColor: '#28a745',
                                color: '#ffffff',
                                padding: '10px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                            onClick={cerrarSesion}
                        >
                            Editar Perfil
                        </button>
                        <button
                            style={{
                                width: '100%',
                                backgroundColor: '#dc3545',
                                color: '#ffffff',
                                padding: '10px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                            onClick={cerrarSesion}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </PerfilLayout>
        </Layout>
    );
};

export default Perfil;
