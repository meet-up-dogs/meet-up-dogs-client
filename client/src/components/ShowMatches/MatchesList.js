import { useEffect } from "react";
import axios from "axios";
import React from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer";

const MatchList = (props) => {
  const getMatchedUsers = async () => {
    const resp = await axios.get("http://localhost:4000/getMatchedUsers", {
      withCredentials: true,
    });
    console.log(resp.data);
  };

  useEffect(() => {
    getMatchedUsers();
  }, []);
  return (
    <>
      <Header
        user={props.user}
        login={props.login}
        handleChange={props.handleChange}
      />

      <h2>Match List - x Treffer:</h2>
      <p>nnn</p>
      <Footer />
    </>
  );
};

export default MatchList;
