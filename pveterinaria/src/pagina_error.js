import React from 'react';
import './css/PaguinaError.css'; // Importa tu archivo de estilos CSS aquí

const Error404 = () => {
  return (
    <div className='todo'>
      <img src="https://assets.codepen.io/1538474/404.svg" className="logo-404" alt="404" />
      <img src="https://assets.codepen.io/1538474/meteor.svg" className="meteor" alt="Meteor" />
      <div className=""></div>
      
      <p className="title">Oh no!!</p>
      <p className="subtitle">
        Has ingresado un URL inválido <br /> o una página que ya no existe.
      </p>

      {/* Centrado utilizando estilos en línea */}
      <div style={{ textAlign: 'center' }}>
        <br /><br />
        <a href="./productos" className="btn-back">
          Verifique si la ruta de la página que consultó es correcta o haga clic para regresar a la página anterior
        </a>
        <br /><br /><br /><br />
        <img src="https://assets.codepen.io/1538474/astronaut.svg" className="astronaut" alt="Astronaut" />
      </div>
    </div>
  );
}

export default Error404;
