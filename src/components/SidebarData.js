import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as FcIcons from 'react-icons/fc';

export const SidebarData = [
    {
        title: 'Inicio',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Usuarios',
        path: '/usuario',
        icon: <FaIcons.FaUser />,
        cName: 'nav-text'
    },

    {
        title: 'Estadísticas',
        path: 'estadisticas',
        icon: <FcIcons.FcStatistics />,
        cName: 'nav-text'
    }

];