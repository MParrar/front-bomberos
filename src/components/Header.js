import React from 'react'
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: Black;
  
`;
const Wrapper = styled.section`
  padding: 1em;
  margin-left: 14%;
  background :#ccc;
  margin-bottom: 15px;
  
`;

export const Header = () => {
  return (
    <Wrapper>
      <Title >
        <h1 className='mr-3'>Bomberos Pinto </h1>
      </Title>
    </Wrapper>
  )
}
