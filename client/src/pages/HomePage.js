import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Items from "../components/Items";
import { ItemsContext } from "../components/ItemsContext";

const HomePage = () => {
  const { loading } = useContext(ItemsContext);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Wrapper>
      <Header />
      <Items />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default HomePage;
