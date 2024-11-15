// EncuestaSatisfaccion.js
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const EncuestaSatisfaccion = ({ onClose, userId }) => {
  const apiUrl = "https://lacasadelmariscoweb.azurewebsites.net/api/EsteticaApi/InsertarRespuesta";
    const navigate =useNavigate()
  const enviarRespuesta = (question, rating) => {
    const formData = new FormData();
    formData.append('Calificacion', question);
    formData.append('idPregunta', rating);
    formData.append('IdUsuario', userId);
    console.log(userId);
    fetch(apiUrl, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Respuesta enviada para la pregunta ${question}:`, data);
      })
      .catch((error) => {
        console.error('Error al enviar la respuesta:', error);
      });
  };

  useEffect(() => {
    const mostrarEncuesta = () => {
      Swal.fire({
        title: 'Encuesta de satisfacción',
        html:
          '<p>¡Ayúdanos a mejorar! Responde una breve encuesta sobre tu experiencia.</p>' +
          '<p>¿Qué tan fácil fue navegar por el sitio web para agendar su cita?</p>' +
          '<label><input type="radio" name="facilidad" value="1"/> Fácil</label>' +
          '<label><input type="radio" name="facilidad" value="2"/> Regular</label>' +
          '<label><input type="radio" name="facilidad" value="3"/> Difícil</label>' +
          '<p>¿Qué tan satisfecho(a) está con el diseño y la rapidez de carga de la aplicación?</p>' +
          '<label><input type="radio" name="satisfaccion" value="1"/> Satisfecho</label>' +
          '<label><input type="radio" name="satisfaccion" value="2"/> Regular</label>' +
          '<label><input type="radio" name="satisfaccion" value="3"/> Insatisfecho</label>',
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        preConfirm: () => {
          const facilidad = document.querySelector('input[name="facilidad"]:checked')?.value;
          const satisfaccion = document.querySelector('input[name="satisfaccion"]:checked')?.value;

          const responses = [
            { question: 1, rating: facilidad },
            { question: 2, rating: satisfaccion }
          ];

          return responses;
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const responses = result.value;
          responses.forEach((response) => {
            enviarRespuesta(response.question, response.rating);
          });
          if (onClose) onClose(); // Solo cerrar el modal
          navigate('/mis-Citas')
        } else {
          if (onClose) onClose(); // Cerrar el modal si se cancela
        }
      });
    };

    mostrarEncuesta();
  }, [onClose, userId]);

  return null;
};

export default EncuestaSatisfaccion;