import React, { useState, createContext } from "react";

export const MainContext = createContext();

export const MainContextProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <MainContext.Provider value={[isLogin, setIsLogin]}>
      {props.children}
    </MainContext.Provider>
  );
};
