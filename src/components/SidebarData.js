import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as FcIcons from 'react-icons/fc';
import * as BiIcons from 'react-icons/bi';

export const SidebarData = [
  {
    title: 'Inicio',
    path: '/inicio',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    rol: ['Bombero', 'Administrador', 'Cuartel'],
  },
  {
    title: 'Usuarios',
    path: '/usuario',
    icon: <FaIcons.FaUser />,
    cName: 'nav-text',
    rol: ['Administrador'],
  },
  {
    title: 'Estadísticas',
    path: '/estadisticas',
    icon: <FcIcons.FcStatistics />,
    cName: 'nav-text',
    rol: ['Bombero', 'Administrador'],
  },
  {
    title: 'Máquinas',
    path: '/maquinas',
    icon: <FaIcons.FaTruckMoving />,
    cName: 'nav-text',
    rol: ['Administrador'],
  },
  {
    title: 'Cerrar Sesion',
    path: '/',
    icon: <BiIcons.BiLogOut />,
    cName: 'nav-text sesion-side-bar',
    rol: ['Bombero', 'Administrador', 'Cuartel'],
  },
];
