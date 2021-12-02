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

  let total = cart.reduce((acc, cur) => {
    return acc + Number(cur.price.slice(1));
  }, 0);

  const totalPrice = total.toFixed(2);

  //cart is fetched from usercontext
  //make use of it to show the items in cart
  console.log(cart);
  return (
    <Wrapper>
      <Header />
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
              <DeleteItemButton>X</DeleteItemButton>
            </ProductDiv>
          );
        })}
      <Div2>
        <TotalPrice>Total: {totalPrice} $</TotalPrice>
        <BuyButton>Buy</BuyButton>
      </Div2>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const ProductDiv = styled.div`
  display: flex;
  justify-content: right;
  width: auto;
  padding: 30px;
  border: black solid 1px;
  border-radius: 5px;
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
`;
const ProductCategory = styled.p`
  font-weight: bold;
  color: grey;
  margin-top: 5px;
  margin-left: 15px;
`;
const ProductImg = styled.img`
  width: 100px;
`;

// const StockProduct = styled.p`
//   margin-top: 80px;
//   font-size: 17px;
//   font-weight: bold;
// `;

const PriceProduct = styled.p`
  margin-top: 5px;
  margin-left: 75px;
  font-size: 20px;
  color: goldenrod;
`;

const DeleteItemButton = styled.button`
  height: 40px;
  border: none;
  background-color: transparent;
  margin-left: 100px;
  font-size: 20px;
  cursor: pointer;
`;

const Div2 = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 20px;
`;

const TotalPrice = styled.p`
  font-size: 30px;
  margin-top: 0;
`;

const BuyButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: grey;
  border-radius: 5px;
  width: 110px;
  height: 30px;
  color: white;
  margin-left: 50px;
  margin-right: 10px;

  &:hover  {
    background-color: gold;
    font-weight: bold;
    color: black;
  }
`;

export default Cart;
