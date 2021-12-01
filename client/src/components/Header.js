import React from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";

const Header = () => {
  return (
    <Wrapper>
      <DivUpper>
        <Title>E-com</Title>

        <SignInButton href="/signin">Sign In</SignInButton>
      </DivUpper>
      <NavBar />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Title = styled.h2``;
const DivUpper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SignInButton = styled.a`
  color: black;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 5px;
`;

export default Header;
