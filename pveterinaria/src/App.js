
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useLocation } from 'react-router-dom';



import './App.css'; // Importa tu archivo CSS
import Header from "./Header";
import Registro from './Registro'
import servicio1 from'./img/servicio1.jpg'
import ServicioCard from'./servicios'
import Productos2 from './productos';
import Error404 from './pagina_error';
import Login from './login1'
import RecuperarContra from './RecuperarContraseña';
import Token from './Token'
import Actualizar from './actualizar';


import { FaWhatsapp } from 'react-icons/fa';
const WhatsAppLink = ({ phoneNumber, message }) => {
  const handleWhatsAppClick = () => {
    const whatsappUrl = 'https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}';
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div>
      <p>Contact us on WhatsApp:</p>
      <button onClick={handleWhatsAppClick}>
        <FaWhatsapp size={30} />
      </button>
    </div>
  );
};


function Inicio() {
  

  return(
    <div class="bienvenida-container">


  <div class="contenedor">
    <div class="contenido">
      
        <h2>Bienvenido a la Estetica Canina Platon</h2>
        <a >
            <img class="imagen-estilo" src="https://www.kantekpremium.mx/wp-content/uploads/2021/09/estetica_canina.jpg"  />
            <p>
                ¡Te damos una cálida bienvenida a Estetica Canina Platon, donde la pasión por el cuidado y la estética de tus queridas mascotas se convierte en una experiencia extraordinaria!
            </p>

            <p>
                En nuestro santuario dedicado a la belleza y bienestar canino, nos esforzamos por ofrecer mucho más que un simple servicio de estética. Cada corte de pelo, cada baño relajante y cada tratamiento de spa es un acto de amor hacia tus peludos compañeros.
            </p>

            <p>
                Nuestro equipo de expertos, apasionados y amantes de los animales, trabaja incansablemente para garantizar que tu mascota reciba atención personalizada y cuidados de la más alta calidad. Desde el momento en que cruzas nuestras puertas, te sumergirás en un ambiente tranquilo y acogedor, diseñado para que tanto tú como tu mascota se sientan como en casa.
            </p>

            <p>
                En Estetica Canina Platon, entendemos que cada mascota es única, y tratamos a cada una con el respeto y la consideración que se merece. Ya sea que estés buscando un cambio de imagen completo para tu amigo de cuatro patas o simplemente quieras mimarlo con un tratamiento especial, estamos aquí para hacer que cada visita sea una experiencia excepcional.
            </p>

            <p>
                Navega por nuestras secciones para conocer más sobre los diversos servicios que ofrecemos, explora nuestra galería para ver ejemplos de nuestro trabajo y descubre nuestras tarifas transparentes. Estamos emocionados de formar parte del viaje de cuidado de tus mascotas y ansiosos por hacer que cada visita sea inolvidable.
            </p>

            <p>
                ¡Gracias por confiar en nosotros para el cuidado y la estética de tus adorables compañeros peludos! No dudes en ponerte en contacto con nosotros para programar una cita o para obtener más información sobre cómo podemos hacer que tu mascota se vea y se sienta increíble!
            </p>
            
        </a>

        
       <ServicioCard/>
      
    </div>
</div>

  <p>Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.</p>
</div>

  
    
  )
  ;
}


function QuienesSomos() {
  return <div class="contenedor"> 
  <div class="contenido">
  <h2>QUIENES SOMOS NOSOTROS</h2>
  
     <h2>Nuestra Misión</h2>
  <p>
    En <strong>Estetica Canina Platon</strong>, nos dedicamos apasionadamente a proporcionar servicios de estética y cuidado de mascotas de la más alta calidad. Nuestra misión es mejorar la calidad de vida y el bienestar de cada mascota que entra por nuestras puertas.
  </p>

  <p>
    <strong>Compromiso con la Excelencia:</strong> Nos esforzamos por alcanzar la excelencia en cada aspecto de nuestro trabajo. Desde cortes de pelo expertos hasta tratamientos de spa relajantes, estamos comprometidos a superar las expectativas de nuestros clientes y sus adorables compañeros peludos.
  </p>

  <p>
    <strong>Trato Personalizado:</strong> Reconocemos la singularidad de cada mascota y nos comprometemos a brindar un trato personalizado. Cada servicio está diseñado para satisfacer las necesidades específicas de cada amigo peludo, asegurando que se sientan cómodos y amados durante todo el proceso.
  </p>

  <p>
    <strong>Énfasis en el Bienestar:</strong> Priorizamos la salud y el bienestar de las mascotas en cada paso. Utilizamos productos de calidad y adoptamos prácticas seguras para garantizar que cada experiencia en nuestra estética canina contribuya positivamente a la vida de las mascotas y de sus dueños.
  </p>

  <p>
    <strong>Conexión Duradera:</strong> Más allá de ofrecer servicios, buscamos construir relaciones duraderas con nuestros clientes peludos y humanos. Queremos ser parte del viaje de cuidado de tus mascotas y ser el destino confiable para todas sus necesidades de estética canina.
  </p>
  </div>
  </div>
}

function PoliticasDePrivacidad() {
  return <h2>Políticas de Privacidad</h2>;
}

function Footer() {
  return (
    
    <footer className='Footer'>
        <div class="contact-info">
            <p>Dirección: Calle de la Estética Canina, Ciudad</p>
            <p>Teléfono: (123) 456-7890</p>
            <p>Email: info@esteticacanina.com</p>
        </div>
        
        <div class="business-hours">
            <p>Horario de Atención:</p>
            <p>Lunes a Viernes: 9:00 am - 6:00 pm</p>
            <p>Sábados: 10:00 am - 4:00 pm</p>
            <p>Domingos: Cerrado</p>
        </div>

        <div class="quick-links">
            <a href="/servicios">Servicios</a>
            <a href="/galeria">Galería</a>
            <a href="/tarifas">Tarifas</a>
            <a href="/testimonios">Testimonios</a>
        </div>

        <div class="quick-links">
          <WhatsAppLink phoneNumber={phoneNumber} message={message} />  
        </div>
        

       
    </footer>
  );
}
const phoneNumber = '7891216079'; // Reemplaza con el número de teléfono deseado
  const message = 'Hola, estoy interesado en sus servicios';

function App() {
  
  const servicios = [
    {
      id: 1,
      imagenSrc: 'URL_IMAGEN_SERVICIO_1',
      precio: '$500',
      descripcion: 'Servicio de Corte de Pelo Profesional',
    },
    // Agrega más servicios según sea necesario
  ];
  

  return (
    
    


    <Router>
      <div className="App">
      <Header/> 
        <main className="main-content">
          
          <Routes>
            
            <Route path="/" element={<Inicio/>} />
            <Route path="/Quienes-somos" element={<QuienesSomos />} />
            <Route path="/politicas-de-privacidad" element={<PoliticasDePrivacidad />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/servicio" element={<ServicioCard />} />
            <Route path="/Productos" element={<Productos2 />} />
            <Route path="/error404" element={<Error404 />} />
            <Route path="*" element={<Navigate to='/error404'/>} />
            <Route path="/login1" element={<Login/>} />
            <Route path="/recuperar" element={<RecuperarContra/>} />
            <Route path='/token' element={<Token/>}></Route>
            <Route path='/actualizar' element={<Actualizar/>}></Route>
            
          </Routes>
        </main>
        <Footer phoneNumber={phoneNumber} message={message}/>
      </div>
    </Router>
  );
}



export default App;
