import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EncuestaSatisfaccion.css'; // Archivo CSS para estilos

const EncuestaSatisfaccion = ({ onClose, userId }) => {
  const apiUrl = "https://lacasadelmariscoweb.azurewebsites.net/api/EsteticaApi/InsertarRespuesta";
  const navigate = useNavigate();

  const enviarRespuesta = (question, rating) => {
    const formData = new FormData();
    formData.append('Calificacion', rating);
    formData.append('idPregunta', question);
    formData.append('IdUsuario', userId);

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
        title: 'Ayúdanos a mejorar',
        
        html: `
        
          <div class="encuesta">
            <p>¿Qué tan fácil fue navegar por la aplicación web para agendar su cita?</p>
            <div class="opciones" data-question="1">
              <button data-value="1">😍</button>
              <button data-value="2">😊</button>
              <button data-value="3">😞</button>
            </div>
            <p>¿Qué tan satisfecho(a) está con el diseño y la rapidez de carga de la aplicación?</p>
            <div class="opciones" data-question="2">
              <button data-value="1">😍</button>
              <button data-value="2">😊</button>
              <button data-value="3">😞</button>
            </div>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Enviar',
        preConfirm: () => {
          const respuestas = [];
          document.querySelectorAll('.opciones').forEach((opcion) => {
            const question = opcion.getAttribute('data-question');
            const value = opcion.querySelector('button.selected')?.getAttribute('data-value');
            if (value) {
              respuestas.push({ question, rating: value });
            }
          });
          if (respuestas.length !== 2) {
            Swal.showValidationMessage('Por favor responde todas las preguntas');
            return false;
          }
          return respuestas;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const responses = result.value;
          responses.forEach((response) => {
            enviarRespuesta(response.question, response.rating);
          });
          if (onClose) onClose(); // Cerrar el modal
          navigate('/mis-Citas');
        } else {
          if (onClose) onClose()
            navigate('/'); // Cerrar el modal si se cancela
        }
      });

      // Agregar interacción para los botones (emojis)
      document.querySelectorAll('.opciones button').forEach((button) => {
        button.addEventListener('click', () => {
          const parent = button.parentElement;
          parent.querySelectorAll('button').forEach((btn) => btn.classList.remove('selected'));
          button.classList.add('selected');
        });
      });
    };

    mostrarEncuesta();
  }, [onClose, userId]);

  return null;
};

export default EncuestaSatisfaccion;
