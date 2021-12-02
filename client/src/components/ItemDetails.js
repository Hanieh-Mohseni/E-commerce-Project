import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Header from "./Header";
import { useHistory } from "react-router-dom";

//apis
import { getItem } from "../api/items";
import { addItemToCart } from "../api/users";

//contexts
import { useUserContext } from "../contexts/UserContext";

const ItemDetails = () => {
  const history = useHistory();
  const {
    state: { userId },
    actions: { refreshCart },
  } = useUserContext();
  const [item, setItem] = useState("");
  const { itemId } = useParams();

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const { status, data } = await getItem(itemId);
        if (status === 200) {
          setItem(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchItemData();
  }, []);

  const updateCart = async (item) => {
    const { status } = await addItemToCart({ userId, item });
    if (status === 200) {
      refreshCart();
      history.push("/cart");
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Header />
      <ProductDiv>
        <Div1>
          <ProductName>{item.name}</ProductName>
          <ProductCategory>{item.category}</ProductCategory>
          <ProductImg src={item.imageSrc} />
        </Div1>
        <Div2>
          <StockProduct>
            {item.numInStock > 0
              ? `in stock: ${item.numInStock}`
              : "Out of stock"}
          </StockProduct>
          <PriceProduct>{item.price}$</PriceProduct>
          <DivButton>
            <AddtoCartBtn
              disabled={!(item.numInStock > 0)}
              onClick={() => {
                if (!userId) {
                  //only let logged in users add items to cart
                  history.push("/signin");
                  return;
                }
                updateCart(item);
              }}
            >
              Add to cart
            </AddtoCartBtn>
          </DivButton>
        </Div2>
      </ProductDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const ProductDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 70px;
  padding: 20px;
`;
const Div1 = styled.div``;

const ProductName = styled.h2`
  margin-bottom: 0;
`;

const ProductCategory = styled.p`
  margin-top: 2px;
  font-size: 20px;
  color: goldenrod;
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
  color: goldenrod;
`;

const DivButton = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddtoCartBtn = styled.button`
  width: 80px;
  height: 40px;
  cursor: pointer;
  margin-top: 5px;
  border: none;
  background-color: grey;
  border-radius: 5px;
  &:hover  {
    background-color: gold;
    font-weight: bold;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

export default ItemDetails;
