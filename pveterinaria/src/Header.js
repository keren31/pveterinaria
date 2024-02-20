import React, { useState } from 'react';
import logo from './img/logo1.jpg';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
 import Login from './login1';


const Header = () => {
    const [sidebar, setSidebar] = useState(false);
    const { isAuthenticated } = useAuth0();
    
    window.addEventListener("scroll", function () {
        const header = document.querySelector(".header");
        header.classList.toggle("active", window.scrollY > 200);
    });
   
    return (
        <>
            <header className={`header ${sidebar ? 'active' : ''}`}>
                <div className='container flex'>
                    <div className='logo'>
                        <img src={logo} alt='' />
                    </div>
                    <div className='nav'>
                        <ul className={sidebar ? "nav-links-sidebar" : "nav-links"} onClick={() => setSidebar(false)}>
                            <li><Link to='/'>INICIO</Link></li>
                            <li><Link to='/Quienes-Somos'>QUIENES SOMOS</Link></li>
                            <li><Link to='/servicio'>SERVICIOS</Link></li>
                            <li><Link to='/Productos'>TIENDA</Link></li>
                            <li><Link to='/Citas'>CITAS</Link></li>
                            <li><Link to='/registro'>REGISTRASE</Link></li>
                            <li><Link to='./login1'>LOGIN</Link></li>
                           
                        </ul>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
