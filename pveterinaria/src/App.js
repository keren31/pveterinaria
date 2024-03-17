
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useLocation } from 'react-router-dom';
import './css/App.css'; // Importa tu archivo CSS
import Header from "./Header";
import Registro from './Registro'
import TrandingSlider from './TrandingSlider'

import ServicioCard from'./servicios'

import Error404 from './pagina_error';
import Login from './login1'
import RecuperarContra from './RecuperarContraseña';
import Token from './Token'
import Actualizar from './actualizar';
import AgendarCita from './AgendaCita';
import Fotter, { useState } from 'react';
import ProtectorRutas from './ProtectorRutas';


import Productos2 from './productos'; // Importa el componente Productos2
import imagen1 from './slider/imagen fondo1.jpg';


import { FaWhatsapp } from 'react-icons/fa';
import Perfil from './Perfil';
import DetalleCategoria from './DetalleCategoria';



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
  
  return (
    <div className="inicio-container">
      <div className="fondo-imagen">
        <img src={imagen1} alt="Registro" className="Imagen-inicio" />
        <div className="division">
          <h2>SE BIENVENIDO</h2>
          <p>
            ¡Te damos una cálida bienvenida a Estetica Canina Platon, donde la pasión por el cuidado y la estética de tus queridas mascotas se convierte en una experiencia extraordinaria!
          </p>
          <p>
            En nuestro santuario dedicado a la belleza y bienestar canino, nos esforzamos por ofrecer mucho más que un simple servicio de estética. Cada corte de pelo, cada baño relajante y cada tratamiento de spa es un acto de amor hacia tus peludos compañeros.
          </p>
        </div>
        <div className="bienvenida" style={{textAlign:'center'}}>
          <h1 className="titulo">Bienvenido a la Estetica Canina Platon</h1>
        </div>
      </div>
      <ServicioCard/>
      <div className='division2'></div>
      <TrandingSlider/>
      
    </div>
  );
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

function FAQ() {
  return (
    <div className="faq">
      <h2>Preguntas Frecuentes</h2>
      <div className="faq-item">
        <h3>¿Cuál es su política de cancelación?</h3>
        <p>Nuestra política de cancelación permite...</p>
      </div>
      <div className="faq-item">
        <h3>¿Cómo puedo programar una cita?</h3>
        <p>Puede programar una cita llamándonos al (123) 456-7890...</p>
      </div>
      {/* Agrega más preguntas y respuestas según sea necesario */}
    </div>
  );
}

function Footer() {
  const [showFAQ, setShowFAQ] = useState(false);

  const toggleFAQ = () => {
    setShowFAQ(!showFAQ);
  };

  return (
    <footer className='Footer'>
      <div className="contact-info">
        <h2>Contacto</h2>
        <p>Dirección: Calle de la Estética Canina, Ciudad</p>
        <p>Teléfono: (123) 456-7890</p>
        <p>Email: info@esteticacanina.com</p>
      </div>
      
      <div className="business-hours">
        <h2>Horario de Atención</h2>
        <p>Lunes a Viernes: 9:00 am - 6:00 pm</p>
        <p>Sábados: 10:00 am - 4:00 pm</p>
        <p>Domingos: Cerrado</p>
      </div>

      <div className="quick-links">
        <h2>Enlaces Rápidos</h2>
        <ul>
          <li><a href="/servicios">Servicios</a></li>
          <li><a href="/galeria">Galería</a></li>
          <li><a href="/tarifas">Tarifas</a></li>
          <li><button onClick={toggleFAQ}>Preguntas Frecuentes <span className={showFAQ ? 'rotate-arrow' : ''}>&#9660;</span></button></li>
        </ul>
      </div>

      {showFAQ && <FAQ />}

      <div className="whatsapp-link">
        <h2>Contactar por WhatsApp</h2>
        {/* Asegúrate de que WhatsAppLink es un componente que renderiza un enlace de WhatsApp */}
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
      <Header/> 
      <div className="App">
        <main className="main-content" >
          
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
            
            
             
             <Route path="/Categoria/:nombre/:duracion/:nombreServicio" element={<DetalleCategoria/>} />
             
             <Route path='/Perfil' element={<Perfil/>}/>
              <Route path='/Citas' element={<AgendarCita/>}/>
              <Route path='/administradoradmin' element={<AgendarCita/>}/>

           
     
  

            
          </Routes>
        </main>
        <Footer phoneNumber={phoneNumber} message={message}/>
      </div>
    </Router>
  );
}



export default App;
