import React, { useEffect, createContext, useState, useContext } from "react";
import { useFetch } from "../hooks/useFetch/index";
import { getItems } from "../api/items";

export const ItemsContext = createContext(null);

export const ItemsProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getPaginatedItems = async () => {
    setLoading(true);
    setPage(page);
    const { status, data: items } = await getItems(page);
    if (status === 200) {
      setData(items);
    }
    setLoading(false);
  };

  const updateCurrentPage = (page) => {
    setPage(page);
  };

  //get page 1 on load
  useEffect(() => {
    getPaginatedItems();
  }, [page]);

  return (
    <ItemsContext.Provider
      value={{
        data,
        loading,
        page,
        actions: { getPaginatedItems, updateCurrentPage },
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export const useItemsContext = () => {
  return useContext(ItemsContext);
};
