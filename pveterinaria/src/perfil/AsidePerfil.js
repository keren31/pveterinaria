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
        const bgClass = open ? { width: '20rem' } : { width: '5rem' };

        const Menus = [
            { title: "Mi Cuenta", path: "/Perfil", icon: PersonIcon },
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
            <div style={{ display: 'flex', minHeight: '100vh' }}>
                <div
                    style={{
                        backgroundColor: '#0a5cb8',
                        height: '100vh',
                        padding: '1rem',
                        paddingTop: '2rem',
                        ...bgClass,
                        transition: 'width 300ms',
                        position: 'sticky', // Hace que el aside permanezca fijo al hacer scroll
                        top: 0, // Mantenerlo pegado en la parte superior de la ventana
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <ArrowBackIcon
                        style={{
                            backgroundColor: 'white',
                            color: 'darkPurple',
                            fontSize: '2rem',
                            borderRadius: '50%',
                            position: 'absolute',
                            right: '-0.75rem',
                            top: '1rem',
                            border: '1px solid secondaryBlue',
                            cursor: 'pointer',
                            transform: !open ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                        onClick={this.toggleMenu}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                        <ComputerIcon
                            sx={{ fontSize: 50 }}
                            style={{
                                backgroundColor: '#0a5cb8',
                                color: 'white',
                                fontSize: '2.5rem',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                transition: 'transform 300ms',
                                transform: open ? 'rotate(360deg)' : 'rotate(0deg)',
                            }}
                        />
                        {open && (
                            <h1 style={{ color: 'white', fontWeight: 500, fontSize: '1.5rem', marginLeft: '0.5rem' }}>
                                Mi Perfil
                            </h1>
                        )}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '0.5rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            marginTop: '1rem',
                            padding: '0.5rem',
                        }}
                    >
                        <SearchIcon style={{ color: 'white', fontSize: '1.25rem', cursor: 'pointer', marginRight: '0.5rem' }} />
                        {open && (
                            <input
                                type='search'
                                placeholder='Buscar...'
                                style={{
                                    width: '100%',
                                    fontSize: '1rem',
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    outline: 'none',
                                }}
                            />
                        )}
                    </div>
                    <ul style={{ paddingTop: '0.5rem', flexGrow: 1 }}>
                        {Menus.map((menu, index) => (
                            <li
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0.5rem',
                                    color: '#fff',
                                    fontSize: '1rem',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    transition: 'background-color 200ms',
                                    borderRadius: '0.5rem',
                                    marginTop: '0.5rem',
                                }}
                            >
                                <span style={{ fontSize: '1.5rem', color: '#fff' }}>
                                    {React.createElement(menu.icon)}
                                </span>
                                {open && (
                                    <Link
                                        to={menu.path}
                                        style={{
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            flex: 1,
                                            color: '#fff',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        {menu.title}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {Menu2.map((menu, index) => (
                            <li
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0.5rem',
                                    color: '#ff0000',
                                    fontSize: '1rem',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    borderRadius: '0.5rem',
                                    marginTop: '0.5rem',
                                }}
                            >
                                <span style={{ fontSize: '1.5rem' }}>
                                    {React.createElement(menu.icon)}
                                </span>
                                {open && (
                                    <Link
                                        to={menu.path}
                                        style={{
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            flex: 1,
                                            color: '#ff0000',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        {menu.title}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', height: '100vh' }}>
                    {/* Aquí va el contenido de las citas */}
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default AsidePerfil;
