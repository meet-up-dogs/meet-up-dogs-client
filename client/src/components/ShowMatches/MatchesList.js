import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer";
import "./matchList.css"

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

  const Users = [
    {
      name: "alex",
      city: "Berlin",
      languages: "En"
    },
    {
      name: "Joe",
      city: "Hamburg",
      languages: "En"
    },
    {
      name: "Mark",
      city: "Berlin",
      languages: "De"
    }, {
      name: "John",
      city: "Frankfurt",
      languages: "En"
    }

  ]


  return (
    <>
      <Header
        user={props.user}
        userName={props.currentUser.username}
        login={props.login}
        handleChange={props.handleChange}
      />
      <main className="matchedList">
      {Users.map((user)=>{
        return(
          <p>{user.name}</p>
        )
      })}


      </main>

      <Footer />
    </>
  );
};

export default MatchList;
