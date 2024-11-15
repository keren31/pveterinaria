import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import TodayIcon from '@mui/icons-material/Today';
import PetsIcon from '@mui/icons-material/Pets';
import Swal from 'sweetalert2';
import { useUser } from '../UserContext';
import './aside.css'

const AsideAdmin = () => {
    const { logoutUser } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(true);

    const toggleMenu = () => {
        setOpen(!open);
    };

    const cerrarSesion = () => {
        logoutUser();
        navigate('/');
        Swal.fire({
            icon: 'success',
            title: 'Sesión Cerrada',
            text: 'Cerraste sesión correctamente. Nos vemos pronto.',
            confirmButtonText: 'Ok'
        });
    };

    const Menus = [
        { title: "Citas", path: "/admin-citas", icon: TodayIcon },
        { title: "Productos", path: "/admin-producto", icon: AddShoppingCartIcon },
        { title: "Pedidos Generales", path: "/Pedidos_admin", icon: AssessmentIcon },
        { title: "Usuarios", path: "/admin-Usuario", icon: SupervisedUserCircleIcon },
        { title: "Editar Horarios", path: "/admin-edit-cita", icon: AssessmentIcon },
        { title: "Feedback", path: "/CitasCalcular", icon: PetsIcon }
    ];

    const Menu2 = [
        { title: "Mi Cuenta", path: "/Admin", icon: PersonIcon },
        { title: "Salir", action: cerrarSesion, icon: LogoutIcon }
    ];

    return (
        <div className="flex">
            <div className={`aside-container ${open ? 'open' : 'closed'}`}>
                <ArrowBackIcon className="back-icon" onClick={toggleMenu} />
                <div className="dashboard">
                    <div className="logo-container">
                    <img src="https://cpbrwvubohupbbofoonj.supabase.co/storage/v1/object/sign/logo%20platon/icon.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2dvIHBsYXRvbi9pY29uLnBuZyIsImlhdCI6MTczMTY0NDg5MiwiZXhwIjoxNzYzMTgwODkyfQ.UGIqImoU-nMfcEWu3aqbn0KCG3JaIt13qs09hrm5sP0&t=2024-11-15T04%3A28%3A12.983Z" alt="Logo" style={{ width: "150px", height: "auto" }} />
                    </div>
                    {open && <h1 className="dashboard-title">ESTETICA CANINA PLATON ADMINISTRADOR</h1>}
                </div>
                <ul className="menu">
                    {Menus.map((menu, index) => (
                        <li
                            key={index}
                            className={`menu-item ${location.pathname === menu.path ? 'active' : ''}`}
                        >
                            <span className="menu-icon">{React.createElement(menu.icon)}</span>
                            {open && <Link to={menu.path} className="menu-link">{menu.title}</Link>}
                        </li>
                    ))}
                </ul>
                <ul className="menu">
                    {Menu2.map((menu, index) => (
                        <li
                            key={index}
                            className={`menu-item ${location.pathname === menu.path ? 'active' : ''}`}
                            onClick={menu.action}
                        >
                            <span className="menu-icon">{React.createElement(menu.icon)}</span>
                            {open && <span className="menu-link">{menu.title}</span>}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="content">
                {/* Contenido aquí */}
            </div>
        </div>
    );
}

export default AsideAdmin;
