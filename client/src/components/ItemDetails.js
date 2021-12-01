import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const ItemDetails = () => {
  const [item, setItem] = useState("");
  const {itemId} = useParams();

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await fetch(`/api/item/${itemId}`);
        const parseResponse = await response.json();
        setItem(parseResponse);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItemData();
  }, []);

  console.log(item);
  return (
    <Wrapper>
      <Title to="/">E-com</Title>
      ITEM DETAILS
      <Wrapper>
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
    </Wrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Title = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-size: 40px;
`;

export default ItemDetails;
