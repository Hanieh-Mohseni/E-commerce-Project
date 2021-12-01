import React, { useEffect, createContext, useState } from "react";
import { useFetch } from "../hooks/useFetch/index";

export const ItemsContext = createContext(null);

export const ItemsProvider = ({ children }) => {
  const { loading, data } = useFetch("/api/items");

  useEffect(() => {}, [data, loading]);
  return (
    <ItemsContext.Provider
      value={{
        data,
        loading,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
