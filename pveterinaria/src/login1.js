import React, { useState, useEffect } from 'react';
import './css/login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import imagen from './img/imagen1.jpg';
import ReCAPTCHA from "react-google-recaptcha";
import {useUser} from './UserContext'
import Swal from 'sweetalert2';

export default function Login() {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const {loginUser} = useUser();
  const navigate = useNavigate();
  const [botonDesactivado, setBotonDesactivado] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0); // Estado para contar los intentos de inicio de sesión fallidos
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Estado para habilitar/deshabilitar el botón de entrar
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [recaptchaError, setRecaptchaError] = useState('');

  useEffect(() => {
    // Habilitar el botón después de 3 segundos si se han hecho 3 intentos fallidos
    if (loginAttempts >= 3) {
      setTimeout(() => {
        setIsButtonDisabled(false);
        setLoginAttempts(0); // Reiniciar el contador de intentos de inicio de sesión
      }, 5000);
    }
  }, [loginAttempts]);
  const obtenerDatosUsuario = async () => {
    try {
      const response = await fetch(
        apiurll+'api/CasaDelMarisco/TraerUsuario?Correo=' + encodeURIComponent(email),
        {
          method: 'GET',
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
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const data = new FormData();
    data.append('Correo', email);
    data.append('Contrasena', password);
  
    if (validateEmail(email) && validatePassword(password)) {
      try {
        const res = await fetch(apiurll+'api/CasaDelMarisco/Login?Correo=' + email + '&Contrasena=' + password, {
          method: 'POST',
          body: data,
        });
        const result = await res.json();
  
        if (result === 'Error en tus credenciales') {
          setPasswordError('Contraseña incorrecta');
          setLoginAttempts(loginAttempts + 1);
          if (loginAttempts + 1 >= 3) {
            setIsButtonDisabled(true);
            await fetch(apiurll+"api/CasaDelMarisco/BloquearCuenta?Correo=" + email, {
              method: "POST",
              body: data,
            });
          }
        } else if (result === 'Error en las credenciales') {
          setEmailError('Error en las credenciales');
        } else if (result === 'Contraseña correcta') {
          const userData = await obtenerDatosUsuario();
          loginUser(userData);
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido de nuevo!'+userData.Nombre,
            text: 'Ahora ve y navega en nuestra paguina Suerte!.',
          });
          navigate('/')
         
        } else if (result === 'Contraseña correcta para administrador') {
          const userData = await obtenerDatosUsuario();
          loginUser(userData);
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido de nuevo Administrador!: '+userData.Nombre,
            text: 'Ahora ve y navega en nuestra paguina.',
          });
          navigate('/')
          
        } else {
          setPasswordError('Su cuenta está bloqueada');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    } else {
      console.log('Formulario no válido');
    }
  };
  
  
  const onChange =()=>{
    setIsButtonDisabled(false)
  }
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      setEmailError('No puede estar vacio este requisito');
    } else if (emailRegex.test(email)) {
      setEmailError('');
      return true;
    } else {
      setEmailError('Correo electrónico no válido');
      return false;
    }
  };

  const validatePassword = (password) => {
    if (password === '') {
      setPasswordError('No puede estar vacio este requisito');
    } else if (password.length >= 8) {
      setPasswordError('');
      return true;
    } else {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  return (
    <div className="registro-form-containerLogin">
      <div className="registro-image-containerLogin">
        <img src={imagen} alt="Registro" className="registro-imageLogin" />
      </div>
      <div className="registro-formLogin">
        <p className="loginTitulo">Login</p>
        <label className="loginText">Inicia sesión para obtener nuevos permisos y opciones dentro del sitio web</label>
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
          <label htmlFor="email" className="loginLabel">
            Contraseña :
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => validatePassword(password)}
            className={passwordError ? 'input-error' : ''}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}

          <Link to="/recuperar" className="forget">
            ¿Olvidaste tu password?
          </Link>

          <label className="recuerdame">
            <input type="checkbox" className="cuadro" />
            Recuérdame
          </label>
          <Link to="/Registro" className="singText">
            No tienes cuenta? Registrarse
          </Link>

          <ReCAPTCHA
            sitekey="6LfhTZkpAAAAAEypBbINYHIc9ssKr74nF8HElu46"
            onChange={onChange}
          />
          {recaptchaError && <p className="error-message">{recaptchaError}</p>}

          <button className="btn btn-warning text2" type="submit" disabled={isButtonDisabled}>
            Entrar
          </button>
          <br />
          <p className="Text">or wiht</p>
          <div className="sesionButton">
            <div></div>
            <div></div>
          </div>
          
        </form>
      </div>
    </div>
  );
}
