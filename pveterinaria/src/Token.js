import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import imagen from './img/pixlr-image-generator-fd08d275-bff4-4995-bb65-c63a369e379b.png';
import Layout from './Layout';

export default function Token() {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const location = useLocation();
  const correo = new URLSearchParams(location.search).get('correo');
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('Correo', correo);
    data.append('Token', token);

    fetch(
      apiurll +'api/CasaDelMarisco/VerificarToken?Correo=' +
        correo + '&Token=' + token,
      {
        method: 'POST',
        body: data,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result === 'Credenciales validas') {
          navigate(`/actualizar?correo=${correo}`);
        } else {
          setError('El token ingresado no es válido. Por favor, inténtelo nuevamente.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Ocurrió un error al verificar el token. Por favor, inténtelo nuevamente.');
      });
  };

  return (
    <Layout>
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
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
        marginBottom: '20px'
      }}>
        <img src={imagen} alt="Registro" style={{
          width: '400px',
          height: '400px',
          objectFit: 'cover',
          borderRadius: '50%',
          marginRight:'50px'
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
        }}>Ingrese el token que se le envió al correo</label>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre" style={{
            display: 'block',
            fontSize: '14px',
            color: '#333',
            marginBottom: '5px'
          }}>Token :</label>
          <input
            name="token"
            required
            value={token}
            onChange={(e) => setToken(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginBottom: '20px'
            }}
          />
          {error && <p style={{
            color: 'red',
            fontSize: '12px',
            marginBottom: '20px'
          }}>{error}</p>}
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
