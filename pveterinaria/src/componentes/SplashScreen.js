import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/inicio');
    }, 5000); // Redirige después de 5 segundos
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-6 rounded-full shadow-xl animate-pulse">
        <img 
          src="/incono512.png" 
          alt="Estética Canina Platón" 
          className="w-40 h-40 rounded-full shadow-md"
        />
      </div>
      <h1 className="text-4xl font-bold text-blue-800 mt-6 animate-fade-in">
        Estética Canina Platón
      </h1>
      <p className="text-lg text-blue-700 mt-4 text-center max-w-md animate-fade-in-delay">
        Cuidando la belleza y el bienestar de tu mascota con amor y dedicación.
      </p>
      <p className="text-base text-blue-600 mt-4 text-center max-w-sm animate-fade-in-delay">
        ¡Prepárate para una experiencia única, donde tu mascota es nuestra prioridad!
      </p>
      <div className="mt-8 animate-bounce">
        <span className="text-blue-500">Cargando...</span>
      </div>
    </div>
  );
}

export default SplashScreen;
