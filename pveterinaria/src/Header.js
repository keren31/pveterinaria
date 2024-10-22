import React, { useState, useEffect } from 'react';
import logo from './img/logotipoEstetica1.png';
import { Link, useLocation } from 'react-router-dom';
import './css/Header.css';
import { useUser } from './UserContext';
import Breadcrumbs from './Breadcrumbs';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuIcon from '@mui/icons-material/Menu'; // Icono de tres líneas

const Header = () => {
    const { user } = useUser() || {};
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="header2">
                    <Breadcrumbs />
                    <div>
                        {user ? (
                            <div style={{ display: "flex", gap: "15px" }}>
                            <li style={{ listStyle: 'none', color: '#ffffff' }} className="username">
                                {user.Nombre}
                            </li>
                            <li style={{ listStyle: 'none' }}>
                                <Link to='/Perfil' style={{ color: '#ffffff', textDecoration: 'none' }}>Perfil</Link>
                            </li>
                        </div>
                        
                        ) : (
                          <div style={{ display: "flex", gap: "15px" }}>
                          <li style={{ listStyle: 'none' }} className={location.pathname === '/login' ? 'active' : ''}>
                              <Link to='/login1' style={{ color: '#ffffff', textDecoration: 'none' }}>Login</Link>
                          </li>
                          <li style={{ listStyle: 'none' }}>
                              <Link to='/registro' style={{ color: '#ffffff', textDecoration: 'none' }}>Registrarse</Link>
                          </li>
                      </div>
                      
                        )}
                    </div>
                </div>
                <div className="logo-nav-container">
                <div className="">
                    <img src={logo} alt='Estética Canina Platón' className="logo-img" />
                </div>

                    <div className="nav">
                        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                            <li><Link to='/'>Inicio</Link></li>
                            <li><Link to='/Quienes-Somos'>Quienes Somos</Link></li>
                            <li><Link to='/servicio'>Servicios</Link></li>
                            <li><Link to='/Productos'>Tienda</Link></li>
                            <li style={{ listStyle: 'none' }}>
                                <Link to='/detalleCarrito' className="flex items-center" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <AddShoppingCartIcon style={{ marginRight: '8px' }} />
                                    Carrito
                                </Link>
                            </li>
                            <li><Link to='/Citas'>Citas</Link></li>
                        </ul>
                        <button className="menu-button" onClick={toggleMenu}>
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </header>
            <div className="content-under-header">
                {/* Aquí va tu contenido debajo del encabezado */}
            </div>
        </>
    );
};

export default Header;
