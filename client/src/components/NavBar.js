import React, { useContext } from "react";
import styled from "styled-components";
import { ItemsContext } from "./ItemsContext";

const NavBar = () => {
  const { numOfCartItems } = useContext(ItemsContext);

  return (
    <Wrapper>
      <ItemsLink href="/">Products</ItemsLink>
      <CartLink href="/cart">Cart ({numOfCartItems})</CartLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  border: solid black 1px;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
`;

const ItemsLink = styled.a`
  color: black;
  text-decoration: none;
`;

const CartLink = styled.a`
  margin-left: 100px;
  margin-right: 50px;
  color: black;
  text-decoration: none;
`;

export default NavBar;
