import { useState } from "react";

export const useInputState = (initialVal) => {
  const [state, setState] = useState(initialVal);
  const handleInputChanage = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return [state, handleInputChanage, setState];
};
