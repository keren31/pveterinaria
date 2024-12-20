import React, { useEffect, useState } from 'react';
import { Typography, Grid, Button, Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const CategoriasServicio = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine); // Estado para la conexión
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar los productos del almacenamiento local
    const productosLocalStorage = JSON.parse(localStorage.getItem('selectedService'));
    if (productosLocalStorage) {
      setCategorias(productosLocalStorage.categorias);
    }

    // Escuchar cambios en el estado de conexión
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleVerServiciosClick = (categoria) => {
    setCategoriaSeleccionada(categoria);
    localStorage.setItem('selectedCategoria', JSON.stringify(categoria));
    navigate(`/Detallecat`);
  };

  const volverASeleccionServicio = () => {
    navigate("/servicio");
  };

  return (
    <Layout>
      <div style={{ marginTop: '90px', padding: '20px', backgroundColor: '#f9f9f9' }}>
        <Typography variant="h3" component="h1" style={{ marginBottom: '20px' }}>
          Categorías del Servicio
        </Typography>
        <Grid container spacing={3}>
          {categorias.map((categoria, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea onClick={() => handleVerServiciosClick(categoria)}>
                  {isOnline ? (
                    <CardMedia
                      component="img"
                      alt={categoria.nombre}
                      image={categoria.imagen}
                      style={{ transition: 'transform 0.3s', height: '200px' }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  ) : (
                    <div
                      style={{
                        height: '200px',
                        backgroundColor: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Imagen no disponible sin conexión
                      </Typography>
                    </div>
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {categoria.nombre}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      Duración: {categoria.Duracion}
                    </Typography>
                    <Button variant="contained" color="primary">
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
    </Layout>
  );
};

export default CategoriasServicio;
