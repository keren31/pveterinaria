import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imagen from './img/imagen1.jpg';
import Swal from 'sweetalert2';
import { useUser } from './UserContext';
import Layout from './Layout';

export default function Bienvenida() {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

  const { loginUser } = useUser();
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [erroToken, setErroToken] = useState('');
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerActive(false);
      alert('Se agotó el tiempo para ingresar el token. Serás redirigido a la página anterior.');
      setTimeout(() => {
        navigate('/recuperar');
      }, 5000); // Redirigir después de 5 segundos
    }, 300000); // 5 minutos

    return () => clearTimeout(timer);
  }, [navigate]); // Incluye 'navigate' en el array de dependencias

  const handleSubmit = async (event) => {
    //  let apiKey = '8c308d0e8f217c1a489e15cb1998c34ffcd76bcead2a2851c3878299';
    // json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
    //  console.log(data.ip);
    //  console.log(data.city);
    //  console.log(data.country_code);
    //   });
    event.preventDefault();


    if (!timerActive) {
      handleTimerEnd();
      return;
    }

    const data = new FormData();
    const storedEmail = JSON.parse(localStorage.getItem('userData')).email; // Obtener el correo almacenado en localStorage
    data.append('Token', token);
    data.append('Correo', storedEmail); // Agregar el correo almacenado al FormData
    //data.append('IP', data.ip); // Agregar el correo almacenado al FormData

    try {
      const result = await fetch(
        apiurll + 'api/CasaDelMarisco/VerificarToken',
        {
          method: 'POST',
          body: data,
        }
      );

      const verificationResult = await result.json();

      if (verificationResult === 'Credenciales validas') {
        const userData = await obtenerDatosUsuario();
        console.log(userData);

        if (userData) {
          const idUsuario = userData.idUsuario;
          loginUser(userData, idUsuario);
          
          navigate('/');
          Swal.fire({
            icon: 'success',
            title: `Bienvenido de nuevo, ${userData.Nombre}!`,
            text: 'Ahora puedes entrar para navegar y sorprenderte.',
          });
        } else {
          // Manejar el caso donde no se pudieron obtener los datos del usuario
        }
      } else {
        setErroToken('Token inválido');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
    }
  };

  const handleTimerEnd = () => {
    setTimerActive(false);
    setErroToken('Tiempo de ingreso de token agotado. Actualiza la página para intentar de nuevo.');
  };

  const obtenerDatosUsuario = async () => {
    const storedEmail = JSON.parse(localStorage.getItem('userData')).email;
  
    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/TraerUsuario?Correo=${encodeURIComponent(storedEmail)}`,
        {
          method: 'GET',
          // No es necesario incluir el body para una solicitud GET
        }
      );
  
      if (response.ok) {
        const userData = await response.json();
        return userData;
      } else {
        console.error('Error al obtener datos del usuario que ingresaste:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      return null;
    }
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
          marginRight:'50px' }} />
      </div>

      <div style={{ flex: 1, padding: '20px' }}>
        <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>Verifica que eres tu</p>
        <label style={{ display: 'block', fontSize: '16px', marginBottom: '10px', textAlign: 'center' }}>
          Ingrese el token que se le envió al correo
        </label>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label htmlFor="nombre" style={{ fontSize: '16px', marginBottom: '10px' }}>
            Token:
          </label>
          <input
            type="text"
            name="token"
            required
            value={token}
            onChange={(e) => setToken(e.target.value)}
            disabled={!timerActive}
            style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', width: '100%', maxWidth: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          {erroToken && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{erroToken}</p>}
          <button
            type="submit"
            disabled={!timerActive}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#ffc107',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  </div>
</Layout>

  );
}
