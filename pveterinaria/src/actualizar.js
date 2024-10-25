import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import imagen from "./img/imagen1.jpg"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { MedidorSeguridad } from "./MedidorDeSeguridad";
import Swal from "sweetalert2";
import Layout from "./Layout";


export default function Actualizar() {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  //const apiurll ="http://localhost:5029/"
  const location = useLocation();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleBlur = () => {
    validatePassword(password);
  };

  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };

  const handlePasswordChange2 = (e) => {
    setPassword2(e.target.value);
  };

  const handleBlur2 = () => {
    validatePassword2(password2);
  };

  const [password, setPassword] = useState("");
  const [ip, setIp] = useState("");

  const [password2, setPassword2] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [passwordError2, setPasswordError2] = useState("");

  function checkPasswordStrength(password, minChar, level) {
    const lowcase = /[a-z]/.test(password);
    const uppcase = /[A-Z]/.test(password);
    const numbers = /\d/.test(password);
    const special = /[^a-zA-Z\d]/.test(password);

    let passed = true;
    switch (level) {
      case 5:
        passed = passed && special;
        break;
      case 4:
        passed = passed && uppcase;
        break;
      case 3:
        passed = passed && numbers;
        break;
      case 2:
        passed = passed && lowcase;
        break;
      case 1:
        passed = passed && (lowcase || uppcase || numbers);
        break;
      case 0:
        passed = passed && password.length >= minChar;
        break;
      default:
        passed = false;
    }
    return passed;
  }

  const validatePassword = (password) => {
    if (password === "") {
      setPasswordError("no puede estar vacio");
      return false;
    } else {
      if (password.length < 8) {
        setPasswordError("minimo de 8 caracteres");
        return false;
      } else {
        const passwordValidate = checkPasswordStrength(password, 8, 5);
        if (passwordValidate) {
          ObtenerIp();
          setPasswordError("");
          return true;
        } else {
          setPasswordError(
            "Debe tener almenos una mayuscula, minuscula, numero y caracter especial"
          );
          return false;
        }
      }
    }
  };

  const validatePassword2 = (password2) => {
    if (password2 === password) {
      setPasswordError2("");
      return true;
    } else {
      setPasswordError2("no son iguales las contraseñas");
      return false;
    }
  };
  function json(url) {
    return fetch(url).then((res) => res.json());
  }

  const data = new FormData();

  const storedEmail = new URLSearchParams(location.search).get('correo');
  
  data.append("Correo", storedEmail);
  data.append("Contrasena", password);
  function ObtenerIp() {
    let apiKey = ('8c308d0e8f217c1a489e15cb1998c34ffcd76bcead2a2851c3878299');
    json(`https://api.ipdata.co?api-key=${apiKey}`).then((data) => {
      setIp(data.ip);
    });
  }
  const handleSubmit = (event) => {
   
    data.append("ip", ip);
    event.preventDefault();

    fetch(apiurll + "api/CasaDelMarisco/RecuperarContrasena", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result === "Contraseña modificada correctamente") {
          localStorage.removeItem("userData");

          Swal.fire({
            icon: "success",
            title: "Cambio de contraseña correcta",
            text: "Ahora puede entrar para navegar y sorprenderse.",
          });
          navigate("/login1");
        }
      });
  };

  return (
    <Layout>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
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
            width: '500px',
            height: '500px',
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
          }}>Actualizar Contraseña</p>
          <label style={{
            fontSize: '16px',
            color: '#666',
            marginBottom: '10px'
          }}>Ingrese su nueva contraseña</label>
          <form onSubmit={handleSubmit}>
            <label htmlFor="password" style={{
              display: 'block',
              fontSize: '14px',
              color: '#333',
              marginBottom: '5px'
            }}>Contraseña :</label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                required
                size={35}
                onChange={handlePasswordChange}
                onBlur={handleBlur}
                style={{
                  flex: '1',
                  padding: '10px',
                  borderRadius: '4px',
                  border: passwordError ? '1px solid red' : '1px solid #ccc'
                }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  marginLeft: '10px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {passwordVisible ? (
                  <VisibilityOutlinedIcon fontSize="small" />
                ) : (
                  <VisibilityOffOutlinedIcon fontSize="small" />
                )}
              </button>
            </div>
            {passwordError && <p style={{
              color: 'red',
              fontSize: '12px',
              marginBottom: '20px'
            }}>{passwordError}</p>}
            <MedidorSeguridad password={password} />
  
            <label htmlFor="password2" style={{
              display: 'block',
              fontSize: '14px',
              color: '#333',
              marginBottom: '5px'
            }}>Repetir contraseña :</label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <input
                type={passwordVisible2 ? "text" : "password"}
                id="password2"
                name="password2"
                value={password2}
                required
                size={35}
                onChange={handlePasswordChange2}
                onBlur={handleBlur2}
                style={{
                  flex: '1',
                  padding: '10px',
                  borderRadius: '4px',
                  border: passwordError2 ? '1px solid red' : '1px solid #ccc'
                }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility2}
                style={{
                  marginLeft: '10px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {passwordVisible2 ? (
                  <VisibilityOutlinedIcon fontSize="small" />
                ) : (
                  <VisibilityOffOutlinedIcon fontSize="small" />
                )}
              </button>
            </div>
            {passwordError2 && <p style={{
              color: 'red',
              fontSize: '12px',
              marginBottom: '20px'
            }}>{passwordError2}</p>}
  
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