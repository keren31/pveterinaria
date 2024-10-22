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
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useUser } from "./UserContext";
import Layout from './Layout';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';




const Productos2 = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [productData, setProductData] = useState([]);
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

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

  const [cart, setCart] = useState([]);


  const agregarAlCarrito = async (producto) => {
    const data = new FormData();
    data.append("idUsuario", user.idUsuario)
    data.append("idProducto", producto.idProducto)

    fetch(
      apiurll + "/api/CasaDelMarisco/AgregarProductosCarritoCAN",
      {
        method: "POST",
        body: data,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        if (result === 'Exito') {
          obtenerProductoCarrito();
          setIsCartOpen(true);
        } else {
          setIsCartOpen(false);
        }
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al procesar la solicitud',
        });
      });

  };

  const obtenerProductoCarrito = async () => {
    try {
      const response = await fetch(
        apiurll + `/api/CasaDelMarisco/TraerCarritoPorUsuarioCAN?idUsuario=${user.idUsuario}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data)
      setCart(data)
    } catch (error) {
      console.error("Error al obtener la informacion:", error);
    }
  }
  const eliminarDelCarrito = (productoAEliminar) => {
    const data = new FormData();
    data.append("idUsuario", user.idUsuario)
    data.append("idProducto", productoAEliminar.idProducto)
    data.append("idCarritoProductos", productoAEliminar.idCarritoProductos)

    fetch(
      apiurll + "/api/CasaDelMarisco/QuitarProductosCarritoCAN",
      {
        method: "POST",
        body: data,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        if (result === 'Exito') {

          obtenerProductoCarrito();
          setIsCartOpen(true);
        } else {
          setIsCartOpen(false);
        }
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al procesar la solicitud',
        });
      });

  };


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




  useEffect(() => {
    obtenterDatosProductos();
    obtenerProductoCarrito();
  }, [setCart]);

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
    let filtered = productData.filter(
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



  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
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
                      <Button onClick={() => agregarAlCarrito(producto)}
                        size="small"
                        style={{ marginLeft: '37%', margin: '10px', backgroundColor: 'orange', color: 'white' }}

                      >
                        Carrito
                      </Button >
                      <Badge badgeContent={carrito.filter(item => item.id === producto.id).reduce((acc, item) => acc + item.cantidad, 0)} color="primary">

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
            {cart.length > 0 ? (
              cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={item.Imagen} style={{ width: '150px', marginRight: '50px' }} alt='ksld' />
                    <div>
                      <Typography variant="body1" style={{ fontSize: '20px', marginRight: '50px' }}>{item.Nombre}</Typography>
                      <Typography variant="body2" style={{ fontSize: '15px' }}>{item.Precio} x {item.Cantidad}</Typography>
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-2'>

                    <button
                      type="button"
                      className="text-xl text-indigo-600 hover:text-indigo-500 p-1"
                      onClick={() => eliminarDelCarrito(item)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>

                    <span className="mx-2 text-xl">{item.Cantidad}</span>

                    <button
                      type="button"
                      className="text-xl text-indigo-600 hover:text-indigo-500 p-1"
                      onClick={() => agregarAlCarrito(item)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>


                  </div>
                </div>
              ))
            ) : (
              <Typography variant="body1" style={{ fontSize: '25px' }}>El carrito está vacío.</Typography>
            )}
            <Typography variant="h6" component="div" style={{ marginTop: '40px' }}>
              Total:
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/detalleCarrito")}
              style={{
                backgroundColor: 'blue',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.3s, transform 0.3s',
                marginRight: '50px',
                marginTop: ''
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'darkblue';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'blue';
                e.currentTarget.style.transform = 'scale(1)';
              }}>
              Comprar
            </Button>
            <Button
              variant="outlined"
              onClick={closeCart}
              style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.3s, transform 0.3s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'darkred';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'red';
                e.currentTarget.style.transform = 'scale(1)';
              }}>
              Cerrar
            </Button>

          </Container>
        </Drawer>
      </Container>
    </Layout>
  );
};

export default Productos2;
