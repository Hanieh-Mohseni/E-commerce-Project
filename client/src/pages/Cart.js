import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { useUserContext } from "../contexts/UserContext";

const Cart = () => {
  const {
    state: { userId, cart },
  } = useUserContext();
  const history = useHistory();

  if (!userId) {
    //sign in first to get access to cart
    history.push("/signin");
  }

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
