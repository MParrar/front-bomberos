import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const BarraLateral = styled.div`
  height: 100%;
  width: 15%;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 40px;
  background-color: #ccc;
`

export const Sidebar = () => {
    return (
        <BarraLateral>
            <ul>
                <Link to='/'>USUARIOS</Link>
            </ul>
        </BarraLateral>
    )
}
