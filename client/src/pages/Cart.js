import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";

const Cart = () => {
  return (
    <Wrapper>
      <Header />
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
