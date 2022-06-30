import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer";
import "./matchCard.css";

const MatchCard = (props) => {
  return (
    <>
      <Header
        user={props.user}
        login={props.login}
        handleChange={props.handleChange}
      />
      <p>{props.currentUser.username}</p>
      {/* <main className="matchedCard">
        <h2>single matchcard</h2>
        {props.matchUser.map((user) => {
          return (
            <>
              <li>{user.username}</li>
              <img src={user.userImage} alt="" />
              <p>{user.description}</p>
              <li>{user.gender}</li>
            </>
          )
        })}

      </main> */}
      <Link to="/chat">
        <button>Start Chat</button>
      </Link>
      <Footer />
    </>
  );
};

export default MatchCard;
