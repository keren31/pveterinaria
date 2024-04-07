import React, { useState } from 'react';
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
  Badge,
  Modal
} from '@mui/material';

import producto1 from './imagenes2/Producto1.jpg';
import producto2 from './imagenes2/Producto2.jpg';
import producto3 from './imagenes2/Producto3.jpg';
import producto4 from './imagenes2/Producto4.jpg';
import producto5 from './imagenes2/producto5.jpg';
import producto6 from './imagenes2/producto6.jpg';
import Layout from './Layout';

const productos = [
  {
    id: 1,
    nombre: 'Cama',
    descripcion: 'Descripción del producto 1. Detalles adicionales sobre el producto.',
    precio: '$19.99',
    imagen: producto1,
  },
  {
    id: 2,
    nombre: 'Jugetes',
    descripcion: 'Descripción del producto 2. Detalles adicionales sobre el producto.',
    precio: '$29.99',
    imagen: producto2,
  },
  {
    id: 3,
    nombre: 'Comedero',
    descripcion: 'Descripción del producto 3. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    imagen: producto3,
  },
  {
    id: 4,
    nombre: 'Botella de agua',
    descripcion: 'Descripción del producto 4. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    imagen: producto4,
  },
  {
    id: 5,
    nombre: 'Cama',
    descripcion: 'Descripción del producto 5. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    imagen: producto5,
  },
  {
    id: 6,
    nombre: 'Cama',
    descripcion: 'Descripción del producto 6. Detalles adicionales sobre el producto.',
    precio: '$39.99',
    imagen: producto6,
  },
];

const Productos2 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const applyFilters = () => {
    let filtered = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(searchQuery) &&
        (maxPrice === '' || parseFloat(producto.precio.substr(1)) <= parseFloat(maxPrice))
    );

    setFilteredProductos(filtered);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setMaxPrice('');
    setFilteredProductos([]);
  };

  const addToCart = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const removeItemFromCart = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const openCartModal = () => {
    setIsCartOpen(true);
  };

  const closeCartModal = () => {
    setIsCartOpen(false);
  };

  return (
   <Layout>
     <Container maxWidth="md" style={{ marginTop: '60px', marginBottom: '20px' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <TextField
          label="Buscar productos"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginRight: '20px' }}
        />
        <TextField
          label="Precio máximo"
          type="number"
          variant="outlined"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          style={{ marginRight: '20px' }}
        />
        <Button variant="contained" onClick={applyFilters} style={{ marginRight: '20px' }}>
          Aplicar filtros
        </Button>
        <Button variant="outlined" onClick={resetFilters}>
          Restablecer filtros
        </Button>
        <Button variant="outlined" onClick={openCartModal}>Ver carrito</Button>
      </div>
      <Grid container spacing={3}>
        {(filteredProductos.length > 0 ? filteredProductos : productos).map((producto) => (
          <Grid item key={producto.id} xs={20} sm={6} md={4}>
            <Card>
              <CardActionArea
                style={{ display: 'flex', flexDirection: 'column', background: 'transparent' }}
              >
                <CardMedia
                  component="img"
                  alt={producto.nombre}                     
                  image={producto.imagen}
                  style={{ transition: 'transform 0.3s' ,height: '200px',}}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <CardContent style={{ flex: '1' }}>
                  <Typography variant="h6" component="div">
                    {producto.nombre}
                    <Button
                      size="small"
                      style={{ marginLeft: '37%', margin: '10px', backgroundColor: 'orange', color: 'white' }}
                      onClick={() => addToCart(producto)}
                    >
                      Carrito
                    </Button>
                    <Badge badgeContent={carrito.filter(item => item.id === producto.id).length} color="primary">
                      {/* Mostrar cantidad de elementos en el carrito */}
                    </Badge>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {producto.descripcion}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precio: {producto.precio}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal del carrito */}
      <Modal
        open={isCartOpen}
        onClose={closeCartModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Container maxWidth="sm" style={{ marginTop: '60px', marginBottom: '20px', backgroundColor: 'white', padding: '20px' }}>
          <Typography variant="h4" component="div" gutterBottom>
            Carrito de compras
          </Typography>
          {carrito.map(item => (
            <div key={item.id}>
              <p>{item.nombre} - {item.precio}</p>
              <Button onClick={() => removeItemFromCart(item.id)}>Eliminar</Button>
            </div>
          ))}
          <p>Total: ${carrito.reduce((total, item) => total + parseFloat(item.precio.substr(1)), 0)}</p>
        </Container>
      </Modal>
    </Container>
   </Layout>
  );
};

export default Productos2;
