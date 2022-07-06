import { useEffect, useState } from "react";
import React from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer";
import "./matchList.css";
import { NavLink } from "react-router-dom";


const MatchList = (props) => {
//   useEffect(()=>{
//     const checkedUser = async () => {
//       let savedUser = await localStorage.getItem(props.matchedUser);
//       if(savedUser) {
//         props.setCurrentMatchedUser(props.matchedUser)
//       }
//     } 
//     checkedUser()
//   })
  console.log(props.matchUsers)
  console.log(props.matchedUser)
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
                  const matchedUser = props.matchUsers.find(
                    (matchUser) => matchUser.username === user.username
                  ) 
                  props.setCurrentMatchedUser(
                    matchedUser
                  );
                  localStorage.setItem(matchedUser)
                }}
              >
                <div className="container">

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
