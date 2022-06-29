import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Header from "../Header/Header.js"
import Footer from '../Footer/Footer';


const MatchList = (props) => {
  return (
    <>
      <Header
        user={props.user}
        userName={props.currentUser.username}
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