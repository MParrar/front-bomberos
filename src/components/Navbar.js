import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import logo from '../img/logo.png'
import './Navbar.css';
import AuthContext from '../context/autenticacion/authContext';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';

export const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, usuario, cargando, cerrarSesion } = authContext;

  const navigate = useNavigate();

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  const showSidebar = () => {
    setSidebar(!sidebar);
    if (!sidebar) {
      document.getElementById('cuerpo').style.overflow = 'hidden';
    } else {
      document.getElementById('cuerpo').style.overflow = 'auto';
    }
  };

  const cerrarSesionComponent = () => {
    navigate('/');
    cerrarSesion();
  };

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar mb-4 ">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h4 className="title-bars mt-1">CUERPOS DE BOMBEROS DE PINTO <p style={{ fontSize: '1.8rem' }} className='text-center'>Fuerza y Unidad</p></h4>
          {usuario?.usuario?.nombres ?
            <DropdownButton
              as={ButtonGroup}
              variant="secondary"
              className="sesion-bars"
              title={
                usuario
                  ? `${usuario.usuario.nombres.split(' ')[0]}  ${usuario.usuario.apellidos.split(' ')[0]}`
                  : ''
              }
              id="bg-nested-dropdown"
            >
              <Dropdown.Item eventKey="1" onClick={() => cerrarSesionComponent()}>
                Cerrar Sesión
              </Dropdown.Item>
            </DropdownButton>
            :
            <Button
              variant="secondary"
              className="button-bars"
            >
              Cargando...
            </Button>
          }
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              if (item.rol.includes(usuario?.usuario.rol)) {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path} onClick={item.path === '/' && (cerrarSesion)}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              }
              ;
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};
