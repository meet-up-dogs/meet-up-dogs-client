import React, { useState, createContext, useEffect } from "react";
import { axiosPublic } from "../util/axiosConfig";

export const MainContext = createContext();

export const MainContextProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [notifications, setNotifications] = useState("");

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      try {
        const resp = await axiosPublic.get("/currentUser", {
          withCredentials: true,
        });
        setUser(resp.data);
      } catch (err) {
        console.log(err.message);
      }
      setLoading(false);
    };

    getUser();
  }, []);
  return (
    <MainContext.Provider
      value={[
        user,
        setUser,
        loading,
        setLoading,
        selectedUser,
        setSelectedUser,
        notifications,
        setNotifications,
      ]}
    >
      {props.children}
    </MainContext.Provider>
  );
};
