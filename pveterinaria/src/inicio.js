import React from 'react';
import Layout from './Layout'; // Asegúrate de ajustar la ruta según la ubicación de tu Layout
import CardServicios from './componentes/CardServicios';
import imagen1 from './img/fondo de inicio.jpg'; // Ajusta la ruta de tu imagen

function Inicio() {
    return (
    <Layout>
        <div className="inicio-container">
        <div className="fondo-imagen">
            <img src={imagen1} alt="Registro" className="Imagen-inicio" />
            <div className="division">
            <h2>SE BIENVENIDO</h2>
            <p>
                <h2>
                ¡Te damos una cálida bienvenida a Estetica Canina Platon, donde la pasión por el cuidado y la estética de tus queridas mascotas se convierte en una experiencia extraordinaria!
                </h2>
            </p>
            <p>
                <h2>
                En nuestro santuario dedicado a la belleza y bienestar canino, nos esforzamos por ofrecer mucho más que un simple servicio de estética. Cada corte de pelo, cada baño relajante y cada tratamiento de spa es un acto de amor hacia tus peludos compañeros.
                </h2>
            </p>
            </div>
            <div className="bienvenida">
            <h1 className="titulo">Bienvenido a la Estética Canina Platón</h1>
            </div>
        </div>
        <CardServicios />
        <div className="division2"></div>
        </div>
    </Layout>
    );
}

export default Inicio;
