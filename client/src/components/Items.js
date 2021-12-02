import React from "react";
import styled from "styled-components";
import { useItemsContext } from "./ItemsContext";
import { NavLink, useHistory } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { addItemToCart } from "../api/users";

const Items = () => {
  const history = useHistory();

  const {
    loading,
    data,
    page,
    actions: { updateCurrentPage, getPaginatedItems },
  } = useItemsContext();

  const {
    state: { userId },
    actions: { refreshCart },
  } = useUserContext();

  const updateCart = async (item) => {
    const { status } = await addItemToCart({ userId, item });
    if (status === 200) {
      refreshCart();
      history.push("/cart");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const moveToNextPage = () => {
    updateCurrentPage(page + 1);
  };

  const moveToPreviousPage = () => {
    updateCurrentPage(page - 1);
  };

  return (
    <>
      <Wrapper>
        {data &&
          data.map((item) => {
            const itemAvailable = item.numInStock > 0;
            return (
              <ProductDiv key={item._id}>
                <Div1 to={`/item/${item._id}`}>
                  <ProductName>{item.name}</ProductName>
                  <ProductCategory>{item.category}</ProductCategory>
                  <ProductImg src={item.imageSrc} />
                </Div1>
                <Div2>
                  <StockProduct>
                    {itemAvailable
                      ? `in stock: ${item.numInStock}`
                      : "Out of stock"}
                  </StockProduct>
                  <PriceProduct>{item.price}$</PriceProduct>
                  <AddtoCartBtn
                    disabled={!itemAvailable}
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
                </Div2>
              </ProductDiv>
            );
          })}
      </Wrapper>
      <Flex>
        {page === 1 ? (
          <PageButton onClick={moveToNextPage}>{page + 1}</PageButton>
        ) : (
          <>
            <PageButton onClick={moveToPreviousPage}>{page - 1}</PageButton>
            <PageButton onClick={moveToNextPage}>{page + 1}</PageButton>
          </>
        )}
      </Flex>
    </>
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

const AddtoCartBtn = styled.button`
  cursor: pointer;
  margin-top: 3px;
  border: none;
  border-radius: 5px;
  height: 30px;
  color: white;

  background-color: grey;

  &:disabled {
    cursor: not-allowed;
    background-color: none;
  }

  &:hover  {
    background-color: gold;
    font-weight: bold;
    color: black;
  }
`;

const PageButton = styled.button`
  cursor: pointer;
  padding: 5px 10px;
  background-color: gold;
  color: white;
  margin: 0 20px;
  border: none;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;
export default Items;
