import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useLocation } from 'react-router-dom';
import './css/App.css'; // Importa tu archivo CSS
import Header from "./Header";
import CategoriasServicio from './CategoriasServicio';
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
import HomeAdmin from './admin/HomeAdmin';
import Layout from './Layout';
import AdminUsuario from './admin/AdminUsuario';
import AdminProductos from './admin/AdminProductos';
import CitasAdmin from './admin/CitasAdmin';
import CardServicios from './componentes/CardServicios';



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
    <Layout>
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
        <div className="bienvenida">
          <h1 className="titulo">Bienvenido a la Estetica Canina Platon</h1>
        </div>
      </div>
     
     <CardServicios/>
    
      <div className='division2'></div>
      <TrandingSlider/>
      
    </div>
    </Layout>
  );
}







function QuienesSomos() {
  return (
    <Layout>
    <div className="contenedor">
      <div className="contenido">
        <h2>Quiénes Somos</h2>
        <p>En Estetica Canina Platon, estamos dedicados a algo más que simplemente embellecer a nuestras queridas mascotas. Somos una familia apasionada de amantes de los animales, comprometidos con el bienestar y la felicidad de cada peludo que cruza nuestras puertas.</p> <br/>
        <p>Nuestra historia se teje con hilos de amor y dedicación hacia los perros y sus cuidadores. Desde el momento en que decidimos embarcarnos en esta emocionante aventura, nos comprometimos a ofrecer un servicio excepcional que va más allá de lo común. Para nosotros, cada cola que mueve con alegría, cada ladrido de emoción y cada mirada de confianza son motivo de inspiración y gratitud.</p><br/>
        <p>En Estetica Canina Platon, nos esforzamos por crear un ambiente acogedor y seguro donde tanto los peludos como sus humanos se sientan como en casa. Nuestro equipo está formado por profesionales altamente capacitados y amantes de los animales que comprenden las necesidades individuales de cada cliente de cuatro patas. Ya sea un corte de pelo, un baño relajante o una sesión de cuidado de uñas, nos comprometemos a brindar un servicio de calidad que garantice la comodidad y el bienestar de tu fiel compañero.</p><br/>
        <p>Pero más allá de nuestras habilidades técnicas, lo que nos distingue es nuestro profundo amor por los animales y nuestro compromiso con la comunidad. Nos enorgullece colaborar con refugios locales, rescatando y rehabilitando perros necesitados, y promoviendo la adopción responsable. Cada vez que eliges Estetica Canina Platon, estás contribuyendo a nuestra misión de hacer del mundo un lugar mejor para todos los peludos.</p><br/>
        <p>Nos esforzamos por mantenernos a la vanguardia de las últimas tendencias y técnicas en el cuidado de mascotas, invirtiendo en capacitación continua y utilizando productos de alta calidad que sean seguros y respetuosos con el medio ambiente. Nuestro compromiso con la excelencia nos impulsa a superar las expectativas y a crear experiencias positivas que fortalezcan el vínculo entre humanos y animales.</p><br/>
        <p>En resumen, en Estetica Canina Platon, no solo nos preocupamos por la apariencia externa de tu peludo, sino también por su bienestar físico, emocional y espiritual. Somos más que una estética canina; somos una comunidad de amantes de los animales que trabajan juntos para hacer del mundo un lugar más feliz y saludable para todas las criaturas peludas. ¡Únete a nosotros en esta hermosa aventura de amor y cuidado animal!</p><br/>
        <p>¡Gracias por confiar en nosotros para el cuidado de tu mejor amigo!</p>
      </div>
    </div>
    </Layout>
  );
}


