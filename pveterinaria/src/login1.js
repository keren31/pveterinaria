import React, { useState, useEffect } from "react";
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
import imagen from './img/imagen1.jpg';
import Layout from './Layout';

export default function Login() {
  //const apiurll ="http://localhost:5029/"
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const { loginUser } = useUser();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [ip] = useState("788.990.899.00");

  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const ClientID = "30463532374-6m31aqpp06eqco9k3325unc6n62cs8ej.apps.googleusercontent.com"
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigate = useNavigate();
  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleBlur = () => {
    validatePassword(password);
  };


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
          fetch( 'http://localhost:5029/api/CasaDelMarisco/ActualizarTokenEstetica', {
            method: "POST",
            body: data,
          });
          localStorage.setItem("userData", JSON.stringify({ email }));
          navigate('/multifactor')
         
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

  }
  
  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: ClientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []); // Agrega 'ObtenerIp' en el array de dependencias
  

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
        <div className="registro-image-containerLogin w-full lg:w-1/2 flex justify-center lg:justify-end">
          <img
            src={imagen}
            alt="Registro"
            className="registro-imageLogin w-full max-w-xs lg:max-w-md h-auto"
          />
        </div>

        <div className="registro-formLogin w-full lg:w-1/2">
          <p className="loginTitulo">
            Login <LoginIcon />
          </p>

          <label className="loginText">
            Inicia sesión para obtener nuevos permisos y opciones dentro del sitio web
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
    onChange={handlePasswordChange}
    onBlur={handleBlur}
    className={passwordError ? "input-error" : ""}
  />
  <button
    type="button"
    onClick={togglePasswordVisibility}
    className="btn-visibility"
  >
    {passwordVisible ? (
      <VisibilityOutlinedIcon fontSize="small" />
    ) : (
      <VisibilityOffOutlinedIcon fontSize="small" />
    )}
  </button>
</div>
            {passwordError && <p className="error-message">{passwordError}</p>}


            <div className="recuerdame">
  <input type="checkbox" id="rememberMe" className="cuadro" />
  <label htmlFor="rememberMe">Recuérdame</label>
</div>


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
                sitekey="6Lc_AHkpAAAAAPklyV-VTMQlYLL1tC0Z_P8Sc1O-"
                onChange={onChange}
              />
            </div>

            <button
              className="btn btn-warning"
              type="submit"
              disabled={isButtonDisabled}
            >
              Entrar
            </button>
          </form>

          <div className="container">
            <Link to="/recuperar" className="singText">
              ¿Olvidaste tu password?
            </Link>
            <Link to="/registro" className="singText ms-3">
              ¿Sin cuenta? Registrate
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};