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
        setUser(resp.data);
        setTimeout(() => setLoading(false), 1000);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, []);

  // const [isLogin, setIsLogin] = useState(false);
  return (
    <MainContext.Provider
      value={[user, setUser, loading, selectedUser, setSelectedUser]}
    >
      {props.children}
    </MainContext.Provider>
  );
};
