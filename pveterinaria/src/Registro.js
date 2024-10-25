import React, { useState } from 'react';
import './css/registro.css';
import imagen from './img/pixlr-image-generator-fd08d275-bff4-4995-bb65-c63a369e379b.png';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Layout from './Layout';

const Registro = () => {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  
  const [nombre, setNombre] = useState('');
  const [ApellidoP, setApellidoP] = useState('');
  const [ApellidoM, setApellidoM] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [telefono, setTelefono] = useState('');
  const [fechaNac, setFechaNac] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordError2, setPasswordError2] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [apellidoMError, setApellidoMError] = useState('');
  const [apellidoPError, setApellidoPError] = useState('');
  const [fechaError, setFechaError] = useState('');
  

  const [passwordStrength,setPasswordStrength] = useState(''); 


  

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validar campos antes de enviar el formulario
    if (
      validateEmail(email) &&
      validatePassword(password) &&
      validatePassword2(password2) &&
      validateApellidoM(ApellidoM) &&
      validateApellidoP(ApellidoP) &&
      validateNombre(nombre) &&
      validateTelefono(telefono) &&
      validateFecha(fechaNac)
    ) {
      let fechaNacimiento = new Date(fechaNac);
      let fechaHoy = new Date();
      let edad = fechaHoy.getFullYear() - fechaNacimiento.getFullYear();
      let mes = fechaHoy.getMonth() - fechaNacimiento.getMonth();
      if (mes < 0 || (mes === 0 && fechaHoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }
      if (edad < 18) {
        setFechaError('Debe ser mayor de 18 años');
      } else {
        const data = new FormData();
        data.append("Nombre", nombre);
        data.append("ApellidoPaterno", ApellidoP);
        data.append("ApellidoMaterno", ApellidoM);
        data.append("Correo", email);
        data.append("Telefono", telefono);
        data.append("Contrasena", password);
        data.append("FechaNacimiento", fechaNac);

        fetch(
          apiurll+"api/CasaDelMarisco/VerificarCorreo?Correo=" + email,
          {
            method: "POST",
            body: data,
          }
        )
          .then((res) => res.json())
          .then((result) => {
            if (result === 'Correo Existe') {
              setEmailError('Este correo ya existe');
            } else {
              fetch(
                apiurll+"api/CasaDelMarisco/AgregarUsuarios?Nombre=" +
                nombre +
                "&ApellidoPaterno=" +
                ApellidoP +
                "&ApellidoMaterno=" +
                ApellidoM +
                "&Correo=" +
                email +
                "&Telefono=" +
                telefono +
                "&Contrasena=" +
                password + 
                "&FechaNacimiento=" +
                fechaNac,
                {
                  method: "POST",
                  body: data,
                }
              )
                .then((res) => res.json())
                .then(() => {
                  window.location.href='/login1'
                }); 
            }
          });  
      }
    } 
 else {
      console.log('Formulario no válido');
    }
  };

  
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  

  const validateNombre = (nombre) => {
    if (nombre === '') {
      setNombreError('No puede estar vacío');
      return false;
    } else {
      const nombreRegex = /^[a-zA-Z\s]+$/;
      if (nombreRegex.test(nombre)) {
        setNombreError('');
        return true;
      } else {
        setNombreError('No puede contener números');
        return false;
      }
    }
  };

  const validateApellidoP = (ApellidoP) => {
    if (ApellidoP === '') {
      setApellidoPError('No puede estar vacío');
      return false;
    } else {
      const nombreRegex = /^[a-zA-Z\u00C0-\u024F\süÜ]+$/;
      if (nombreRegex.test(ApellidoP)) {
        setApellidoPError('');
        return true;
      } else {
        setApellidoPError('No puede contener números');
        return false;
      }
    }
  };

  const validateApellidoM = (ApellidoM) => {
    if (ApellidoM === '') {
      setApellidoMError('No puede estar vacío');
      return false;
    } else {
      const nombreRegex = /^[a-zA-Z\u00C0-\u024F\süÜ]+$/;
      if (nombreRegex.test(ApellidoM)) {
        setApellidoMError('');
        return true;
      } else {
        setApellidoMError('No puede contener números');
        return false;
      }
    }
  };

  const validateEmail = (email) => {
    if (email === '') {
      setEmailError('No puede estar vacío');
      return false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        setEmailError('');
        return true;
      } else {
        setEmailError('Correo electrónico no válido');
        return false;
      }
    }
  };

  const validatePassword = (password) => {
    if (password === '') {
      setPasswordError('No puede estar vacío');
      return false;
    } else {
      if (password.length < 4) {
        setPasswordStrength('Débil');
        setPasswordError('Mínimo de 4 caracteres');
        return false;
      } else if (password.length < 6 || !/[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(password)) {
        setPasswordStrength('Medio');
        setPasswordError('Debe tener al menos 6 caracteres y caracteres especiales');
        return false;
      } else {
        setPasswordStrength('Fuerte');
        setPasswordError('');
        return true;
      }
    }
  };

  const validatePassword2 = (password2) => {
    if (password2 === password) {
      setPasswordError2('');
      return true;
    } else {
      setPasswordError2('Las contraseñas no coinciden');
      return false;
    }
  };

  const validateTelefono = (telefono) => {
    const telefonoRegex = /^\d{10}$/;
    if (telefono === '') {
      setTelefonoError('No puede estar vacío');
      return false;
    } else if (telefonoRegex.test(telefono)) {
      setTelefonoError('');
      return true;
    } else {
      setTelefonoError('Teléfono debe tener exactamente 10 números');
      return false;
    }
  };

  const validateFecha = (fechaNac) => {
    let fechaError = '';
    if (fechaNac.trim() === '') {
      fechaError = 'No puede estar vacío';
      setFechaError(fechaError);
      return false;
    } else {
      let fechaNacimiento = new Date(fechaNac);
      let fechaHoy = new Date();
      let edad = fechaHoy.getFullYear() - fechaNacimiento.getFullYear();
      let mes = fechaHoy.getMonth() - fechaNacimiento.getMonth();
      if (mes < 0 || (mes === 0 && fechaHoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }
      if (edad < 18) {
        fechaError = 'Debe ser mayor de 18 años';
        setFechaError(fechaError);
        return false;
      } else {
        setFechaError('');
        return true;
      }
    }
  };

  

  return (
    <Layout>
      <div className="registro-form-containerRegistro">
        <div className="registro-image-containerRegistro">
          <img src={imagen} alt="Registro" className="registro-imageRegistro" />
          
        </div>
        <div className="registro-formRegistro">
          <p className="loginTitulo" style={{
            color: '#fff',
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            margin: '20px 0',
            padding: '10px',
            backgroundColor: '#0055A5',
            borderRadius: '8px'
          }}>
            Crear Cuenta/Registrarse
          </p>
          <form onSubmit={handleSubmit} className="formulario">
            <div>
              <label htmlFor="nombre" className="RegistroLabel">Nombre* :</label>
              <input
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={nombreError ? 'input-error' : ''}
                required
              />
              {nombreError && <p className="error-message">{nombreError}</p>}
            </div>
            <div>
              <label htmlFor="apellidoP" className="RegistroLabel">Apellido Paterno* :</label>
              <input
                id="apellidoP"
                name="apellidoP"
                value={ApellidoP}
                onChange={(e) => setApellidoP(e.target.value)}
                className={apellidoPError ? 'input-error' : ''}
                required
              />
              {apellidoPError && <p className="error-message">{apellidoPError}</p>}
            </div>
            <div>
              <label htmlFor="apellidoM" className="RegistroLabel">Apellido Materno* :</label>
              <input
                id="apellidoM"
                name="apellidoM"
                value={ApellidoM}
                onChange={(e) => setApellidoM(e.target.value)}
                className={apellidoMError ? 'input-error' : ''}
                required
              />
              {apellidoMError && <p className="error-message">{apellidoMError}</p>}
            </div>
            <div>
              <label htmlFor="email" className="RegistroLabel">Correo* :</label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={emailError ? 'input-error' : ''}
                required
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
            <div className="password-input">
              <label htmlFor="password" className="RegistroLabel">Contraseña</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  className={passwordError ? 'input-error' : ''}
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="password-icon"
                  onClick={togglePasswordVisibility}
                />
              </div>
              {passwordError && <p className="error-message">{passwordError}</p>}
            </div>
            <div className="password-input">
              <label htmlFor="password2" className="RegistroLabel">Repetir Contraseña</label>
              <div className="input-wrapper">
                <input
                  type={showPassword2 ? 'text' : 'password'}
                  id="password2"
                  name="password2"
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                    validatePassword2(e.target.value);
                  }}
                  className={passwordError2 ? 'input-error' : ''}
                  required
                />
                <FontAwesomeIcon
                  icon={showPassword2 ? faEyeSlash : faEye}
                  className="password-icon"
                  onClick={togglePasswordVisibility2}
                />
              </div>
              {passwordError2 && <p className="error-message">{passwordError2}</p>}
              {passwordStrength && (
                <p style={{ color: passwordStrength === 'Fuerte' ? 'green' : 'red' }}>
                  La fortaleza de la contraseña es: {passwordStrength}
                </p>
              )}
              </div>
            <div>
              <label htmlFor="telefono" className="RegistroLabel">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={telefono}
                onChange={(e) => {
                  setTelefono(e.target.value);
                  validateTelefono(e.target.value)
                }}
                className={telefonoError ? 'input-error' : ''}
                required
              />
              {telefonoError && <p className="error-message">{telefonoError}</p>}
            </div>
            <div>
              <label htmlFor="fecha" className="RegistroLabel">Fecha de Nacimiento:</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={fechaNac}
                onChange={(e) => setFechaNac(e.target.value)}
                className={fechaError ? 'input-error' : ''}
                required
              />
              {fechaError && <p className="error-message">{fechaError}</p>}
            </div>
            <div className="recuerdame">
              <input type="checkbox" className="cuadro" required />
              <span>
                Acepta los <Link to="/politicas-de-privacidad">términos y condiciones</Link>
              </span>
            </div>
            <button className="btn" type="submit">
              Registro
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
  
};

export default Registro;
