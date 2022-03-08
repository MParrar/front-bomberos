import React from 'react'
import styled from 'styled-components';
import { CarouselCitaciones } from './Citaciones/CarouselCitaciones';

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
export const Footer = () => {

  return (
    <Wrapper>
      <Title>
        <CarouselCitaciones />
      </Title>
    </Wrapper>
  )
}
