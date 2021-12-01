import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";

const Cart = () => {
  return (
    <Wrapper>
      <Title to="/">E-com</Title>
      <NavBar />
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
