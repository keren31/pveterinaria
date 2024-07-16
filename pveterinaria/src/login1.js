import React, { useState, useEffect } from 'react';
import './css/login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import imagen from './img/imagen1.jpg';
import ReCAPTCHA from "react-google-recaptcha";
import {useUser} from './UserContext'
import Swal from 'sweetalert2';
import Layout from './Layout';
import { gapi } from "gapi-script";
import GoogleLogin from "@leecheuk/react-google-login";

export default function Login() {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const {loginUser} = useUser();
  const navigate = useNavigate();
  const [botonDesactivado, setBotonDesactivado] = useState(true);

  const [email, setEmail] = useState('');
  const [ip, setIp] = useState('');

  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0); // Estado para contar los intentos de inicio de sesión fallidos
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Estado para habilitar/deshabilitar el botón de entrar
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [recaptchaError, setRecaptchaError] = useState('');
  const ClientID = "30463532374-6m31aqpp06eqco9k3325unc6n62cs8ej.apps.googleusercontent.com"

  useEffect(() => {
    // Habilitar el botón después de 3 segundos si se han hecho 3 intentos fallidos
    if (loginAttempts >= 3) {
      setTimeout(() => {
        setIsButtonDisabled(false);
        setLoginAttempts(0); // Reiniciar el contador de intentos de inicio de sesión
      }, 5000);
    }
  }, [loginAttempts]);

  const obtenerDatosUsuario = async (email) => {
    try {
      const response = await fetch(
        apiurll + "api/CasaDelMarisco/TraerUsuario?Correo=" + email,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        return await response.json();
      } else {
        console.error(
          "Error al obtener datos del usuario que ingresaste:",
          response.statusText
        );
        return null;
      }
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
      return null;
    }
  };


  async function json(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  function ObtenerIp(){
    let apiKey = "8c308d0e8f217c1a489e15cb1998c34ffcd76bcead2a2851c3878299";
    json(`https://api.ipdata.co?api-key=${apiKey}`).then((data) => {
      setIp(data.ip);
    });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();  
    
    
    if (validateEmail(email) && validatePassword(password)) {
      try {
        data.append('Correo', email);
        data.append('Contrasena', password);
        data.append('ip', ip);
        console.log(email, password, ip)
        const res = await fetch(apiurll+'api/CasaDelMarisco/Login', {
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
        }else if (result === 'Error en las credenciales') {
          setEmailError('Error en las credenciales');
        }else if (result === 'Contraseña correcta') {
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
          navigate('/admin-citas')
          
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
      ObtenerIp();
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

  const onFailure = () => {
    console.log("Algo salio mal");
  };

  const onSuccess = async (response) => {
    const email = response.profileObj.email;
    const data = new FormData();
    data.append("Correo", email);
    data.append("ip", ip);

    fetch(apiurll + "api/CasaDelMarisco/VerificarCorreo", {
      method: "POST",
      body: data,
  })
  .then((res) => res.json())
  .then(async (result) => {
      if (result === "Correo Existe") {
          const resultado = await obtenerDatosUsuario(email);

          // Segunda llamada fetch
          fetch(apiurll + "api/CasaDelMarisco/LoginOauth", {
              method: "POST",
              body: data,
          })
          .then((res) => res.json())
          .then((loginResult) => {
              loginUser(resultado);
              if (resultado.Rol === 2) {
                  Swal.fire({
                      icon: "success",
                      title: "Login de administrador",
                      text: "Cuidado, eres administrador. Puedes modificar datos de la página, siempre con cuidado.",
                  });
                  navigate("/dashboard/home");
              } else {
                  navigate("/");
              }
              //console.log(loginResult);
          })
          .catch((error) => {
              console.error("Error en la segunda llamada fetch:", error);
          });
      } else {
          // Aquí puedes manejar el caso en el que el correo no existe
      }
  })
  .catch((error) => {
      console.error("Error en la primera llamada fetch:", error);
  });

  //console.log(response);
};

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: ClientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  

  return (
    <Layout>
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
          <GoogleLogin
            clientId={ClientID}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_policy"}
            className="google-login-button"
          />
          <div className="sesionButton">
            <div></div>
            <div></div>
          </div>
          
        </form>
      </div>
    </div>
    </Layout>
  );
}
