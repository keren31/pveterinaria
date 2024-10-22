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
  

  const [passwordStrength, setPasswordStrength] = useState(''); // Estado para la fortaleza de la contraseña


  

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
                .then((result) => {
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
    <Layout><div className="registro-form-containerRegistro">
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
  }}>Crear Cuenta/Registrarse</p>
      <label 
  className="loginText" 
  style={{
    color: '#333', 
    fontSize: '20px', 
    fontWeight: '300', 
    textAlign: 'center', 
    margin: '20px 0', 
    padding: '20px', 
    backgroundColor: '#f0f0f0', 
    borderRadius: '12px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
    display: 'block',
    lineHeight: '1.6'
  }}
>
  Bienvenidos a la Estética Canina Platon, ingresa los datos para crear una cuenta con nosotros.
</label>

      <form onSubmit={handleSubmit} className="formulario">
        <div>
          <label htmlFor="nombre" className="RegistroLabel">
            Nombre* :
          </label>
          <input
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              validateNombre(e.target.value);
            }}
            onBlur={() => validateNombre(nombre)}
            className={nombreError ? 'input-error' : ''}
            required
          />
          {nombreError && <p className="error-message">{nombreError}</p>}
        </div>

        <div>
          <label htmlFor="apellidoP" className="RegistroLabel">
            Apellido Paterno :
          </label>
          <input
            required
            id="apellidoP"
            name="apellidoP"
            value={ApellidoP}
            onChange={(e) => {
              setApellidoP(e.target.value);
              validateApellidoP(ApellidoP);
            }}
            onBlur={() => validateApellidoP(ApellidoP)}
            className={apellidoPError ? 'input-error' : ''}
          />
          {apellidoPError && <p className="error-message">{apellidoPError}</p>}
        </div>

        <div>
          <label htmlFor="apellidoM" className="RegistroLabel">
            Apellido Materno :
          </label>
          <input
            required
            id="apellidoM"
            name="apellidoM"
            value={ApellidoM}
            onChange={(e) => {
              setApellidoM(e.target.value);
              validateApellidoM(ApellidoM);
            }}
            onBlur={() => validateApellidoM(ApellidoM)}
            className={apellidoMError ? 'input-error' : ''}
          />
          {apellidoMError && <p className="error-message">{apellidoMError}</p>}
        </div>

        <div>
          <label htmlFor="email" className="RegistroLabel">
            Correo* :
          </label>
          <input
            required
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(email);
            }}
            onBlur={() => validateEmail(email)}
            className={emailError ? 'input-error' : ''}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>

        <div style={{ display: 'inline-block' }}>
          <div className="nivel">
            <label htmlFor="password" className="RegistroLabel">
              Contraseña :
            </label>
            {passwordStrength && <p className="password-strength">{`${passwordStrength}`}</p>}
          </div>
          <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value); // Actualiza el estado de la contraseña
                  validatePassword(e.target.value); // Valida la contraseña conforme el usuario escribe
                }}
                onBlur={() => validatePassword(password)} // Esta línea aún es necesaria para validar cuando el usuario sale del campo
                className={passwordError ? 'input-error' : ''}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="password-icon"
                onClick={togglePasswordVisibility}
              />
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="password2" className="RegistroLabel">
            Repetir contraseña :
          </label>
          <div className="password-input">
            <input
              type={showPassword2 ? 'text' : 'password'}
              id="password2"
              name="password2"
              value={password2}
              required
              onChange={(e) => setPassword2(e.target.value)}
              onBlur={() => validatePassword2(password2)}
              className={passwordError2 ? 'input-error' : ''}
            />
            <FontAwesomeIcon
              icon={showPassword2 ? faEyeSlash : faEye}
              className="password-icon"
              onClick={togglePasswordVisibility2}
            />
          </div>
          {passwordError2 && <p className="error-message">{passwordError2}</p>}
        </div>

        <div>
          <label htmlFor="telefono" className="RegistroLabel">
            Telefono* :
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={telefono}
            required
            onChange={(e) => {
              setTelefono(e.target.value);
              validateTelefono(telefono);
            }}
            onBlur={() => validateTelefono(telefono)}
            className={telefonoError ? 'input-error' : ''}
          />
          {telefonoError && <p className="error-message">{telefonoError}</p>}
        </div>

        <div>
          <label htmlFor="fecha" className="RegistroLabel">
            Fecha de nacimiento :
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            required
            value={fechaNac}
            onBlur={() => validateFecha(fechaNac)}
            onChange={(e) => {
              setFechaNac(e.target.value);
              validateFecha(fechaNac);
            }}
            className={fechaError ? 'input-error' : ''}
          />
          {fechaError && <p className="error-message">{fechaError}</p>}
        </div>

        <label to="/terminos" className="recuerdame">
          <input type="checkbox" className="cuadro" />
          <Link to="/politicas-de-privacidad"> Acepta los términos y condiciones</Link>
        </label>

        <button
  className="btn btn-warning text2"
  type="submit"
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
  Registro
</button>
        <br />
      </form>
    </div>
  </div>
  </Layout>
  );
};

export default Registro;
