import React, { Component } from 'react';

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ComputerIcon from '@mui/icons-material/Computer';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import TodayIcon from '@mui/icons-material/Today';
import PetsIcon from '@mui/icons-material/Pets';
import { Link } from 'react-router-dom';

class AsidePerfil extends Component {
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
        const bgClass = open ? { width: '25rem' } : { width: '10rem' };

        const Menus = [
            { title: "Mi Cuenta" , path: "/Perfil", icon: PersonIcon },
            { title: "Mis Citas", path: "/mis-Citas", icon: TodayIcon },
            { title: "Productos", path: "/detalleCarrito", icon: AddShoppingCartIcon },
            { title: "Mis Pedidos", path: "/Mis_Pedidos", icon: SupervisedUserCircleIcon },
            { title: "Recomendaciones", path: "/recomendaciones", icon: PetsIcon },
            { title: "Mis Pedidos", path: "/Direccion", icon: TodayIcon }
        ];

        const Menu2 = [
            { title: "Salir", path: "/Admin", icon: LogoutIcon }
        ];

        return (
            <div style={{ display: 'flex' }}>
                <div style={{ fontSize: '10px', backgroundColor: '#0a5cb8', height: '100vh', padding: '1.25rem', paddingTop: '2rem', ...bgClass, transition: 'width 300ms', position: 'relative' }}>
                    <ArrowBackIcon
                        style={{
                            backgroundColor: 'white',
                            color: 'darkPurple',
                            fontSize: '3rem',
                            borderRadius: '50%',
                            position: 'absolute',
                            right: '-0.75rem',
                            top: '2.25rem',
                            border: '1px solid secondaryBlue',
                            cursor: 'pointer',
                            transform: !open && 'rotate(180deg)'
                        }}
                        onClick={this.toggleMenu}
                    />
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <ComputerIcon sx={{ fontSize: 50 }} style={{ backgroundColor: 'primaryBlue', color: 'white', fontSize: '4rem', borderRadius: '50%', cursor: 'pointer', display: 'block', float: 'left', marginRight: '0.5rem', transition: 'transform 300ms', transform: open && 'rotate(360deg)' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h1 style={{ color: 'white', fontWeight: 500, fontSize: '2rem', transition: 'transform 300ms', transform: !open && 'scale(0)' }}>Mi Perfil</h1>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', borderRadius: '0.5rem', backgroundColor: 'lightWhite', marginTop: '1.5rem', paddingX: '1rem', paddingY: '0.5rem' }}>
                        <SearchIcon style={{ color: 'white', fontSize: '1.25rem', display: 'block', float: 'left', cursor: 'pointer', marginRight: '0.5rem' }} />
                        <input type='search' placeholder='Buscar...' style={{ width: '100%', fontSize: '1.5rem', backgroundColor: 'transparent', color: 'white', outline: 'none' }} />
                    </div>
                    <ul style={{ paddingTop: '0.5rem' }}>
                        {Menus.map((menu, index) => (
                            <li
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0.5rem',
                                    color: '#fff',
                                    fontSize: '2rem',
                                    gap: '1rem',
                                    cursor: 'pointer',
                                    color: 'hover:text-secondaryBlue',
                                    backgroundColor: 'hover:bg-primaryBlue',
                                    borderRadius: '0.5rem',
                                    marginTop: '0.5rem'
                                }}
                                key={index}
                            >
                                <span style={{ fontSize: '2rem', display: 'block', float: 'left',color:'#fff' }}>
                                    {React.createElement(menu.icon, null)}
                                </span>
                                <Link to={menu.path}
                                 style={{
                                     fontSize: '2rem',
                                     fontWeight: 500,
                                     flex: 1,
                                     transition: 'opacity 200ms',
                                     paddingTop: '0.25rem',
                                     opacity: !open ? 0 : 1,
                                     color:'#fff'
                                 }} >
                                    <span>{menu.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul style={{ marginTop: '2.5rem' }}>
                        {Menu2.map((menu, index) => (
                            <li
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0.5rem',
                                    color: '#ff0000 ',
                                    fontSize: '2rem',
                                    gap: '1rem',
                                    cursor: 'pointer',
                                    hover:'text-secondaryBlue',
                                    backgroundColor: 'hover:bg-primaryBlue',
                                    borderRadius: '0.5rem',
                                    marginTop: '0.5rem'
                                }}
                                key={index}
                            >
                                <span style={{ fontSize: '2rem', display: 'block', float: 'left' }}>
                                    {React.createElement(menu.icon, { style: { margin: 0, padding: 0 } })}
                                </span>
                                <span style={{
                                    fontSize: '2rem',
                                    fontWeight: 500,
                                    flex: 1,
                                    transition: 'opacity 200ms',
                                    paddingTop: '0.25rem',
                                    opacity: !open ? 0 : 1
                                }}>{menu.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
               
            </div>
        );
    }
}

export default AsidePerfil;