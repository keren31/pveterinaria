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

import producto1 from './imagenes2/Producto1.jpg';
import producto2 from './imagenes2/Producto2.jpg';
import producto3 from './imagenes2/Producto3.jpg';
import producto4 from './imagenes2/Producto4.jpg';
import producto5 from './imagenes2/producto5.jpg';
import producto6 from './imagenes2/producto6.jpg';



import { useState } from 'react';

const productos = [
  {
    id: 1,
    nombre: 'Cama',
    descripcion: 'Descripción del producto 1. Detalles adicionales sobre el producto.',
    precio: '$19.99',
    disponibles: 10,
    imagen: producto1,
  },
  {
    id: 2,
    nombre: 'Jugetes',
    descripcion: 'Descripción del producto 2. Detalles adicionales sobre el producto.',
    precio: '$29.99',
    disponibles: 5,
    imagen: producto2,
  },
  {
    id: 3,
    nombre: 'Comedero',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    disponibles: 15,
    imagen: producto3,
  },
  {
    id: 4,
    nombre: 'Botella de agua',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    disponibles: 15,
    imagen: producto4,
  },
  {
    id: 5,
    nombre: 'cama',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    disponibles: 15,
    imagen: producto5,
  },{
    id: 6,
    nombre: 'cama',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    disponibles: 15,
    imagen: producto6,
  },
  {
    id: 7,
    nombre: 'Producto 3',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    disponibles: 15,
    imagen: producto1,
  },
  {
    id: 8,
    nombre: 'Producto 3',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    disponibles: 15,
    imagen: producto1,
  },
  {
    id: 9,
    nombre: 'Producto 3',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    disponibles: 15,
    imagen: producto1,
  },
  {
    id: 10,
    nombre: 'Producto 3',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    disponibles: 15,
    imagen: producto1,
  },
  {
    id: 11,
    nombre: 'bebida',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$30',
    disponibles: 15,
    imagen: producto1,
  },
  {
    id: 12,
    nombre: 'bebida',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$50.99',
    disponibles: 15,
    imagen: producto1,
  },
  
  
];
  const Productos2 = () => {

 
 
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(true);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filtrar productos basados en la búsqueda
    const filtered = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(query) &&
        (maxPrice === '' || parseFloat(producto.precio.substr(1)) <= parseFloat(maxPrice))
    );

    setFilteredProductos(filtered);
    setShowAllProducts(false);
  };

  const handleMaxPriceChange = (event) => {
    const price = event.target.value;
    setMaxPrice(price);
  };

  const applyFilters = () => {
    // Filtrar productos basados en la búsqueda y el precio máximo
    const filtered = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(searchQuery) &&
        (maxPrice === '' || parseFloat(producto.precio.substr(1)) <= parseFloat(maxPrice))
    );

    setFilteredProductos(filtered);
    setShowAllProducts(false);
  };



  return (
    <Container maxWidth="md" style={{ marginTop: '20px', marginBottom: '20px' }}>
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <TextField
        label="Buscar productos"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        label="Precio máximo"
        type="number"
        variant="outlined"
        value={maxPrice}
        onChange={handleMaxPriceChange}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" onClick={applyFilters}>
        Aplicar filtros
      </Button>
    </div>
    <Grid container spacing={3}>
      {(showAllProducts ? productos : filteredProductos).map((producto) => (
        <Grid item key={producto.id} xs={20} sm={6} md={4}>
          <Card>
            <CardActionArea style={{ display: 'flex', flexDirection: 'column', background: 'transparent' }}>
              <CardMedia component="img" alt={producto.nombre} height="160" image={producto.imagen} />
              <CardContent style={{ flex: '1' }}>
                <Typography variant="h6" component="div">
                  {producto.nombre}
                  <Button
                    size="small"
                    
                    style={{ marginLeft: '37%', margin: '10px', backgroundColor: 'orange', color: 'white' }}
                  >
                    Carrito
                  </Button>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {producto.descripcion}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Precio: {producto.precio}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Disponibles: {producto.disponibles}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
  );
};

export default Productos2;