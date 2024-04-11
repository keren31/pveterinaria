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
            text: 'Cerraste sesión, nos vemos Regresa cuando quieras embellecer a tu mejor amigo',
        });
    };

    const cardStyle = {
        backgroundColor: '#fff',
        borderRadius: '80px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
       
        margin: '2rem auto',
        height: '270px'
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2rem',
        
    };

    const avatarStyle = {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        marginRight: '1rem',
        
    };

    const userInfoStyle = {
        textAlign: 'left',
        fontSize: '30px',
        
    };

    const optionsStyle = {
        marginTop: '2rem',
        
    };

    const buttonStyle = {
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '0.25rem',
        marginRight: '0.5rem',
        cursor: 'pointer',
    };

    return (
        <Layout>
            <PerfilLayout>
                <div style={cardStyle}>
                    <div style={headerStyle}>
                        <img
                            src="https://via.placeholder.com/80"
                            alt="Avatar"
                            style={avatarStyle}
                        />
                        <div style={userInfoStyle}>
                            <h4>Perfil de Usuario</h4>
                            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontSize: '15px', }}>
                                Correo: {user ? user.Correo : 'Correo del Usuario'}
                            </h4>
                            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem',fontSize: '15px', }}>
                                Teléfono: {user ? user.Telefono : 'Telefono del Usuario'}
                            </h4>
                            <h4 style={{ fontSize: '0.9rem',fontSize: '15px', }}>
                                Estado de la cuenta: {user ? user.Rol : 'Estado de la cuenta del Usuario'}
                            </h4>
                        </div>
                    </div>
                    <div style={optionsStyle}>
                        <h4 style={{ marginBottom: '1rem' }}>Opciones</h4>
                        <button style={buttonStyle}>Cambiar Contraseña</button>
                        <button style={{ ...buttonStyle, backgroundColor: '#28a745' }} onClick={cerrarSesion}>
                            Editar Perfil
                        </button>
                        <button style={{ ...buttonStyle, backgroundColor: '#dc3545' }} onClick={cerrarSesion}>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </PerfilLayout>
        </Layout>
    );
};

export default Perfil;