import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { NavLink, useHistory } from "react-router-dom";
import { signUp } from "../api/users";

//hooks
import { useInputState } from "../hooks";

const SignUpPage = () => {
  const history = useHistory();
  const initialState = {
    email: "",
    firstName: "",
    lastName: "",
  };
  const [userInfo, handleUserInfoChange] = useInputState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { status, data } = await signUp(userInfo);
    //successful signup
    if (status === 200) {
      //**TODO**
      //context for current user
      //update the user state
      history.push("/");
    } else {
      //server error
    }
  };

  return (
    <Wrapper>
      <Header />
      <DivSignIn>
        <FormSignIn onSubmit={handleSubmit}>
          Sign In{" "}
          <Input
            name="email"
            placeholder="Email Address"
            type="email"
            value={userInfo.email}
            onChange={handleUserInfoChange}
          />
          <Input
            name="firstName"
            placeholder="First Name"
            value={userInfo.firstName}
            onChange={handleUserInfoChange}
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            value={userInfo.lastName}
            onChange={handleUserInfoChange}
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
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 255px;
  padding: 10px;
  border: solid black 2px;
  border-radius: 5px;
  color: black;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 19px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button``;
export default SignUpPage;
