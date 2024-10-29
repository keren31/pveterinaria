import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Servicio1 from './imgServicios/servicio1.jpg';
import servicio2 from './imgServicios/servicio2.jpg';
import servicio3 from './imgServicios/servicio3.jpg';
import servicio4 from './imgServicios/servicio4.jpg';
import servicio5 from './imgServicios/servicio5.jpg';
import servicio6 from './imgServicios/Servicio6.webp';

// Importa las imágenes restantes aquí
import imagenCategoriaChico from './img/categoriaimg/perropeque.webp';
import imagenCategoriaMediano from './img/categoriaimg/perromediano.jpg';
import imagenCategoriaGrande from './img/categoriaimg/perrogrande.jpg';
import Layout from './Layout';

const productos = [
  {
    id: 1,
    nombre: 'Servicio de corte de pelo',
    descripcion: '',
    precio: '$99.99',
    disponibles: 10,
    imagen: Servicio1,
    categorias: [
      { nombre: 'Perro Chico', imagen: imagenCategoriaChico, Duracion: '30 minutos', nombreServicio: 'Servicio de corte de pelo' },
      { nombre: 'Perro Mediano', imagen: imagenCategoriaMediano, Duracion: '01:00 hrs', nombreServicio: 'Servicio de corte de pelo' },
      { nombre: 'Perro Grande', imagen: imagenCategoriaGrande, Duracion: '01:00 hrs', nombreServicio: 'Servicio de corte de pelo' },
    ],
  },

  {
    id: 2,
    nombre: 'Servicio de Baño',
    descripcion: '',
    precio: '$70.90',
    disponibles: 5,
    imagen: servicio2,
    categorias: [
      { nombre: 'Chico', imagen: imagenCategoriaChico, Duracion: '01:00 hrs', nombreServicio: 'Servicio de Baño' },
      { nombre: 'Mediano', imagen: imagenCategoriaMediano, Duracion: '01:30 hrs', nombreServicio: 'Servicio de Baño' },
      { nombre: 'Grande', imagen: imagenCategoriaGrande, Duracion: '02:00 hrs', nombreServicio: 'Servicio de Baño' },
    ],
  },
  {
    id: 3,
    nombre: 'Servicio de corte de uñas',
    descripcion: '',
    precio: '$88.99',
    disponibles: 15,
    imagen: servicio3,
    categorias: [
      { nombre: 'Chico', imagen: imagenCategoriaChico, Duracion: '30 minutos', nombreServicio: 'Servicio de corte de uñas' },
      { nombre: 'Mediano', imagen: imagenCategoriaMediano, Duracion: '30 minutos', nombreServicio: 'Servicio de corte de uñas' },
      { nombre: 'Grande', imagen: imagenCategoriaGrande, Duracion: '30 minutos', nombreServicio: 'Servicio de corte de uñas' },
    ],
  },
  {
    id: 4,
    nombre: 'Servicio de higiene dental',
    descripcion: '',
    precio: '$88.99',
    disponibles: 15,
    imagen: servicio4,
    categorias: [
      { nombre: 'Chico', imagen: imagenCategoriaChico, Duracion: '45 minutos', nombreServicio: 'Servicio de higiene dental' },
      { nombre: 'Mediano', imagen: imagenCategoriaMediano, Duracion: '45 minutos', nombreServicio: 'Servicio de higiene dental' },
      { nombre: 'Grande', imagen: imagenCategoriaGrande, Duracion: '45 minutos', nombreServicio: 'Servicio de higiene dental' },
    ],
  },
  {
    id: 5,
    nombre: 'Servicio de SPA',
    descripcion: '',
    precio: '$88.99',
    disponibles: 15,
    imagen: servicio5,
    categorias: [
      { nombre: 'Chico', imagen: imagenCategoriaChico, Duracion: '30 minutos', nombreServicio: 'Servicio de SPA' },
      { nombre: 'Mediano', imagen: imagenCategoriaMediano, Duracion: '01:00 hrs', nombreServicio: 'Servicio de SPA' },
      { nombre: 'Grande', imagen: imagenCategoriaGrande, Duracion: '01:00 hrs', nombreServicio: 'Servicio de SPA' },
    ],
  },
  {
    id: 6,
    nombre: 'Tratamiento para la Sarna',
    descripcion: '',
    precio: '$88.99',
    disponibles: 15,
    imagen: servicio6,
    categorias: [
      { nombre: 'Chico', imagen: imagenCategoriaChico, Duracion: '45 minutos', nombreServicio: 'Tratamiento para la Sarna' },
      { nombre: 'Mediano', imagen: imagenCategoriaMediano, Duracion: '01:00 hrs', nombreServicio: 'Tratamiento para la Sarna' },
      { nombre: 'Grande', imagen: imagenCategoriaGrande, Duracion: '01:30 hrs', nombreServicio: 'Tratamiento para la Sarna' },
    ],
  },
];

const CardServicios = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleServiceClick = (selectedService) => {
    localStorage.setItem('selectedService', JSON.stringify(selectedService));
    navigate('/CategoriasServi');
  };
  

  return (
    <Layout>
    <Container className="servicio-container">
      <div className="titulo-container text-center">
        <Typography variant="h3" marginTop={'70px'} component="h1" padding={'35px'} justifyContent={'center'} gutterBottom>
          Servicios
        </Typography>
      </div>
      <Grid container spacing={3}>
        {productos.map((producto) => (
          <Grid item key={producto.id} xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea
                className="card-action-area"
                onClick={() => handleServiceClick(producto)}
              >
                {isOnline ? (
                  <CardMedia
                    component="img"
                    alt={producto.nombre}
                    image={producto.imagen}
                    style={{ transition: 'transform 0.3s', height: '200px' }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                ) : (
                  <div style={{ height: '200px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Imagen no disponible sin conexión
                    </Typography>
                  </div>
                )}
                <CardContent>
                  <Typography variant="h6" component="div">
                    {producto.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {producto.descripcion}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precio: {producto.precio}
                  </Typography>
                  <Button size="small" className="carrito-button">
                    Carrito
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </Layout>
  );
};

export default CardServicios;
