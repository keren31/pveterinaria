import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import imagen from './img/logotipo jas.jpeg';

export default function Token() {
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
      'https://lacasadelmariscoapi.somee.com/' +
        'api/CasaDelMarisco/VerificarToken?Correo=' +
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
    <div className="registro-form-containerLogin">
      <div className="registro-image-containerLogin">
        <img src={imagen} alt="Registro" className="registro-imageLogin" />
      </div>

      <div className="registro-formLogin">
        <p className="loginTitulo">Recuperación</p>
        <label className="loginText">
          Ingrese el token que se le envió al correo
        </label>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre" className="loginLabel">
            Token :
          </label>
          <input
            name="token"
            required
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <br />
          {error && <p className="error-message">{error}</p>}
          <button className="btn btn-warning text2" type="submit">
            Enviar
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}
