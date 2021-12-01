import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useUserContext } from "../contexts/UserContext";

const Cart = () => {
  const {
    state: { cart },
  } = useUserContext();
  //cart is fetched from usercontext
  //make use of it to show the items in cart
  console.log(cart);
  return (
    <Wrapper>
      <Header />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Cart;
