import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
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
import './aside.css';

const AsideAdmin = () => {
    const { user, logoutUser } = useUser();
    const navigate = useNavigate();
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

    const asideWidth = open ? "288px" : "96px"; // Ancho del aside según el estado

    const Menus = [
        { title: "Citas", path: "/admin-citas", icon: TodayIcon },
        { title: "Servicios", path: "/Admin", icon: MiscellaneousServicesIcon },
        { title: "Productos", path: "/admin-producto", icon: AddShoppingCartIcon },
        { title: "Pedidos Generales", path: "/Pedidos_admin", icon: AssessmentIcon },
        { title: "Usuarios", path: "/admin-Usuario", icon: SupervisedUserCircleIcon },
        { title: "Editar Horarios", path: "/admin-edit-cita", icon: AssessmentIcon },
        { title: "Mascotas", path: "/perfile", icon: PetsIcon }
    ];

    const Menu2 = [
        { title: "Mi Cuenta", path: "/Admin", icon: PersonIcon },
        { title: "Salir", action: cerrarSesion, icon: LogoutIcon }
    ];

    return (
        <div className="flex">
            <div className={`aside-container ${open ? 'open' : 'closed'}`} style={{ width: asideWidth }}>
                <ArrowBackIcon className="back-icon" onClick={toggleMenu} />
                <div className="dashboard">
                    <div style={{ backgroundColor: 'white', height: '50px', width: '100px', borderRadius: '50%', padding: '0px', marginRight: '0px' }}>
                        <img src='https://jcayikuywrhnwjltyxaz.supabase.co/storage/v1/object/sign/skill%20platon/logo_perro.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJza2lsbCBwbGF0b24vbG9nb19wZXJyby5wbmciLCJpYXQiOjE3MjE1ODI4NTcsImV4cCI6MTc1MzExODg1N30.QfzTZcdALJNyB4gmbfrqYljG36iC9aKNOWeOeYhUqDM&t=2024-07-21T17%3A27%3A36.659Z' alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    </div>
                    <h1 className="dashboard-title">ESTETICA CANINA PLATON ADMINISTRADOR</h1>
                </div>
                <ul className="menu">
                    {Menus.map((menu, index) => (
                        <li className="menu-item" key={index}>
                            <span className="menu-icon">{React.createElement(menu.icon, null)}</span>
                            <Link to={menu.path} className="menu-link">{menu.title}</Link>
                        </li>
                    ))}
                </ul>
                <ul className="menu">
                    {Menu2.map((menu, index) => (
                        <li className="menu-item" key={index} onClick={menu.action}>
                            <span className="menu-icon">{React.createElement(menu.icon, { style: { margin: '0', padding: '0' } })}</span>
                            <span className="menu-link">{menu.title}</span>
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
