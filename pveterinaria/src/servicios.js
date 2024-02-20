import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  Button,
  TextField,
} from '@mui/material';

import Servicio1 from './img/servicio1.jpg';
import servicio2 from './img/servicio2.jpg'
import servicio3 from './img/servicio3.jpg'


import { useState } from 'react';

const productos = [
  {
    id: 1,
    nombre: 'Servicio de corte de pelo',
    descripcion: '',
    precio: '$99.99',
    disponibles: 10,
    imagen: Servicio1,
  },
  {
    id: 2,
    nombre: 'Servicio de Baño',
    descripcion: '',
    precio: '$70.90',
    disponibles: 5,
    imagen: servicio2,
  },
  {
    id: 3,
    nombre: 'Servicio de corte de uñas',
    descripcion: '',
    precio: '$88.99',
    disponibles: 15,
    imagen: servicio3,
  },
  
 
  
];
  const ServicioCard = () => {

 

  return (
    
    <Container maxWidth="md" style={{ marginTop: '20px', marginBottom: '20px' }}>
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
    <h1>Servicios de la estetica</h1>
    </div>
    <Grid container spacing={3}>
      {productos.map((producto) =>  (
        <Grid item key={producto.id} xs={20} sm={6} md={4}>
          <Card>
            <CardActionArea style={{ display: 'flex', flexDirection: 'column', background: 'transparent' }}>
              <CardMedia
                component="img"
                alt={producto.nombre}
                height="160"
                image={producto.imagen}
              />
              <CardContent style={{ flex: '1' }}>
                <Typography variant="h6" component="div">
                  {producto.nombre}
                 
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {producto.descripcion}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Precio: {producto.precio}
                </Typography>
                <Button
                    size="small"
                    
                    style={{ marginLeft: '37%', margin: '10px', backgroundColor: 'blue', color: 'white' }}
                  >
                  Carrito
                  </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
  );
};

export default ServicioCard;