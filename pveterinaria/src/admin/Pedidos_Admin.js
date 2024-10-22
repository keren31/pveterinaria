import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useUser } from "../UserContext";
import AdminLayout from './AdminLayout';

const useStyles = styled({
  root: {
    marginTop: '20px',
  },
});

const PedidosGeneral = () => {
  
  const [isLoading, setLoading] = useState(true);
  
  const [pedidos, setPedidos] = useState([]);
  
  


  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

  const obtenerPedidos = async () => {
    try {
      const response = await fetch(
        apiurll + `/api/CasaDelMarisco/TraerPedidosGeneralCAN`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      
      if (data.Pedidos) {
        const pedidosArray = Array.isArray(data.Pedidos) ? data.Pedidos : [data.Pedidos];
        pedidosArray.sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha));
        setPedidos(pedidosArray);
      } else {
        setPedidos([]);
      }
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
      setPedidos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerPedidos(); 
    console.log(pedidos);
  }, [pedidos]);

  return (
    <AdminLayout>
    <Container style={{ marginTop: '20px', marginBottom: '10px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {isLoading ? (
          <Typography>Cargando pedidos...</Typography>
        ) : pedidos.length > 0
        ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', paddingLeft: '6px', paddingRight: '6px' }}>
            {pedidos.map((pedido) => (
              <div key={pedido.IdPedido} style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '12px', maxWidth: 'calc(1000% - 16px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <div style={{ backgroundColor: 'white', height: '80px', width: '80px', borderRadius: '50%', padding: '4px', marginRight: '8px' }}>
                    <img src='https://jcayikuywrhnwjltyxaz.supabase.co/storage/v1/object/sign/skill%20platon/logo_perro.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJza2lsbCBwbGF0b24vbG9nb19wZXJyby5wbmciLCJpYXQiOjE3MjE1ODI4NTcsImV4cCI6MTc1MzExODg1N30.QfzTZcdALJNyB4gmbfrqYljG36iC9aKNOWeOeYhUqDM&t=2024-07-21T17%3A27%3A36.659Z' alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>ESTETICA CANINA PLATON </h2>
                    <Typography style={{ fontSize: '16px', color: '#4A5568' }}>
                      {new Date(pedido.Fecha).toLocaleString()}
                    </Typography>
                  </div>
                </div>
                
                <div style={{ marginBottom: '12px', position: 'relative' }}>
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                      <svg style={{ width: '24px', height: '24px', color: '#3B82F6', marginLeft: '16px', marginRight: '4px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <Typography style={{ fontSize: '16px', textAlign: 'end' }}>
                        20 de Diciembre Col. Comaltepec, Huejutla
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                      <svg style={{ width: '24px', height: '24px', color: '#9CA3AF', marginLeft: '16px', marginRight: '4px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <Typography style={{ fontSize: '16px', textAlign: 'end' }}>
                        {pedido.Direccion.Calle} {pedido.Direccion.NumeroExterior}, Col. {pedido.Direccion.Colonia}, {pedido.Direccion.Ciudad}
                      </Typography>
                    </div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '12px' }}>
                  {pedido.Productos.map((producto) => (
                    <div key={producto.Id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography style={{ fontSize: '16px' }}>{producto.Nombre}</Typography>
                      <Typography style={{ fontSize: '16px', fontWeight: 'bold' }}>${producto.Precio.toFixed(2)}</Typography>
                    </div>
                  ))}
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', borderTop: '1px solid #E2E8F0', paddingTop: '8px' }}>
                  <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>Total</Typography>
                  <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>${pedido.Total.toFixed(2)}</Typography>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Typography>No hay pedidos disponibles.</Typography>
        )}
      </div>
      
    </Container>
    </AdminLayout>
  );
};

export default PedidosGeneral;
