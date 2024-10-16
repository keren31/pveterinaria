import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
    const timer = setTimeout(() => {
        navigate('/inicio');
    }, 3000); // Redirige después de 3 segundos
    return () => clearTimeout(timer);
    }, [navigate]);

    return (
    <div className="flex items-center justify-center h-screen bg-white">
        <img src="/icons/icon-512x512.png" alt="Estética Canina Platón" className="w-40 h-40" />
        <h1 className="text-3xl text-gray-800 mt-4">Estética Canina Platón</h1>
    </div>
    );
}

export default SplashScreen;
