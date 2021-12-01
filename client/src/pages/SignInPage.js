import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { NavLink, useHistory } from "react-router-dom";

//apis
import { signIn } from "../api/users";
import { useInputState } from "../hooks";

//contexts
import { useUserContext } from "../contexts/UserContext";

const SignInPage = () => {
  const {
    actions: { login },
  } = useUserContext();
  const history = useHistory();
  const initialState = {
    email: "",
  };
  const [input, handleInputChange] = useInputState(initialState);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status, data } = await signIn(input);
    //successful login
    if (status === 200) {
      const { _id, ...rest } = data;
      //store it in sessionStorage
      sessionStorage.setItem("user", JSON.stringify({ rest, userId: _id }));
      //context for current user
      //update the user context
      login(data);
      history.push("/");
    } else {
      //user not found
    }
  };

  return (
    <Wrapper>
      <Header />
      <DivSignIn>
        <FormSignIn onSubmit={handleSubmit}>
          <SignInText> Sign In</SignInText>

          <Input
            placeholder="email address"
            value={input.email}
            name="email"
            type="email"
            onChange={handleInputChange}
          />
          <SubmitButton type="submit">GO</SubmitButton>
        </FormSignIn>
      </DivSignIn>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const SignInText = styled.h3`
  font-size: 50px;
  font-family: "Bebas Neue", cursive;
  margin-bottom: 5px;
  color: goldenrod;
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

const SubmitButton = styled.button`
  width: 55px;
  height: 45px;
  margin-left: 5px;
  border: none;
  border-radius: 5px;
  font-size: 25px;
  color: white;
  font-family: "Bebas Neue", cursive;
  background-color: grey;
  &:hover {
    background-color: goldenrod;
    color: black;
  }
`;
export default SignInPage;
