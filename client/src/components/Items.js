import React, { useContext } from "react";
import styled from "styled-components";
import { ItemsContext } from "./ItemsContext";

const Items = () => {
  const { data } = useContext(ItemsContext);
  console.log(data);

  return (
    <Wrapper>
      {data &&
        data.map((item) => {
          return (
            <ProductDiv>
              <Div1>
                <ProductName>{item.name}</ProductName>
                <ProductCategory>{item.category}</ProductCategory>
                <ProductImg src={item.imageSrc} />
              </Div1>
              <Div2>
                <StockProduct>in stock: {item.numInStock}</StockProduct>
                <PriceProduct>{item.price}$</PriceProduct>
                <BuyButton>Buy</BuyButton>
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

const ProductDiv = styled.button`
  display: flex;
  margin-bottom: 12px;
  width: 300px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;
`;

const Div1 = styled.div`
  margin-left: 10px;
`;

const Div2 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 10px;
`;

const ProductName = styled.h3`
  margin-top: 2px;
`;
const ProductCategory = styled.p`
  font-weight: bold;
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
`;

const BuyButton = styled.button`
  cursor: pointer;
`;
export default Items;
