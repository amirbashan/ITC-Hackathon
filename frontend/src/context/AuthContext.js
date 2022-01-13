import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, userName: action.payload };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    userName: "this user",
    user: null,
    authIsReady: false,
  });

  const setUserName = (userName) => {
    dispatch({ type: "SET_USER", payload: userName });
  };

  return (
    <AuthContext.Provider value={{ ...state, setUserName, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
