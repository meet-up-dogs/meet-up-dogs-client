import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer";
import "./matchList.css"
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { NavLink } from "react-router-dom";


const MatchList = (props) => {
  const [matchUser, setMatchUser] = useState([])
  const getMatchedUsers = async () => {
    const resp = await axios.get("http://localhost:4000/getMatchedUsers", {
      withCredentials: true,
    });
    setMatchUser(resp.data)
    console.log(resp.data);
  };

  useEffect(() => {
    getMatchedUsers();
  }, []);

  
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
          {matchUser.map((user) => {
            return (
              <>
                <li>Name:{user.username}</li>
                <li>DogBreed:{user.dogBreed}</li>

                <BottomNavigation
                  showLabels
                  value={value}
                  onChange={(event, newValue) => handleChange(event, newValue)}
                >
                  
                  <BottomNavigationAction
                    component={NavLink}
                    to="/matchcard"
                    label="Profil"
                    icon={<img src={user.userImage} alt="userPhoto" style={{ width: "50px", height: "50px" }} />}
                  />
                </BottomNavigation>
              </>
            )
          })}

        </ul>

      </main>

      <Footer />
    </>
  );
};

export default MatchList;