function PoliticasDePrivacidad() {
  return(
    <Layout>
      <div className="contenedor">
        <div className='Avisop' >
        <h2>Aviso de Privacidad</h2>
        <p>
          Estetica canina Platón, mejor conocido como Merari Mrtinez Gonzales,
          con domicilio en calle Ignacio Ramires, colonia El llano, ciudad Platón
          Sanchez, municipio o delegación Platón Sanchez, c.p. 02130, en la entidad
          de Veracruz de ignacio de la llave, país México, y portal de internet
          mmerari086@gmail.com, es el responsable del uso y protección de sus datos
          personales, y al respecto le informamos lo siguiente:
        </p>
        <h3>¿Para qué fines utilizaremos sus datos personales?</h3>
        <p>
          Los datos personales que recabamos de usted, los utilizaremos para las
          siguientes finalidades que son necesarias para el servicio que solicita:
        </p>
        <ul>
          <li>Fomentar la seguridad, la protección y la integridad.</li>
          <li>
            Compartir con terceros, como proveedores de servicios de pago, con el
            fin de procesar transacciones y proporcionar servicios adicionales.
          </li>
        </ul>
        <p>
          De manera adicional, utilizaremos su información personal para las siguientes
          finalidades secundarias que no son necesarias para el servicio solicitado,
          pero que nos permiten y facilitan brindarle una mejor atención:
        </p>
        <ul>
          <li>
            Enviar boletines informativos, ofertas especiales y promociones relacionadas
            con nuestros productos y servicios.
          </li>
          <li>Crear una cuenta de usuario en nuestro sitio web.</li>
          <li>Mercadotecnia o publicitaria</li>
        </ul>
        <p>
          En caso de que no desee que sus datos personales se utilicen para estos fines
          secundarios, indíquelo a continuación:
        </p>
        <form>
          <input type="checkbox" id="boletines" name="boletines" value="boletines" />
          <label htmlFor="boletines"> Enviar boletines informativos, ofertas especiales y promociones relacionadas con nuestros productos y servicios.</label><br />
          <input type="checkbox" id="crearCuenta" name="crearCuenta" value="crearCuenta" />
          <label htmlFor="crearCuenta"> Crear una cuenta de usuario en nuestro sitio web.</label><br />
          <input type="checkbox" id="mercadotecnia" name="mercadotecnia" value="mercadotecnia" />
          <label htmlFor="mercadotecnia"> Mercadotecnia o publicitaria</label><br />
        </form>
        <p>
          La negativa para el uso de sus datos personales para estas finalidades no podrá
          ser un motivo para que le neguemos los servicios y productos que solicita o
          contrata con nosotros.
        </p>
        <h3>¿Con quién compartimos su información personal y para qué fines?</h3>
        <p>
          Le informamos que sus datos personales son compartidos dentro del país con las
          siguientes personas, empresas, organizaciones o autoridades distintas a nosotros,
          para los siguientes fines:
        </p>
        <table>
          <thead>
            <tr>
              <th>Destinatario de los datos personales</th>
              <th>Finalidad</th>
              <th>Requiere del consentimiento</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Proveedores de Servicios de Pago</td>
              <td>Procesar transacciones de manera segura y efectiva.</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Servicios de Mensajería o Entrega</td>
              <td>Garantizar la entrega adecuada de productos.</td>
              <td>No</td>
            </tr>
          </tbody>
        </table>
        <h3>¿Cómo puede acceder, rectificar o cancelar sus datos personales, u oponerse a su uso?</h3>
        <p>
          Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los
          utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho
          solicitar la corrección de su información personal en caso de que esté desactualizada,
          sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o
          bases de datos cuando considere que la misma no está siendo utilizada adecuadamente
          (Cancelación); así como oponerse al uso de sus datos personales para fines específicos
          (Oposición). Estos derechos se conocen como derechos ARCO.
        </p>
        <p>
          Para el ejercicio de cualquiera de los derechos ARCO, usted deberá presentar la
          solicitud respectiva a través del siguiente medio: El titular de los datos cuenta
          con diversos medios a su disposición para ejercer sus derechos ARCO, los cuales
          incluyen solicitudes por escrito, correo electrónico y contacto directo a través
          de los datos de contacto proporcionados en este aviso de privacidad.
        </p>
        <p>
          Para conocer el procedimiento y requisitos para el ejercicio de los derechos ARCO,
          ponemos a su disposición el siguiente medio:
        </p>
        <p>
          El titular podrá obtener información detallada sobre el procedimiento que hemos
          implementado para atender las solicitudes de derechos ARCO a través de los datos
          de contacto proporcionados en este aviso de privacidad.
        </p>
        <p>
          Los datos de contacto de la persona o departamento de datos personales, que está
          a cargo de dar trámite a las solicitudes de derechos ARCO, son los siguientes:
        </p>
        <ul>
          <li>Nombre de la persona o departamento de datos personales: Merari Martinez Gonzales</li>
          <li>Domicilio: calle Ignacio Ramires, colonia El llano, ciudad Platón Sanchez, municipio o delegación Platón Sanchez, c.p. 02130, en la entidad de Veracruz de ignacio de la llave, país México</li>
          <li>Correo electrónico: mmerari086@gmail.com</li>
          <li>Número telefónico: 7891015447</li>
          <li>Otro dato de contacto: 7711853897</li>
        </ul>
        <h3>Usted puede revocar su consentimiento para el uso de sus datos personales</h3>
        <p>        Usted puede revocar el consentimiento que, en su caso, nos haya otorgado para
        el tratamiento de sus datos personales. Sin embargo, es importante que tenga en
        cuenta que no en todos los casos podremos atender su solicitud o concluir el
        uso de forma inmediata, ya que es posible que por alguna obligación legal
        requiramos seguir tratando sus datos personales. Asimismo, usted deberá considerar
        que para ciertos fines, la revocación de su consentimiento implicará que no le
        podamos seguir prestando el servicio que nos solicitó, o la conclusión de su
        relación con nosotros.
      </p>
      <p>
        Para revocar su consentimiento deberá presentar su solicitud a través del
        siguiente medio: El titular tiene a su disposición diversos medios para
        solicitar la revocación de su consentimiento, incluyendo el contacto directo
        a través de los datos de contacto proporcionados en este aviso de privacidad,
        así como solicitudes por escrito o correo electrónico.
      </p>
      <p>
        Para conocer el procedimiento y requisitos para la revocación del consentimiento,
        ponemos a su disposición el siguiente medio: El titular podrá obtener información
        detallada sobre el procedimiento que hemos implementado para atender las solicitudes
        de revocación del consentimiento a través de los datos de contacto proporcionados
        en este aviso de privacidad.
      </p>
      <h3>¿Cómo puede limitar el uso o divulgación de su información personal?</h3>
      <p>
        Con objeto de que usted pueda limitar el uso y divulgación de su información personal,
        le ofrecemos los siguientes medios:
      </p>
      <p>
        Ofrecemos al titular diversas opciones y medios para que pueda limitar el uso
        o divulgación de sus datos personales, incluyendo configuraciones de privacidad
        en su cuenta de usuario, solicitudes por escrito, o comunicándose con nosotros
        a través de los datos de contacto proporcionados en este aviso de privacidad.
      </p>
      <p>
        Asimismo, usted se podrá inscribir a los siguientes registros, en caso de que
        no desee obtener publicidad de nuestra parte:
      </p>
      <ul>
        <li>Registro Público de Usuarios, para mayor información consulte el portal de internet de la CONDUSEF</li>
      </ul>
      <h3>El uso de tecnologías de rastreo en nuestro portal de internet</h3>
      <p>
        Le informamos que en nuestra página de internet utilizamos cookies, web beacons
        u otras tecnologías, a través de las cuales es posible monitorear su comportamiento
        como usuario de internet, así como brindarle un mejor servicio y experiencia al
        navegar en nuestra página. Los datos personales que recabamos a través de estas
        tecnologías, los utilizaremos para los siguientes fines:
      </p>
      <ul>
        <li>Utilizaremos los datos personales obtenidos con el propósito de mejorar la experiencia del usuario, analizar patrones de navegación, personalizar el contenido y ofrecer servicios específicos</li>
      </ul>
      <p>
        Asimismo, le informamos que su información personal será compartida con las
        siguientes personas, empresas, organizaciones o autoridades distintas a nosotros,
        para los siguientes fines:
      </p>
      <table>
        <thead>
          <tr>
            <th>Destinatario de los datos personales</th>
            <th>Finalidad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Proveedores de Servicios de Pago</td>
            <td>Procesar transacciones de manera segura y efectiva.</td>
          </tr>
          <tr>
            <td>Servicios de Mensajería o Entrega</td>
            <td>Garantizar la entrega adecuada de productos.</td>
          </tr>
        </tbody>
      </table>
      <h3>¿Cómo puede conocer los cambios en este aviso de privacidad?</h3>
      <p>
        El presente aviso de privacidad puede sufrir modificaciones, cambios o
        actualizaciones derivadas de nuevos requerimientos legales; de nuestras
        propias necesidades por los productos o servicios que ofrecemos; de nuestras
        prácticas de privacidad; de cambios en nuestro modelo de negocio, o por otras
        causas.
      </p>
      <p>
        Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el
        presente aviso de privacidad, a través de: Notificaciones en nuestro sitio web,
        comunicaciones directas a través de correo electrónico o publicación destacada
        en el aviso de privacidad actualizado.
      </p>
      <p>
        El procedimiento a través del cual se llevarán a cabo las notificaciones sobre
        cambios o actualizaciones al presente aviso de privacidad es el siguiente:
      </p>
      <p>
        Notificar a los titulares de los datos a través de comunicaciones directas,
        publicar una versión actualizada del aviso de privacidad en nuestro sitio web
        y destacar los cambios significativos para garantizar una plena transparencia.
      </p>
      <h3>Su consentimiento para el tratamiento de sus datos personales</h3>
      <p>
        Consiento que mis datos personales sean tratados de conformidad con los términos
        y condiciones informados en el presente aviso de privacidad.
      </p>
      <p>
        Última actualización: 22/09/2023
      </p>
      </div>
    </div>
    </Layout>
  );

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
            
            <Route path='/admin' element={<HomeAdmin/>}/>
             
             <Route path="/Detallecat" element={<DetalleCategoria/>} />
             <Route path="/CategoriasServi" element={<CategoriasServicio/>} />
             
             <Route element={<ProtectorRutas/>}>
             <Route path='/Perfil' element={<Perfil/>}/>
              <Route path='/Citas' element={<AgendarCita/>}/>
              <Route path='/administradoradmin' element={<AgendarCita/>}/>

             </Route>

             /////////////////////////////////////
             <Route path="/admin-Usuario" element={<AdminUsuario/>}/>
             <Route path="/admin-producto" element={<AdminProductos/>} />
             <Route path="/admin-citas" element={<CitasAdmin/>} />
     
  

            
          </Routes>
        </main>
        
      </div>
    </Router>
  );
}



export default App;
