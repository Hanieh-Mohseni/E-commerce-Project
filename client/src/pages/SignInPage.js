import React, { useEffect, useState } from "react";
import styled from "styled-components";

import NavBar from "../components/NavBar";
import { NavLink, useHistory } from "react-router-dom";

//apis
import { signIn } from "../api/users";
import { useInputState } from "../hooks";

const SignInPage = () => {
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
      //**TODO**
      //context for current user
      //update the user state
      history.push("/");
    } else {
      //user not found
    }
  };

  return (
    <Wrapper>
      <Title to="/">E-com</Title>
      <NavBar />
      <DivSignIn>
        <FormSignIn onSubmit={handleSubmit}>
          Sign In{" "}
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
