import React from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Wrapper>
      <DivUpper>
        <Title to={"/"}>Team MONGO</Title>
        <SignDiv>
          <SignInButton to="/signin">Sign In</SignInButton>
          <SignInButton to="/signup">Sign Up</SignInButton>
        </SignDiv>
      </DivUpper>
      <NavBar />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Title = styled(NavLink)`
  font-family: "Bebas Neue", cursive;
  font-size: 40px;
  text-decoration: none;
  color: black;
`;
const DivUpper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SignDiv = styled.div`
  display: flex;
`;
const SignInButton = styled(NavLink)`
  color: black;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 5px;
  font-family: "Bebas Neue", cursive;
  font-size: 20px;
  &:hover {
    color: gold;
    font-size: 22px;
  }
`;

export default Header;
