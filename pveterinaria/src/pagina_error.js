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
          Has ingresado un URL invalido <br /> o una paguina que ya no existe .


          <div align="center">
          <br/><br/>
          <a href="./productos" className="btn-back">Verifique si la ruta de la paguina que consulto es correcta 
          o de click para regresar a la paguina anterior</a>
          <br/><br/><br/><br/>
          <img src="https://assets.codepen.io/1538474/astronaut.svg" className="astronaut" alt="Astronaut" />
        
        </div>
        </p>
        
        
        
      </div>
    );
  }
  
  export default Error404;
