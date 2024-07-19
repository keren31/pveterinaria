import React, { useState, useEffect } from 'react';
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
  Drawer,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useUser } from "./UserContext";
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

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('carrito');
    if (savedCart) {
      setCarrito(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const { user } = useUser();
  const [productData, setProductData] = useState([]);
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
 

  useEffect(() => {
    obtenterDatosProductos();
  //  obtenerProductoCarrito();
  }, []); 

  const obtenterDatosProductos = async () => {
    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/TraerProductosCan`,
        {
          method: 'GET',
          // No es necesario incluir el body para una solicitud GET
        }
      );

      if (response.ok) {
        const product1Data = await response.json();
        setProductData(product1Data);
        console.log(product1Data)
      } else {
        console.error('Error al obtener datos de los usuarios:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
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
    const existingProduct = carrito.find(item => item.id === producto.id);
    if (existingProduct) {
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const removeItemFromCart = (id) => {
    const existingProduct = carrito.find(item => item.id === id);
    if (existingProduct.cantidad === 1) {
      setCarrito(carrito.filter(item => item.id !== id));
    } else {
      setCarrito(carrito.map(item =>
        item.id === id
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      ));
    }
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const handlePurchase = () => {
    alert('Compra realizada!');
    setCarrito([]);
    closeCart();
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
          <Button variant="outlined" onClick={openCart}>
            Ver carrito <ShoppingCartIcon />
          </Button>
        </div>
        <Grid container spacing={3}>
          {(filteredProductos.length > 0 ? filteredProductos : productData).map((producto) => (
            <Grid item key={producto.idProducto} xs={20} sm={6} md={4}>
              <Card>
                <CardActionArea
                  style={{ display: 'flex', flexDirection: 'column', background: 'transparent' }}
                >
                  <CardMedia
                    component="img"                  
                    image={producto.Imagen}
                    style={{ transition: 'transform 0.3s', height: '200px' }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.3)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <CardContent style={{ flex: '1' }}>
                    <Typography variant="h6" component="div">
                      {producto.Nombre}
                      <Button
                        size="small"
                        style={{ marginLeft: '37%', margin: '10px', backgroundColor: 'orange', color: 'white' }}
                        onClick={() => addToCart(producto)}
                      >
                        Carrito
                      </Button>
                      <Badge badgeContent={carrito.filter(item => item.id === producto.id).reduce((acc, item) => acc + item.cantidad, 0)} color="primary">
                        {/* Mostrar cantidad de elementos en el carrito */}
                      </Badge>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {producto.Descripcion}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Precio: {producto.Precio}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Drawer del carrito */}
        <Drawer
          anchor="right"
          open={isCartOpen}
          onClose={closeCart}
        >
          <Container maxWidth="sm" style={{ marginTop: '60px', marginBottom: '20px', padding: '20px' }}>
            <Typography variant="h4" component="div" gutterBottom>
              Carrito de compras
            </Typography>
            {carrito.length > 0 ? (
              carrito.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={item.imagen} alt={item.nombre} style={{ width: '50px', marginRight: '10px' }} />
                    <div>
                      <Typography variant="body1">{item.nombre}</Typography>
                      <Typography variant="body2">{item.precio} x {item.cantidad}</Typography>
                    </div>
                  </div>
                  <IconButton onClick={() => removeItemFromCart(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))
            ) : (
              <Typography variant="body1">El carrito está vacío.</Typography>
            )}
            <Typography variant="h6" component="div" style={{ marginTop: '20px' }}>
              Total: ${carrito.reduce((total, item) => total + (parseFloat(item.precio.substr(1)) * item.cantidad), 0).toFixed(2)}
            </Typography>
            <Button variant="contained" color="primary" onClick={handlePurchase} style={{ marginTop: '20px' }}>
              Comprar
            </Button>
            <Button variant="outlined" onClick={closeCart} style={{ marginTop: '10px' }}>
              Cerrar
            </Button>
          </Container>
        </Drawer>
      </Container>
    </Layout>
  );
};

export default Productos2;
