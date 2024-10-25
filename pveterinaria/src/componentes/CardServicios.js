import React, { } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Servicio1 from '../imgServicios/servicio1.jpg';
import servicio2 from '../imgServicios/servicio2.jpg';
import servicio3 from '../imgServicios/servicio3.jpg';
import servicio4 from '../imgServicios/servicio4.jpg';
import servicio5 from '../imgServicios/servicio5.jpg';
import servicio6 from '../imgServicios/Servicio6.webp';


// Importa las imágenes restantes aquí

import imagenCategoriaChico from '../img/categoriaimg/perropeque.webp';
import imagenCategoriaMediano from '../img/categoriaimg/perromediano.jpg';
import imagenCategoriaGrande from '../img/categoriaimg/perrogrande.jpg';


const productos = [
  {
    id: 1,
    nombre: 'Servicio de corte de pelo',
    descripcion: '',
    precio: '$99.99',
    disponibles: 10,
    imagen: Servicio1,
    categorias: [
      { nombre: 'Perro Chico', imagen: imagenCategoriaChico , Duracion:'30 minutos' ,nombreServicio: 'Servicio de corte de pelo'}, // Agrega las imágenes correspondientes a cada categoría
      { nombre: 'Perro Mediano', imagen: imagenCategoriaMediano,Duracion:' 01:00 hrs',nombreServicio: 'Servicio de corte de pelo' },
      { nombre: 'Perro Grande', imagen: imagenCategoriaGrande,Duracion:'01:00 hrs',nombreServicio: 'Servicio de corte de pelo'},
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
      { nombre: 'Chico', imagen: imagenCategoriaChico,Duracion:'01:00 hrs' ,nombreServicio: 'Servicio de Baño'}, // Agrega las imágenes correspondientes a cada categoría
      { nombre: 'Mediano', imagen: imagenCategoriaMediano,Duracion:'01:30 hrs' ,nombreServicio: 'Servicio de Baño' },
      { nombre: 'Grande', imagen: imagenCategoriaGrande,Duracion:'02:00 hrs' ,nombreServicio: 'Servicio de Baño' },
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
      { nombre: 'Chico', imagen: imagenCategoriaChico, Duracion:'30 minutos' ,nombreServicio: 'Servicio de corte de uñas' }, // Agrega las imágenes correspondientes a cada categoría
      { nombre: 'Mediano', imagen: imagenCategoriaMediano,Duracion:'30 minutos' ,nombreServicio: 'Servicio de corte de uñas' },
      { nombre: 'Grande', imagen: imagenCategoriaGrande,Duracion:'30 minutos' ,nombreServicio: 'Servicio de corte de uñas'},
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
      { nombre: 'Chico', imagen: imagenCategoriaChico,Duracion:'45 minutos' ,nombreServicio: 'Servicio de higiene dental' }, // Agrega las imágenes correspondientes a cada categoría
      { nombre: 'Mediano', imagen: imagenCategoriaMediano, Duracion:'45 minutos' ,nombreServicio: 'Servicio de higiene dental' },
      { nombre: 'Grande', imagen: imagenCategoriaGrande, Duracion:'45 minutos' ,nombreServicio: 'Servicio de higiene dental' },
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
      { nombre: 'Chico', imagen: imagenCategoriaChico, Duracion:'30 minutos' ,nombreServicio: 'Servicio de SPA'  }, // Agrega las imágenes correspondientes a cada categoría
      { nombre: 'Mediano', imagen: imagenCategoriaMediano, Duracion:'01:00 hrs' ,nombreServicio: 'Servicio de SPA'  },
      { nombre: 'Grande', imagen: imagenCategoriaGrande, Duracion:'01:00 hrs' ,nombreServicio: 'Servicio de SPA'  },
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
      { nombre: 'Chico', imagen: imagenCategoriaChico,  Duracion:'45 minutos' ,nombreServicio: 'Tratamiento para la Sarna'  }, // Agrega las imágenes correspondientes a cada categoría
      { nombre: 'Mediano', imagen: imagenCategoriaMediano,Duracion:'01:00 hrs' ,nombreServicio: 'Tratamiento para la Sarna' },
      { nombre: 'Grande', imagen: imagenCategoriaGrande,Duracion:'01:30hrs' ,nombreServicio: 'Tratamiento para la Sarna' },
    ],
  },

  // Repite el mismo patrón para los otros productos
];

const CardServicios = () => {
 
  const navigate = useNavigate();

  const handleServiceClick = (selectedService) => {
    // Guardar el servicio seleccionado en localStorage
    localStorage.setItem('selectedService', JSON.stringify(selectedService));
    // Navegar al siguiente componente
    navigate('/CategoriasServi');
  };

  return (
   
      <Container className="servicio-container">
      <div className="titulo-container max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
        <Typography variant="h3" component="h1" className="mt-5 px-4 text-center   xl:text-6xl" gutterBottom>
          Servicios 
        </Typography>
      </div>
      <Grid container spacing={3} className='mt-2'>
        {productos.map((producto) => (
          <Grid item key={producto.id} xs={12} sm={6} md={4}>
            <Card>
              <CardActionArea
                className="card-action-area"
                onClick={() => handleServiceClick(producto)}
              >
                <CardMedia
                        component="img"
                        alt={producto.nombre}                     
                        image={producto.imagen}
                        style={{ transition: 'transform 0.3s' ,height: '200px',}}
                        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        
                />
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
    
  );
};

export default CardServicios;