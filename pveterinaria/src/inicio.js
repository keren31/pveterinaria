import React from 'react';
import Layout from './Layout'; // Asegúrate de ajustar la ruta según la ubicación de tu Layout
import CardServicios from './componentes/CardServicios';
import imagen1 from './img/fondo de inicio.jpg'; // Ajusta la ruta de tu imagen

function Inicio() {
    return (
        <Layout>
            <div className="inicio-container">
                <div className="fondo-imagen relative bg-blue-900">
                    <img 
                        src={imagen1} 
                        alt="Registro" 
                        className="Imagen-inicio w-full h-64 md:h-96 lg:h-[500px] object-cover opacity-90"
                    />

                    {/* Texto de Bienvenida sobre la imagen */}
                    <div className="absolute top-0 left-0 right-0 flex items-start justify-center mt-2">
                        <h1 
                            className="font-semibold text-white text-center leading-tight bg-blue-900 bg-opacity-70 p-5 mt-5 rounded-md"
                            style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}
                        >
                            Estética Canina Platón
                        </h1>
                    </div>

                    {/* Contenido del Texto principal */}
                    <div className="division p-8 md:p-16 lg:p-20 text-white max-w-5xl mx-auto bg-blue-800 rounded-md h-auto mt-12">
                        <h2 
                            className="font-bold text-center leading-tight" 
                            style={{ fontSize: 'clamp(24px, 4vw, 30px)' }}
                        >
                            Se bienvenido!
                        </h2>
                        <p 
                            className="mt-4 text-center leading-relaxed" 
                            style={{ fontSize: 'clamp(16px, 2.5vw, 24px)' }}
                        >
                            ¡Te damos una cálida bienvenida a Estética Canina Platón, donde la pasión por el cuidado y la estética de tus queridas mascotas se convierte en una experiencia extraordinaria!
                        </p>
                        <p 
                            className="mt-4 text-center leading-relaxed" 
                            style={{ fontSize: 'clamp(16px, 2.5vw, 24px)' }}
                        >
                            En nuestro santuario dedicado a la belleza y bienestar canino, nos esforzamos por ofrecer mucho más que un simple servicio de estética. Cada corte de pelo, cada baño relajante y cada tratamiento de spa es un acto de amor hacia tus peludos compañeros.
                        </p>
                    </div>
                </div>

                <div className="mt-8 px-2 md:px-12 lg:px-24 ">
                    <CardServicios />
                </div>
                <div className="division2 mt-8"></div>
            </div>
        </Layout>
    );
}

export default Inicio;
