import React, { useState } from "react";
import axios from "axios";
export const UserContext = React.createContext();

export const useUser = () => {
  return React.useContext(React.UserContext);
};

const Store = ({ children }) => {
  const [loginStatus, setloginStatus] = useState(true);

  return (
    <UserContext.Provider
      value={{
        loginStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Store;
