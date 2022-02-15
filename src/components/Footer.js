import React from 'react'
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: left;
  margin-left: 3.5rem;
  color: black;
`;
const Wrapper = styled.section`
  margin-top: 10rem ;
  position: relative;
  bottom: 0;
  width: 100%;
  background-color: #ccc;
  color: white;
  text-align: center;

`;
export const Footer = () => {
  return (
    <Wrapper>
      <Title>
        Hello World Footer!
      </Title>
    </Wrapper>
  )
}
