import { useEffect, useState } from "react";
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
      <div className="cards">

        {props.matchUsers.map((user) => {
          return (
            <>
              <main>              
                <div
                className="card"
                onClick={() => {
                  props.setCurrentMatchedUser(
                    props.matchUsers.find(
                      (matchUser) => matchUser.username === user.username
                    )
                  );
                }}
              >
                <div className="container">

                  {/* <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) =>
                      handleChange(event, newValue)
                    }
                  >
                    <BottomNavigationAction
                      component={NavLink}
                      to="/matchcard"
                      label=""
                      icon={
                        <img
                          src={user.userImage}
                          alt="userPhoto"
                          className="card-img"
                        />
                      }
                    />
                  </BottomNavigation> */}

                  <NavLink to="/matchcard">
                    <img src={user.userImage} alt="user-foto" className="card-img"/>
                  </NavLink>
                  <div className="bio">
                  <li>{user.username}</li>
                  <li>DogBreed:{user.dogBreed}</li>
                  </div>
                
                </div>
              </div>
              </main>

            </>
          );
        })}

      </div>

      <Footer />
    </>
  );
};

export default MatchList;
