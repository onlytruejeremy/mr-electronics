import React from "react";
import { firebaseReducer } from "./Reducer";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    user: null
  };
  const [state, dispatch] = React.useReducer(firebaseReducer, initialState);

  React.useEffect(() => {
    let initialUser = JSON.parse(localStorage.getItem("user"));

    if (initialUser !== undefined && initialUser !== null) {
      dispatch({ type: "LOGIN", payload: initialUser });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
