import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imagen from './img/imagen1.jpg';

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

  const data = new FormData();
  data.append('Correo', email);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateEmail(email)) {
      fetch(
        apiurll+'api/CasaDelMarisco/ActualizarTokenEstetica?Correo=' +
          email,
        {
          method: 'POST',
          body: data,
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result === 'Correo Existe. Token actualizado.') {
            // Navegar a la página Token con el correo como parámetro
            navigate(`/token?correo=${email}`);
          } else if (result === 'Error en las credenciales') {
            setEmailError('Correo inválido');
          }
        });
    } else {
      console.log('Formulario no válido');
    }
  };

  return (
    <div className="registro-form-containerLogin">
      <div className="registro-image-containerLogin">
        <img src={imagen} alt="Registro" className="registro-imageLogin" />
      </div>

      <div className="registro-formLogin">
        <p className="loginTitulo">Recuperación</p>
        <label className="loginText">
          Ingrese su correo electrónico para el proceso de recuperación de contraseña
        </label>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre" className="loginLabel">
            Correo electrónico :
          </label>
          <input
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validateEmail(email)}
            className={emailError ? 'input-error' : ''}
            required
          />
          {emailError && <p className="error-message">{emailError}</p>}
          <br />

          <button className="btn btn-warning text2" type="submit">
            Enviar
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}