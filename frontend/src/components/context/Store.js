import React, { useState } from "react";
import axios from "axios";
export const Context = React.createContext();



const Store = ({ children }) => {
    const [loginStatus, setloginStatus] = useState(true)
  
  return (
    <Context.Provider
      value={{
        loginStatus
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Store;
