import React, { useReducer, useContext, createContext } from "react";
import * as actions from "./actionTypes";

//api
import { signIn } from "../../api/users";

export const UserContext = createContext();

const initialState = sessionStorage.getItem("user")
  ? JSON.parse(sessionStorage.getItem("user"))
  : {
      loading: false,
      userid: null,
      email: null,
      firstName: null,
      lastName: null,
      cart: [],
      purchased: [],
    };

const reducer = (state, action) => {
  switch (action.type) {
    case actions.LOADING:
      return { ...state, loading: true };
    case actions.LOGIN:
      const { _id, ...rest } = action.payload.userInfo;
      return {
        ...state,
        loading: false,
        userId: _id,
        ...rest,
      };
    case actions.LOGOUT:
      return {
        ...initialState,
      };
    default:
      throw new Error(`Unknown Error`);
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //action creator
  //better to move it to separate file
  const loading = () => {
    dispatch({
      type: actions.LOADING,
    });
  };

  //body = {email: string}
  const login = async (userInfo) => {
    loading();
    dispatch({
      type: actions.LOGIN,
      payload: { userInfo },
    });
  };

  const logout = () => {
    dispatch({
      type: actions.LOGOUT,
    });
  };

  return (
    <UserContext.Provider
      value={{
        state,
        actions: { login, logout },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
