import React, { useEffect, createContext, useState } from "react";
import { useFetch } from "../hooks/useFetch/index";

export const ItemsContext = createContext(null);

export const ItemsProvider = ({ children }) => {
  const { loading, data } = useFetch("/api/items");
  const [cartItems, setCartItems] = useState([]);
  const [numOfCartItems, setNumOfCartItems] = useState(0);

  useEffect(() => {}, [data, loading]);
  return (
    <ItemsContext.Provider
      value={{
        data,
        loading,
        cartItems,
        setCartItems,
        numOfCartItems,
        setNumOfCartItems,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
