import React from 'react';
import Header from './Header';
import './css/App.css';
import { Link } from 'react-router-dom';

export default function Layout({children}) {

    function Footer() {
        return (
          <footer className='Footer'>
            <div className="footer-section contact-info">
              <h2>Contacto</h2>
              <p>Dirección: Calle de la Estética Canina, Ciudad</p>
              <p>Teléfono: (123) 456-7890</p>
              <p>Email: info@esteticacanina.com</p>
            </div>
            
            <div className="footer-section business-hours">
              <h2>Horario de Atención</h2>
              <p>Lunes a Viernes: 9:00 am - 6:00 pm</p>
              <p>Sábados: 10:00 am - 4:00 pm</p>
              <p>Domingos: Cerrado</p>
            </div>
      
            <div className="footer-section quick-links">
              <h2>Enlaces Rápidos</h2>
              <ul>
                <li><Link to="/direccion">Servicios</Link></li>
                <li><Link to="/galeria">Galería</Link></li>
                <li><Link to="/tarifas">Tarifas</Link></li>
                <li><Link to="/preguntas-frecuentes">Preguntas frecuentes</Link></li>
              </ul>
            </div>
      
            <div className="footer-section social-media">
              <h2>Redes Sociales</h2>
              <div className="social-icons">
                <a href="https://www.facebook.com"><i className="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
                <a href="https://www.instagram.com"><i className="fab fa-instagram"></i></a>
                <a href="https://www.youtube.com"><i className="fab fa-youtube"></i></a>
                <a href="https://www.linkedin.com"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </footer>
        );
    }
    
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    );
}
