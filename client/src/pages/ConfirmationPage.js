import React from "react";
import styled from "styled-components";
import { useUserContext } from "../contexts/UserContext";
import Header from "../components/Header";

const Confirmation = () => {
  const {
    state: { cart },
  } = useUserContext();

  let total = cart.reduce((acc, cur) => {
    return acc + Number(cur.price.slice(1));
  }, 0);

  const userSession = JSON.parse(sessionStorage.getItem("user"));
  const totalPrice = total.toFixed(2);

  return (
    <Wrapper>
      <Header />
      <ConfirmationText>
        {userSession.firstName + " " + userSession.lastName}, Your order is
        confirmed!
      </ConfirmationText>
      {cart &&
        cart.map((item) => {
          return (
            <ProductDiv key={item._id}>
              <Div1 to={`/item/${item._id}`}>
                <ProductImg src={item.imageSrc} />
                <ProductName>{item.name}</ProductName>
                <ProductCategory>{item.category}</ProductCategory>
                <PriceProduct>{item.price}$</PriceProduct>
              </Div1>
            </ProductDiv>
          );
        })}
      <TotalPrice>Total: {totalPrice} $</TotalPrice>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const ConfirmationText = styled.h3`
  margin-left: 33%;

  margin-bottom: 50px;
  color: black;
`;

const ProductDiv = styled.div`
  display: flex;
  justify-content: left;
  width: 500px;
  padding: 30px;

  background-color: transparent;

  &:hover {
    background-color: whitesmoke;
  }
`;

const Div1 = styled.div`
  display: flex;

  margin-left: 10px;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

const ProductName = styled.h3`
  margin-top: 2px;
  margin-bottom: 4px;
  margin-left: 10px;
  font-size: 15px;
`;
const ProductCategory = styled.p`
  font-weight: bold;
  color: grey;
  margin-top: 5px;
  margin-left: 15px;
  font-size: 12px;
`;
const ProductImg = styled.img`
  width: 50px;
`;

const PriceProduct = styled.p`
  margin-top: 5px;
  margin-left: 75px;
  font-size: 15px;
  color: goldenrod;
`;

const TotalPrice = styled.p`
  font-size: 30px;
  margin-left: 400px;
  font-size: 20px;
`;

export default Confirmation;
