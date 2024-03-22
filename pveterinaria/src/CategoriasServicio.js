import React,{useState}from 'react';
import { Typography, Grid, Button, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate


const CategoriasServicio = ({ categorias, volverASeleccionServicio }) => {
    const [setSelectedCategoriaService] = useState(null);
    const volverACategoriasServicio = () => {
        setSelectedCategoriaService(null);
      };
  const navigate = useNavigate(); // Usa el hook useNavigate

  const handleVerServiciosClick = (nombre, duracion, nombreServicio) => {
    navigate(`/categoria/${nombre}/${duracion}/${nombreServicio}`); // Navega a la página de detalles de la categoría
  };

  return (
    <div style={{ marginTop: '90px', padding: '20px', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h3" component="h1" style={{ marginBottom: '20px' }}>
        Categorías del Servicio
      </Typography>
      <Grid container spacing={3}>
        {categorias.map((categoria, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea>
              <CardMedia
                        component="img"
                        alt={categoria.nombre}                     
                        image={categoria.imagen}
                        style={{ transition: 'transform 0.3s' ,height: '200px',}}
                        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        
                />
                
                
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {categoria.nombre}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Duración: {categoria.Duracion} 
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleVerServiciosClick(categoria.nombre, categoria.Duracion,categoria.nombreServicio)}
                  >
                    Ver servicios
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="outlined" onClick={volverASeleccionServicio} style={{ marginTop: '20px' }}>
        Volver a seleccionar servicio
      </Button>
    </div>
  );
};

export default CategoriasServicio;
