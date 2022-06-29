import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer";
import "./matchList.css";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { NavLink } from "react-router-dom";

const MatchList = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Header
        user={props.user}
        login={props.login}
        handleChange={props.handleChange}
      />
      <main className="matchedList">
        <ul>
          {props.matchUsers.map((user) => {
            return (
              <>
                <div
                  className="matched-card"
                  onClick={() => {
                    props.setCurrentMatchedUser(
                      props.matchUsers.find(
                        (matchUser) => matchUser.username === user.username
                      )
                    );
                  }}
                >
                  <li>Name:{user.username}</li>
                  <li>DogBreed:{user.dogBreed}</li>

                  <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) =>
                      handleChange(event, newValue)
                    }
                  >
                    <BottomNavigationAction
                      component={NavLink}
                      to="/matchcard"
                      label="Profil"
                      icon={
                        <img
                          src={user.userImage}
                          alt="userPhoto"
                          style={{ width: "50px", height: "50px" }}
                        />
                      }
                    />
                  </BottomNavigation>
                </div>
              </>
            );
          })}
        </ul>
      </main>

      <Footer />
    </>
  );
};

export default MatchList;
