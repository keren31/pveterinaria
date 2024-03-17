import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import imagen from './img/logotipo jas.jpeg';

export default function Actualizar() {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const navigate = useNavigate();
  const location = useLocation();
  const correo = new URLSearchParams(location.search).get('correo');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validatePassword(password)) {
      const data = new FormData();
      data.append('Correo', correo);
      data.append('Contrasena', password);

      fetch(
        apiurll+'api/CasaDelMarisco/RecuperarContrasena?Correo=' +
          correo +
          '&Contrasena=' +
          password,
        {
          method: 'POST',
          body: data,
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result === 'Contraseña modificada correctamente') {
            setSuccessMessage('La contraseña se ha modificado correctamente.');
            setTimeout(() => {
    window.location.href='/login1';

                        }, 3000);
          } else if (result === 'Error en las credenciales que proporciono') {
            // Manejar el error en las credenciales
          }
        });
    } else {
      // La contraseña no cumple con los requisitos
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial'
      );
      return false;
    }
    setPasswordError('');
    return true;
  };

  return (
    <div className="registro-form-containerLogin">
      <div className="registro-image-containerLogin">
        <img src={imagen} alt="Registro" className="registro-imageLogin" />
      </div>

      <div className="registro-formLogin">
        <p className="loginTitulo">Actualizar Contraseña</p>
        <label className="loginText">Ingrese su nueva contraseña</label>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre" className="loginLabel">
            Contraseña nueva :
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <br />
          <button className="btn btn-warning text2" type="submit" >
            Enviar
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}
