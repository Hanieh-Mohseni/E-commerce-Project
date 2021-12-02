import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Items from "../components/Items";
import { useItemsContext } from "../contexts/ItemContext";

const HomePage = () => {
  const { loading } = useItemsContext();
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
