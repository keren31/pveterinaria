import React, { useState, useEffect } from 'react';
import reglas from './reglas';
import { useUser } from "../../src/UserContext";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import PerfilLayout from "./PerfilLayout";

const Recomendaciones = () => {


    
    const { user, logoutUser } = useUser();
    const navigate = useNavigate();
    const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
    const [dataCitas, setDataCitas] = useState([]);


      const obtenerCitas = async () => {
        try {
          const response = await fetch(
            `${apiurll}/api/CasaDelMarisco/ObtenerCitasCANPorId?idUsuario=${user.idUsuario}`,
            {
              method: "GET",
            }
          );
          if (response.ok) {
            const userData1 = await response.json();
            setDataCitas(userData1);
            const servicios = [...new Set(dataCitas.map(cita => cita.NombreServicio))];
            console.log(servicios)
            setServiciosSeleccionados(servicios);
          } else {
            console.error(
              "Error al obtener datos de los usuarios:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      };

    const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

    const [recomendaciones, setRecomendaciones] = useState([]);

    useEffect(() => {
        obtenerCitas();
      }, [serviciosSeleccionados]);

    useEffect(() => {
       
        if (Array.isArray(serviciosSeleccionados) && Array.isArray(reglas)) {
            const nuevasRecomendaciones = reglas
                .filter(regla => {
                   
                    return Array.isArray(regla.antecedents) &&
                           regla.antecedents.every(servicio => serviciosSeleccionados.includes(servicio));
                })
                .map(regla => regla.consequents)
                .flat();
            
            const recomendacionesUnicas = [...new Set(nuevasRecomendaciones)];
            setRecomendaciones(recomendacionesUnicas);
        }
    }, [serviciosSeleccionados]);
    

    return (
        <Layout>
      <PerfilLayout>
      <div style={{ marginTop: '3rem', textAlign: 'center', marginLeft:'300px' }}>
            <h3 style={{ marginBottom: '2rem' }}>Recomendaciones</h3>
            {recomendaciones.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {recomendaciones.map((recomendacion, index) => (
                        <div key={index} style={{ flex: '1 0 21%', margin: '1rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', transition: '0.3s', borderRadius: '5px' }}>
                            <img src="https://img.freepik.com/vector-gratis/ilustracion-icono-vector-dibujos-animados-hueso-mordedura-perro-pug-lindo-naturaleza-animal-icono-concepto-aislado-premium_138676-7370.jpg?size=338&ext=jpg" alt="Imagen de recomendación" style={{ width: '100%', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }} />
                            <div style={{ padding: '1rem' }}>
                                <p style={{ fontSize: '1rem', color: '#333' }}>{recomendacion}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay recomendaciones disponibles.</p>
            )}
        </div>

    </PerfilLayout>
    </Layout>
    );
};

export default Recomendaciones;
