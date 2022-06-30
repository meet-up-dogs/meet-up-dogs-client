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

      <main className="matchedCard">
       
            <>
              <img src={props.currentUser.userImage} alt="" className="profilbild"/>
            <h2>{props.currentUser.username}</h2>
            <ul>
              
              <li>Description: <br />{props.currentUser.description}</li>


              <li>Gender:{props.currentUser.gender}</li>
              </ul>
            
            </>
          <div className="buttons">
          <button>Favorite</button>
          <Link to="/chat">
        <button>Start Chat</button>
      </Link>
          </div>
      </main>

        
      <Footer />
    </>
  );
};

export default MatchCard;
