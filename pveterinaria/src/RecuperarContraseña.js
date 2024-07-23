import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imagen from './img/imagen1.jpg';
import Layout from './Layout';

export default function RecuperarContra() {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      setEmailError('No puede estar vacío');
    } else if (emailRegex.test(email)) {
      setEmailError('');
      return true;
    } else {
      setEmailError('Correo electrónico no válido');
      return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateEmail(email)) {
      const data = new FormData();
      data.append('Correo', email);

      fetch(
       
          'http://localhost:5029/api/CasaDelMarisco/ActualizarTokenEstetica',
        {
          method: 'POST',
          body: data,
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((result) => {
          if (result === 'Correo Existe. Token actualizado.') {
            navigate(`/token?correo=${email}`);
          } else if (result === 'Error en las credenciales') {
            setEmailError('Correo inválido');
          }
        })
        .catch((error) => {
          console.error('Failed to recover password:', error);
          setEmailError('Error en la recuperación de contraseña. Inténtalo de nuevo más tarde.');
        });
    } else {
      console.log('Formulario no válido');
    }
  };

  return (
    <Layout>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '650px',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          marginRight: '20px'
        }}>
          <img src={imagen} alt="Registro" style={{
            width: '400px',
            height: '400px',
            objectFit: 'cover',
            borderRadius: '50%'
          }} />
        </div>
  
        <div>
          <p style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '20px'
          }}>Recuperación</p>
          <label style={{
            fontSize: '16px',
            color: '#666',
            marginBottom: '10px'
          }}>Ingrese su correo electrónico para el proceso de recuperación de contraseña</label>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" style={{
              display: 'block',
              fontSize: '14px',
              color: '#333',
              marginBottom: '5px'
            }}>Correo electrónico :</label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: emailError ? '1px solid red' : '1px solid #ccc',
                marginBottom: '20px'
              }}
              required
            />
            {emailError && <p style={{
              color: 'red',
              fontSize: '12px',
              marginBottom: '20px'
            }}>{emailError}</p>}
            <button type="submit" style={{
              backgroundColor: '#ffc107',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}>
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  </Layout>
  );
}
