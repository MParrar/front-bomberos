import React, { useContext, useEffect } from 'react'
import styled from 'styled-components';
import { CarouselCitaciones } from './Citaciones/CarouselCitaciones';
import CuartelContext from '../context/cuarteles/cuartelContext';

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  color: white;
`;
const Wrapper = styled.section`
  margin-top: 10rem ;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #060b26;
  text-align: center;
  height:50px ;
  z-index:9999 ;

`;
export const Footer = ({ idCuartel }) => {

  const cuartelContext = useContext(CuartelContext);
  const { obtenerCuarteles, cuarteles } = cuartelContext;
  useEffect(() => {
    obtenerCuarteles()
  }, []);

  return (
    <Wrapper>
      <Title>
        <CarouselCitaciones
          cuarteles={cuarteles}
          idCuartel={idCuartel}
        />
      </Title>
    </Wrapper>
  )
}
