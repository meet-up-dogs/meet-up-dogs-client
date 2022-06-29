import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Header from "../Header/Header.js"
import Footer from '../Footer/Footer';
import "./matchCard.css"


const MatchCard = (props) => {




  return (
    <>
      <Header
        user={props.user}
        login={props.login}
        handleChange={props.handleChange}
      />
      <p>{props.currentUser.username}</p>
      <main className="matchedCard">
        <h2>single matchcard</h2>
       
  
            <>
              <li>{props.currentUser.username}</li>
              <img src={props.currentUser.userImage} alt="" />
              <p>{props.currentUser.description}</p>
              <li>{props.currentUser.gender}</li>
            </>
      

      </main>
      <Footer />
    </>
  );
};


export default MatchCard;