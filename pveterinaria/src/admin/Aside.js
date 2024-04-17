import React, { Component } from 'react';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ComputerIcon from '@mui/icons-material/Computer';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import TodayIcon from '@mui/icons-material/Today';
import PetsIcon from '@mui/icons-material/Pets';
import { Link } from 'react-router-dom';
import './aside.css';

class AsideAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }

    toggleMenu = () => {
        this.setState((prevState) => ({
            open: !prevState.open,
        }));
    };

    render() {
        const { open } = this.state;
        const asideWidth = open ? "288px" : "96px"; // Ancho del aside según el estado

        const Menus = [
            { title: "Citas", path: "/admin-citas", icon: TodayIcon },
            { title: "Servicios", path: "/Admin", icon: MiscellaneousServicesIcon },
            { title: "Productos", path: "/admin-producto", icon: AddShoppingCartIcon },
            { title: "Usuarios", path: "/admin-Usuario", icon: SupervisedUserCircleIcon },
            { title: "Editar Horarios", path: "/admin-edit-cita", icon: AssessmentIcon },
            { title: "Mascotas", path: "/perfile", icon: PetsIcon }
        ];

        const Menu2 = [
            { title: "Mi Cuenta", path: "/Admin", icon: PersonIcon },
            { title: "Salir", path: "/Admin", icon: LogoutIcon }
        ];

        return (
            <div className="flex">
                <div className={`aside-container ${open ? 'open' : 'closed'}`} style={{ width: asideWidth }}>
                    <ArrowBackIcon className="back-icon" onClick={this.toggleMenu} />
                    <div className="dashboard">
                        <ComputerIcon className="computer-icon" />
                        <h1 className="dashboard-title">Administrador</h1>
                    </div>
                    <div className="search-container">
                        <SearchIcon className="search-icon" />
                        <input type="search" placeholder="Buscar..." className="search-input" />
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
                            <li className="menu-item" key={index}>
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
}

export default AsideAdmin;
