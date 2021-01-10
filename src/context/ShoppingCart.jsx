import React from "react";
import { shoppingCartReducer } from "./Reducer";
export const shoppingCartContext = React.createContext();

export const ShoppingCartProvider = ({ children }) => {
  const initialState = {
    cart: []
  };
  const [state, dispatch] = React.useReducer(shoppingCartReducer, initialState);
  // set initial state

  React.useEffect(() => {
    let initialCart = JSON.parse(localStorage.getItem("cart"));
    console.log(initialCart);
    if (initialCart !== undefined && initialCart !== null) {
      dispatch({ type: "LOAD", payload: initialCart });
    }
  }, []);
  return (
    <shoppingCartContext.Provider value={{ state, dispatch }}>
      {children}
    </shoppingCartContext.Provider>
  );
};

// dispatch({type: "ADD", payload})
