import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";

const SignInPage = () => {
  return (
    <Wrapper>
      <Title to="/">E-com</Title>
      <NavBar />
      <DivSignIn>
        <FormSignIn>
          Sign In <Input placeholder="email address" />
        </FormSignIn>
        <SubmitButton>GO</SubmitButton>
      </DivSignIn>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Title = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-size: 40px;
`;

const DivSignIn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const FormSignIn = styled.form`
  font-size: 20px;
`;

const Input = styled.input`
  width: 255px;
  padding: 10px;
  border: solid black 2px;
  border-radius: 5px;
  color: black;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 19px;
`;

const SubmitButton = styled.button``;
export default SignInPage;
