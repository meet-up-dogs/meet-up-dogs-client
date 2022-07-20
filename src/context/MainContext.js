import React, { useState, createContext, useEffect } from "react";
import { axiosPublic } from "../util/axiosConfig";

export const MainContext = createContext();

export const MainContextProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [selectedUser, setSelectedUser] = useState({});
  const [notifications, setNotifications] = useState([]);

  const getUser = async (onlyNotifications) => {
    try {
      const resp = await axiosPublic.get("/currentUser", {
        withCredentials: true,
      });
      if (!onlyNotifications) {
        console.log("resp.data.notifications: ", resp.data.notifications);
        setUser(resp.data);
      }
      setNotifications(resp.data.notifications);
    } catch (err) {
      console.log(err.message);
    }
    if (!onlyNotifications) setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    getUser();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getUser(true);
    }, 3000);
    return () => clearInterval(interval);
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
