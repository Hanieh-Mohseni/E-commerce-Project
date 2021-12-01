import React from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";

//contexts
import { useUserContext } from "../contexts/UserContext";

const Header = () => {
  const {
    state: { userId },
    actions: { logout },
  } = useUserContext();

  return (
    <Wrapper>
      <DivUpper>
        <Title>E-com</Title>

        {userId ? (
          <LoginButton
            onClick={() => {
              sessionStorage.removeItem("user");
              logout();
            }}
          >
            Logout
          </LoginButton>
        ) : (
          <SignInButton href="/signin">Sign In</SignInButton>
        )}
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

const LoginButton = styled.button`
  color: black;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 5px;
`;

export default Header;
