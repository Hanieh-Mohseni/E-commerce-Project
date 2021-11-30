import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Cart = () => {
  return (
    <Wrapper>
      <Title to="/">E-com</Title>CART PAGE
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Title = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-size: 40px;
`;

export default Cart;
