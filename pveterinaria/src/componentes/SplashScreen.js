import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
    const timer = setTimeout(() => {
        navigate('/inicio');
    }, 5000); // Redirige después de 5 segundos (puedes ajustar este tiempo)
    return () => clearTimeout(timer);
    }, [navigate]);

    return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
        <img src="/pveterinaria/public/icon2.png" alt="Estética Canina Platón" className="w-40 h-40" />
        <h1 className="text-3xl text-gray-800 mt-4">Estética Canina Platón</h1>
        <p className="text-lg text-gray-600 mt-2">Cuidando la belleza y el bienestar de tu mascota</p>
        <p className="text-base text-gray-500 mt-2">¡Prepárate para una experiencia única!</p>
    </div>
    );
}

export default SplashScreen;
