import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import { IconContext } from 'react-icons';

import './Navbar.css'
import AuthContext from '../context/autenticacion/authContext'
import { Button } from 'react-bootstrap'

export const Navbar = () => {

    const [sidebar, setSidebar] = useState(false);
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado, usuario, cerrarSesion } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    const showSidebar = () => {
        setSidebar(!sidebar)
        if (!sidebar) {
            document.getElementById('cuerpo').style.overflow = 'hidden';
        } else {
            document.getElementById('cuerpo').style.overflow = 'scroll';
        }
    };



    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar mb-4'>'
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <h4 style={{ margin: '0 auto', color: 'white' }}>Primera Compañia BOMBEROS PENTO {usuario ? usuario.nombres : ''}</h4>
                    <Button
                        variant='secondary'
                        onClick={() => cerrarSesion()}
                    >
                        Cerrar Sesion
                    </Button>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}
