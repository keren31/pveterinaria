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
        const bgClass = open ? "w-72" : "w-24";

        const Menus = [
            { title: "Mi Cuenta", path: "/Perfil", icon: PersonIcon },
            { title: "Mis Citas", path: "/mis-Citas", icon: TodayIcon },
            { title: "Servicios", path: "/perfile", icon: MiscellaneousServicesIcon },
            { title: "Productos", path: "/mis-citas", icon: AddShoppingCartIcon },
            { title: "Usuarios", path: "/mis-citas", icon: SupervisedUserCircleIcon },
            { title: "Mascotas", path: "/mis citas", icon: PetsIcon }
        ];

        const Menu2 = [
            { title: "Salir", path: "/Admin", icon: LogoutIcon }
            
        ];

        return (
            <div className="flex">
                <div className={`bg-red h-screen p-5 pt-8 ${bgClass} duration-300 relative`}>
                    <ArrowBackIcon
                        className={`bg-white text-darkPurple text-3xl rounded-full absolute -right-3 top-9 border border-secondaryBlue cursor-pointer ${!open && "rotate-180"}`}
                        onClick={this.toggleMenu}
                    />
                    <div className='inline-flex items-center'>
                        <ComputerIcon sx={{ fontSize: 50 }} className={`bg-primaryBlue text-4xl rounded cursor-pointer block float-left mr-2 duration-300 ${open && "rotate-[360deg]"}`} />
                        <div className='flex flex-col'>
                            <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>Dashboard</h1>
                        </div>
                    </div>
                    <div className='flex items-center rounded-md bg-lightWhite mt-6 px-4 py-2'>
                        <SearchIcon className='text-white text-lg block float-left cursor-pointer mr-2' />
                        <input type='search' placeholder='Buscar...' className='w-full text-base bg-transparent text-white focus:outline-none' />
                    </div>
                    <ul className='pt-2'>
                        {Menus.map((menu, index) => (
                            <li
                                className="flex items-center justify-center p-2 text-primaryBlue text-sm gap-x-4 cursor-pointer  hover:text-secondaryBlue hover:bg-primaryBlue rounded-md mt-2"
                                key={index}
                            >
                                <span className='text-2xl block float-left'>
                                    {React.createElement(menu.icon, null)}
                                </span>
                                <Link to={menu.path}
                                 className={`text-base font-medium flex-1 duration-200 pt-1 ${!open && "hidden"}`} >
                                <span>{menu.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className='mt-10'>
                        {Menu2.map((menu, index) => (
                            <li
                                className="flex items-center justify-center p-2 text-primaryBlue text-sm gap-x-4 cursor-pointer  hover:text-secondaryBlue hover:bg-primaryBlue rounded-md mt-2"
                                key={index}
                            >
                                <span className='text-2xl block float-left'>
                                    {React.createElement(menu.icon, { className: 'm-0 p-0' })}
                                </span>
                                <span className={`text-base font-medium flex-1 duration-200 pt-1 ${!open && "hidden"}`}>{menu.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="p-7">
                    <h1 className="text-2xl font-semibold">Estetica Canina Platon</h1>
                </div>
            </div>
        );
    }
}

export default AsidePerfil;
