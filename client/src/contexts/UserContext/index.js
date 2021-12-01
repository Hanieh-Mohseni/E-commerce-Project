import React, { useReducer, useContext, createContext } from "react";
import * as actions from "./actionTypes";

//api
import { getUser } from "../../api/users";

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
        loading: false,
        userId: _id,
        ...rest,
      };
    case actions.LOGOUT:
      return {
        ...initialState,
      };
    case actions.REFRESH_CART:
      const cart = action.payload.cart;
      return {
        ...state,
        cart,
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
    sessionStorage.removeItem("user");
    dispatch({
      type: actions.LOGOUT,
    });
  };

  const refreshCart = async () => {
    loading();
    const { status, data } = await getUser({ email: state.email });
    if (status === 200) {
      const { _id, ...rest } = data;
      sessionStorage.setItem("user", JSON.stringify({ ...rest, userId: _id }));
      dispatch({
        type: actions.REFRESH_CART,
        payload: { cart: data.cart },
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        state,
        actions: { login, logout, refreshCart },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
