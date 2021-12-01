import React, { useContext } from "react";
import styled from "styled-components";
import { useUserContext } from "../contexts/UserContext";
import { ItemsContext } from "./ItemsContext";

const NavBar = () => {
  const {
    state: { cart },
  } = useUserContext();

  return (
    <Wrapper>
      <ItemsLink href="/">Products</ItemsLink>
      <CartLink href="/cart">Cart ({cart ? cart.length : 0})</CartLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  border: none;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: grey;
`;

const ItemsLink = styled.a`
  color: white;
  text-decoration: none;
  font-family: "Bebas Neue", cursive;
  font-size: 25px;
  &:hover {
    font-size: 28px;
    color: gold;
  }
`;

const CartLink = styled.a`
  margin-left: 100px;
  margin-right: 50px;
  color: white;
  text-decoration: none;
  font-family: "Bebas Neue", cursive;
  font-size: 25px;

  &:hover {
    font-size: 28px;
    color: gold;
  }
`;

export default NavBar;
