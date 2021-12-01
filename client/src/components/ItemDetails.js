import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";

const ItemDetails = () => {
  const [item, setItem] = useState("");
  const { itemId } = useParams();

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await fetch(`/api/item/${itemId}`);
        const parseResponse = await response.json();
        setItem(parseResponse);
        console.log(item);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItemData();
  }, []);

  if (!item) {
    return <div>Loading...</div>;
  }

  console.log(item);

  return (
    <Wrapper>
      <Title to="/">E-com</Title>
      <NavBar />
      <ProductDiv>
        <Div1>
          <ProductName>{item.data.name}</ProductName>
          <ProductCategory>{item.data.category}</ProductCategory>
          <ProductImg src={item.data.imageSrc} />
        </Div1>
        <Div2>
          <StockProduct>in stock: {item.data.numInStock}</StockProduct>
          <PriceProduct>{item.data.price}$</PriceProduct>
          <BuyButton>Buy</BuyButton>
        </Div2>
      </ProductDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Title = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-size: 40px;
`;

const ProductDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 70px;
  margin-left: 100px;
`;
const Div1 = styled.div``;

const ProductName = styled.h2`
  margin-bottom: 0;
`;

const ProductCategory = styled.p`
  margin-top: 2px;
  font-size: 20px;
`;

const ProductImg = styled.img`
  width: 300px;
  margin-top: 25px;
`;

const Div2 = styled.div`
  margin-top: 100px;
`;

const StockProduct = styled.p`
  font-size: 25px;
`;
const PriceProduct = styled.p`
  font-size: 32px;
`;

const BuyButton = styled.button`
  width: 80px;
  height: 40px;

  cursor: pointer;
`;

export default ItemDetails;
