import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import Swal from 'sweetalert2';

const ProtectorRutas = () => {
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    // Simulando un tiempo de carga
    setTimeout(() => {
        setLoading(false);
    }, 1000);

    // Si el usuario está en proceso de carga, muestra un indicador de carga
    if (loading) {
        Swal.fire({
            title: "Cargando...",
            html: "Espere por favor",
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        return null; // No renderizar nada mientras se carga
    }

    // Si el usuario no está autenticado, redirige al usuario a la página de inicio de sesión
    if (!user) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Parece que no estás logueado, por favor hazlo",
          });
          navigate('/login1')
    }
    else if (user.Rol===1){
        
          return <Outlet />;
        }
   

    // Si el usuario está autenticado, muestra el contenido protegido
    return <Outlet />;
};

export default ProtectorRutas;