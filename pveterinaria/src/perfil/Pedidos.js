import React, { useState ,useEffect} from 'react';
import {
  Container,
  Typography,
  
} from '@mui/material';
import { styled } from '@mui/system';
import PerfilLayout from "./PerfilLayout";
import Layout from '../Layout';
import { useUser } from "../UserContext";
const useStyles = styled({
  root: {
    marginTop: '20px',
  
  },
});

const Pedidos= () => {

  
  const [isLoading, setLoading] = useState(true);
  const { user } = useUser();
  const [pedidos, setPedidos] = useState([]);
  const [setSelectedPedido] = useState(null);
  const [setDialogOpen] = useState(false);

  

  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  

  const obtenerPedidos = async () => {
    try {
      const response = await fetch(
        apiurll + `/api/CasaDelMarisco/TraerPedidosCAN?UsuarioID=${user.idUsuario}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      
      // Manejar tanto un solo pedido como múltiples pedidos
      if (data.Pedidos) {
        setPedidos(Array.isArray(data.Pedidos) ? data.Pedidos : [data.Pedidos]);
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
    console.log(pedidos)
  }, []);

  return (
    <Layout>
       <PerfilLayout>
    <Container style={{ marginBottom: '30px' }}>
    <Typography variant="h5" gutterBottom>
      Historial de Pedidos
    </Typography>
    
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {isLoading ? (
        <Typography>Cargando pedidos...</Typography>
      ) : pedidos.length > 0 ? (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'start',
          gap: '24px',
          marginTop: '20px',
          paddingLeft: '28px',
          paddingRight: '28px'
        }}>
          {pedidos.map((pedido) => (
            <div key={pedido.IdPedido} style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              width: '100%',
              maxWidth: '680px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <div style={{
                  backgroundColor: '#ffffff',
                  height: '112px',
                  width: '112px',
                  borderRadius: '50%',
                  padding: '8px',
                  marginRight: '12px'
                }}>
                  <img src='https://jcayikuywrhnwjltyxaz.supabase.co/storage/v1/object/sign/skill%20platon/logo_perro.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJza2lsbCBwbGF0b24vbG9nb19wZXJyby5wbmciLCJpYXQiOjE3MjE1ODI4NTcsImV4cCI6MTc1MzExODg1N30.QfzTZcdALJNyB4gmbfrqYljG36iC9aKNOWeOeYhUqDM&t=2024-07-21T17%3A27%3A36.659Z' alt="Logo" style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Estetica Canina Platon</h2>
                  <Typography style={{ fontSize: '20px', color: '#4b5563' }}>
                    {new Date(pedido.Fecha).toLocaleString()}
                  </Typography>
                </div>
              </div>
              
              <div style={{ marginBottom: '16px', position: 'relative' }}>
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <svg style={{ width: '40px', height: '40px', color: '#3b82f6', marginLeft: '24px', marginRight: '8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <Typography style={{ fontSize: '20px', textAlign: 'end' }}>
                      20 de Diciembre Col. Comaltepec, Huejutla
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <svg style={{ width: '40px', height: '40px', color: '#9ca3af', marginLeft: '24px', marginRight: '8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <Typography style={{ fontSize: '20px', textAlign: 'end' }}>
                      {pedido.Direccion.Calle} {pedido.Direccion.NumeroExterior}, Col. {pedido.Direccion.Colonia}, {pedido.Direccion.Ciudad}
                    </Typography>
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                {pedido.Productos.map((producto) => (
                  <div key={producto.Id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography style={{ fontSize: '20px' }}>{producto.Nombre}</Typography>
                    <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>${producto.Precio.toFixed(2)}</Typography>
                  </div>
                ))}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px', borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
                <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>Total</Typography>
                <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>${pedido.Total.toFixed(2)}</Typography>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Typography>No hay pedidos disponibles.</Typography>
      )}
    </div>
  </Container>
  </PerfilLayout>
  </Layout>

  );
};

export default Pedidos;
