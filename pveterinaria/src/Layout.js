    import React, { useState } from 'react'
import Header from './Header'


    
    export default function Layout({children}) {

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
          
             
          
              </footer>
            );
          }
          
        
      return (
        <>
          <Header/>
          {children}
          <Footer/>
        </>
      )
    }


    