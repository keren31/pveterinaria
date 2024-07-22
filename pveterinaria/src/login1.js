import React, { useState, useRef, useEffect } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import ReCAPTCHA from "react-google-recaptcha";
import { gapi } from "gapi-script";
import GoogleLogin from "@leecheuk/react-google-login"; 
import { useUser } from "./UserContext";
import "./css/login.css";
import { reactApiIP } from "./variables";
import imagen from './img/imagen1.jpg';

import Layout from './Layout';

export default function Login() {
  //const apiurll ="http://localhost:5029/"
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const { loginUser } = useUser();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [ip, setIp] = useState("");

  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [loginAttempts2, setLoginAttempts2] = useState(0);
  const ClientID = "30463532374-6m31aqpp06eqco9k3325unc6n62cs8ej.apps.googleusercontent.com"
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigate = useNavigate();
  const loginAttemptsRef = useRef(loginAttempts);
  const loginAttemptsRef2 = useRef(loginAttempts2);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleBlur = () => {
    validatePassword(password);
  };

  function json(url) {
    return fetch(url).then((res) => res.json());
  }

  //

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      setEmailError("Este campo no puede estar vacío");
    } else if (emailRegex.test(email)) {
      setEmailError("");
      return true;
    } else {
      setEmailError("Correo electrónico no válido, incluya un @");
      return false;
    }
  };

  const validatePassword = (password) => {
    if (password === "") {
      setPasswordError("Este campo no puede estar vacío");
    } else if (password.length >= 8) {
      setPasswordError("");
      return true;
    } else {
      setPasswordError("La contraseña debe tener al menos 8 caracteres");
      return false;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();  
    data.append('Correo', email);
    data.append('Contrasena', password);
    data.append('ip', ip);
    
    if (validateEmail(email) && validatePassword(password)) {
      try {
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
          const userData = await obtenerDatosUsuario(email);
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
  

  function onChange(value) {
    setIsButtonDisabled(false);
    ObtenerIp();

  }
  function ObtenerIp() {
    const apiKey = reactApiIP;
    json(`https://api.ipdata.co?api-key=${apiKey}`).then((data) => {
      setIp(data.ip);
      //console.log(ip);
    });
  }
  useEffect(() => {
    ObtenerIp();
    const start = () => {
      gapi.auth2.init({
        clientId: ClientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

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
                  navigate("/Pedidos_admin");
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


  const onFailure = () => {
    console.log("Algo salio mal");
  };

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
  return (
    <Layout>
    <div className="registro-form-containerLogin">
      <div className="registro-image-containerLogin">
        <img src={imagen} alt="Registro" className="registro-imageLogin" />
      </div>
      <div className="registro-formLogin">
        <p className="loginTitulo">
          Login <LoginIcon />
        </p>
        <label className="loginText">
          Inicia sesión para obtener nuevos permisos y opciones dentro del sitio
          web
        </label>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre" className="loginLabel">
            Correo electrónico :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validateEmail(email)}
            className={emailError ? "input-error" : ""}
            required
          />

          {emailError && <p className="error-message">{emailError}</p>}

          <label htmlFor="email" className="loginLabel">
            Contraseña :
          </label>
          <div className="password-input-container">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              required
              size={37}
              onChange={handlePasswordChange}
              onBlur={handleBlur}
              className={passwordError ? "input-error" : ""}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              class="btn btn-light"
            >
              {passwordVisible ? (
                <VisibilityOutlinedIcon fontSize="small" />
              ) : (
                <VisibilityOffOutlinedIcon fontSize="small" />
              )}
            </button>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
          <label className="recuerdame">
            <input
              type="checkbox"
              className="cuadro"
              style={{ marginTop: "10px" }}
            />
            Recuérdame
          </label>

          <GoogleLogin
            clientId={ClientID}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_policy"}
            className="google-login-button"
          />
          <div className="recaptcha">
            <ReCAPTCHA
              className="recaptch"
              sitekey="6LcM1HgpAAAAAPRLXOZ5D4aIwp7JtiBeH3IR9QW6"
              onChange={onChange}
            />
          </div>
          <button
            className="btn btn-warning text2"
            type="submit"
            disabled={isButtonDisabled}
            style={{
              backgroundColor: 'orange',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s, transform 0.3s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'darkorange';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'orange';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            
          >
            Entrar
          </button>
          <br />
        </form>

        <div className="container">
          <Link to="/menuRecuperacion" className="singText">
            ¿Olvidaste tu password?
          </Link>
          <Link to="/registrar" className="singText ms-3">
            ¿Sin cuenta? Registrate
          </Link>
          <></>
        </div>
      </div>
    </div>
    </Layout>
  );
}