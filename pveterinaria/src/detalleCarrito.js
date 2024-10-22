import {Typography } from '@material-tailwind/react';
import React, { useState, useEffect ,useCallback} from 'react';
import { useUser } from "./UserContext";
import ReactDOM from 'react-dom';
import Swal from "sweetalert2";
import './css/login.css'
import Layout from './Layout';

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM }) ;

const CarritoDetalle = () => {
  const { user } = useUser();
  const [isLoading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);
  const [direcciones,setDirecciones]= useState();
  const [total,setTotal]= useState(20);
  
  const [Direccion,setDirecion]= useState();

  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  
  const obtenerIdUsuario = useCallback((user) => {
    return user?.idUsuario ?? null;
  }, []);
  
  const obtenerDirecciones = useCallback(async () => {
    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/TraerDirecciones?UsuarioID=${user.idUsuario}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();     
      if (Array.isArray(data)) {
        setDirecciones(data);
        console.log("Direcciones obtenidas:", data);
      } else {
        console.error("La respuesta de la API no es un array:", data);
        setDirecciones([]);
      }
    } catch (error) {
      console.error("Error al obtener reservaciones:", error);
    } finally {
      setLoading(false); 
    }
  },[apiurll, user.idUsuario]);

  const agregarAlCarrito = async (producto) => {
    const data = new FormData();
    data.append("idUsuario",user.idUsuario)
    data.append("idProducto",producto.idProducto)

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
      } else {
      
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

  const eliminarDelCarrito = (productoAEliminar) => {
    const data = new FormData();
    data.append("idUsuario",user.idUsuario)
    data.append("idProducto",productoAEliminar.idProducto)
    data.append("idCarritoProductos",productoAEliminar.idCarritoProductos)

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
      } else {
         
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

  const obtenerProductoCarrito = useCallback(async () => {
    const id = obtenerIdUsuario(user);
    if (id !== null) {
      try {
        const response = await fetch(
          apiurll + `/api/CasaDelMarisco/TraerCarritoPorUsuarioCAN?idUsuario=${id}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setCarrito(data);
          return data;
        } else {
          console.error("El resultado de la API no es un array:", data);
        }
      } catch (error) {
        console.error("Error al obtener reservaciones:", error);
      } finally {
        setLoading(false); // Marcar el estado de carga como falso una vez que se completa la solicitud
      }
    } else {
      setLoading(false); // Marcar el estado de carga como falso si no hay un id válido
    }
  }, [apiurll, user, obtenerIdUsuario]);
  

  const createOrder = (data, actions) => {
    console.log('Valor de total:', total);
    const amount = parseFloat(total);
    console.log('Monto parseado:', amount);
  
    if (isNaN(amount) || amount <= 0) {
      console.error('Monto inválido:', amount);
      throw new Error('Monto inválido');
    }
  
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: amount.toFixed(2)
        }
      }],
      application_context: {
        shipping_preference: 'NO_SHIPPING'
      }
    });
  };
  
  const onApprove = async (idCarrito) => {
      const cr = carrito[0].idCarrito
      console.log(cr)
      console.log(user.idUsuario)
      console.log(total)
      console.log(Direccion)
    try {
     
      const data= new FormData();
      data.append("idTipoPago",1)
      data.append("idUsuario",user.idUsuario)
      data.append("idCarrito",cr)
      data.append("Total",total)
      data.append("idDireccion",Direccion)
      const response = await fetch(
        apiurll + "/api/CasaDelMarisco/AgregarPedidoCAN",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      console.log(result);
      if (result === 'Exito') {
        //const order = await actions.order.capture();
       // console.log('Orden capturada:', order);
        
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El pedido se ha guardado y procesado correctamente',
        });
        
       // return order;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al procesar la solicitud',
      });
      }
    
    } catch (error) {
      console.error('Error al capturar la orden:', error);
      alert(`Error al completar el pago: ${error.message}`);
      throw error;
    }
  };
  

  const calcularTotal = useCallback( () => {
    if (!carrito || carrito.length === 0) return 0;
  
    const subtotal = carrito.reduce((acc, item) => acc + item.Precio, 0);
    const iva = subtotal * 0.16;
    const envio = 1;
    const total = subtotal + iva + envio;
  
    return {
      subtotal: subtotal.toFixed(2),
      iva: iva.toFixed(2),
      envio: envio.toFixed(2),
      total: total.toFixed(2)
    };
  },[carrito]);


  useEffect(() => {
    obtenerProductoCarrito();
    obtenerDirecciones();
  }, [obtenerProductoCarrito, obtenerDirecciones,]);

  // useEffect para calcular el total cuando cambia el carrito
  useEffect(() => {
    const totales = calcularTotal();
    setTotal(parseFloat(totales.total));
  }, [carrito, calcularTotal]);


  return (
    <Layout>
    <div style={{ marginTop: '100px' ,marginRight: '0', marginLeft: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
        <div style={{ gridColumn: '1 / -1', padding: '20px', boxShadow: '0 0 0 2px rgba(0, 0, 255, 0.5)', borderRadius: '10px', backgroundColor: '#ffffff' }}>
          {/* Header */}
          <div style={{ display: 'flex', width: '100%', marginBottom: '16px', backgroundColor: '#f8f9fa', padding: '16px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ flex: '2', fontWeight: 'bold', padding: '8px', borderRight: '1px solid #dee2e6', textAlign: 'left', color: '#495057' }}>Producto</div>
            <div style={{ flex: '1', fontWeight: 'bold', padding: '8px', borderRight: '1px solid #dee2e6', textAlign: 'center', color: '#495057' }}>Cantidad</div>
            <div style={{ flex: '1', fontWeight: 'bold', padding: '8px', textAlign: 'center', color: '#495057' }}>Total</div>
          </div>
  
          {/* Product rows */}
          <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '20px', paddingRight: '20px' }}>
            {isLoading ? (
              <p>Cargando...</p>
            ) : carrito != null ? (
              carrito.map((carritoInfo) => (
                <div key={carritoInfo.id} style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #d1d5db', padding: '12px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <img src={carritoInfo.Imagen} alt={carritoInfo.Nombre || 'Producto'} style={{ width: '100px', height: '100px', borderRadius: '8px', objectFit: 'cover', marginRight: '16px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
                      <Typography variant='text' style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{carritoInfo.Nombre}</Typography>
                      <Typography style={{ fontSize: '1.25rem', color: '#4b5563', fontWeight: '600' }}>${carritoInfo.PrecioUnitario}</Typography>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button style={{ padding: '8px', borderRadius: '50%' }} onClick={() => eliminarDelCarrito(carritoInfo)}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '24px', width: '24px', color: '#4b5563' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <input
                        type='number'
                        style={{ width: '60px', textAlign: 'center', marginLeft: '8px', marginRight: '8px' }}
                        value={carritoInfo.Cantidad}
                        disabled={true}
                      />
                      <button style={{ padding: '8px', borderRadius: '50%' }} onClick={() => agregarAlCarrito(carritoInfo)}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '24px', width: '24px', color: '#4b5563' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <Typography variant='text' style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${carritoInfo.Precio}</Typography>
                  </div>
                </div>
          </div>
        </div>
  
        <div style={{ padding: '20px', boxShadow: '0 0 0 2px rgba(0, 0, 255, 0.5)', borderRadius: '10px', backgroundColor: '#ffffff' }}>
          <Typography variant='text' style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px' }}>DETALLE DE LA ORDEN</Typography>
          <div style={{ borderTop: '1px solid #d1d5db', borderBottom: '1px solid #d1d5db', padding: '16px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Subtotal</span>
              <span>${calcularTotal().subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Costo del envío</span>
              <span>$30.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Iva</span>
              <span>{calcularTotal().iva}</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <span style={{ fontWeight: '600' }}>Total</span>
            <span style={{ fontWeight: '600' }}>${calcularTotal().total}</span>
          </div>
  
          <div style={{ position: 'relative', zIndex: '10', marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <PayPalButton 
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}                
            fundingSource="paypal" 
            style={{
              layout: 'horizontal', // Cambia la disposición a horizontal si es necesario
              color: 'gold', // Cambia el color a dorado para que resalte
              shape: 'rect', // Rectángulo para una apariencia profesional
              label: 'checkout', // Texto personalizado en el botón
              tagline: false, // Elimina el tagline para un diseño limpio
            }}
          />
        </div>

        </div>
      </div>
    </div>
  </Layout>
  
  );
};

export default CarritoDetalle;