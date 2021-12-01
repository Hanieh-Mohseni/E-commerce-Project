import React, { useContext } from "react";
import styled from "styled-components";
import { ItemsContext } from "./ItemsContext";
import { NavLink } from "react-router-dom";

const Items = () => {
  const { data, numOfCartItems, setNumOfCartItems, cartItems, setCartItems } =
    useContext(ItemsContext);
  console.log(data);

  const updateCart = (id) => {
    setNumOfCartItems(numOfCartItems + 1);
    setCartItems((cartItems) => [...cartItems, id]);
  };

  console.log(cartItems);
  return (
    <Wrapper>
      {data &&
        data.map((item) => {
          return (
            <ProductDiv>
              <Div1 to={`/item/${item._id}`}>
                <ProductName>{item.name}</ProductName>
                <ProductCategory>{item.category}</ProductCategory>
                <ProductImg src={item.imageSrc} />
              </Div1>
              <Div2>
                <StockProduct>in stock: {item.numInStock}</StockProduct>
                <PriceProduct>{item.price}$</PriceProduct>
                <BuyButton>Buy</BuyButton>
                <AddtoCartBtn
                  onClick={() => {
                    updateCart(item._id);
                  }}
                >
                  Add to cart
                </AddtoCartBtn>
              </Div2>
            </ProductDiv>
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ProductDiv = styled.div`
  display: flex;
  margin-bottom: 50px;
  width: 350px;
  padding: 30px;
  border-radius: 5px;
  background-color: transparent;

  &:hover {
    background-color: whitesmoke;
  }
`;

const Div1 = styled(NavLink)`
  margin-left: 10px;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

const Div2 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 10px;
`;

const ProductName = styled.h3`
  margin-top: 2px;
  margin-bottom: 4px;
`;
const ProductCategory = styled.p`
  font-weight: bold;
  color: grey;
  margin-top: 5px;
`;
const ProductImg = styled.img``;

const StockProduct = styled.p`
  margin-top: 80px;
  font-size: 17px;
  font-weight: bold;
`;

const PriceProduct = styled.p`
  margin-top: 10px;
  font-size: 20px;
  color: goldenrod;
`;

const BuyButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: grey;
  border-radius: 5px;
  width: 90px;
  height: 30px;
  color: white;

  &:hover  {
    background-color: gold;
    font-weight: bold;
    color: black;
  }
`;

const AddtoCartBtn = styled.button`
  cursor: pointer;
  margin-top: 3px;
  border: none;
  border-radius: 5px;
  height: 30px;
  color: white;

  background-color: grey;
  &:hover  {
    background-color: gold;
    font-weight: bold;
    color: black;
  }
`;
export default Items;
