import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Footer } from './Footer';
import { Header } from './Header';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

const Contenedor = styled.div`
  margin-left: 16%;
`;

export const Layout = () => {
  return (
    <>
      {/* <Header />
            <Sidebar /> */}
      <Navbar />
      <>
        <Outlet />
      </>

      {/* <Footer /> */}
    </>
  );
};
