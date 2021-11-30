import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Items from "./Items";

const HomePage = () => {
  return (
    <Wrapper>
      <Header />
      <Items />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default HomePage;
