import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './css/DetalleCategoria.css'; // Importa el archivo de estilos CSS

const DetalleCategoria = ({ volverACategoriasServicio }) => {
  const { nombre, duracion, nombreServicio } = useParams(); // Obtiene los parámetros de la URL
  const navigate = useNavigate(); // Obtiene la función navigate

  const Volver = () => {
    navigate('/Categoria');
  };

  return (
    <Card className="detalle-categoria-card">
      <CardContent>
        <Typography variant="h5" component="h2">
          Usted eligió: {nombreServicio}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Categoría: {nombre}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Duración del servicio: {duracion} minutos
        </Typography>
        <Box mt={2}> {/* Añade un espacio en la parte superior */}
          <Button onClick={Volver} variant="outlined">
            Volver a Categorías de Servicio
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DetalleCategoria;
