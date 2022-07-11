import React, { useState, createContext, useEffect } from "react";
import { axiosPublic } from "../util/axiosConfig";

export const MainContext = createContext();

export const MainContextProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      try {
        const resp = await axiosPublic.get("/currentUser", {
          withCredentials: true,
        });
        console.log("ustawaia uzytkowniaka");
        setUser(resp.data);
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => setLoading(false), 500);
    };

    getUser();
  }, []);
  console.log(user.username);
  // const [isLogin, setIsLogin] = useState(false);
  return (
    <MainContext.Provider
      value={[user, setUser, loading, selectedUser, setSelectedUser]}
    >
      {props.children}
    </MainContext.Provider>
  );
};
