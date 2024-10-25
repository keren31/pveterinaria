import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './css/DetalleCategoria.css'; // Importa el archivo de estilos CSS
import Layout from './Layout';

  const DetalleCategoria = ({ }) => {
  const navigate = useNavigate(); // Obtiene la función navigate
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null); // Estado para la categoría seleccionada
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null); // Estado para el servicio seleccionado

  // Obtener datos del localStorage al cargar el componente
  useEffect(() => {
    const categoriaLocalStorage = JSON.parse(localStorage.getItem('selectedCategoria'));
    const servicioLocalStorage = JSON.parse(localStorage.getItem('selectedService'));
    setCategoriaSeleccionada(categoriaLocalStorage);
    setServicioSeleccionado(servicioLocalStorage);
  }, []);

  const Volver = () => {
    navigate('/CategoriasServi');
  };

  const handleAgendarCitaClick = () => {
    navigate('/citas'); // Redirige al formulario de agendar citas
  };

  return (
    <Layout>
      <Card className="detalle-categoria-card">
        <CardContent>
          <Typography variant="h5" component="h2">
            Selección del servicio: {servicioSeleccionado ? servicioSeleccionado.nombre : ''}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Categoría: {categoriaSeleccionada ? categoriaSeleccionada.nombre : ''}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Duración del servicio: {categoriaSeleccionada ? categoriaSeleccionada.Duracion : ''} minutos
          </Typography>
          <Box mt={2}>
            <Button onClick={Volver} variant="outlined">
              Volver a Categorías de Servicio
            </Button>
            <Button onClick={handleAgendarCitaClick} variant="outlined">
              Agendar Cita
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default DetalleCategoria;

