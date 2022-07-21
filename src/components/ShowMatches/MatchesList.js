import { useEffect, useState, useContext } from "react";
import React from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer";
import "./matchList.css";
import { NavLink } from "react-router-dom";
import FavoriteButton from "./FavoriteButton.js";
import { axiosPublic } from "../../util/axiosConfig";
import MatchCard from "../ShowMatches/MatchCard";
import { MainContext } from "../../context/MainContext";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    color: "white",
  },
});

const MatchList = (props) => {
  const [user, setUser, loading, setLoading, selectedUser, setSelectedUser] =
    useContext(MainContext);
  const [matchUsers, setMatchUsers] = useState([]);
  const [showCard, setShowCard] = useState(false);

  const getMatchUsers = async () => {
    const resp = await axiosPublic.get("/getMatchedUsers", {
      withCredentials: true,
    });
    console.log(resp.data);
    await setMatchUsers(resp.data);
  };

  useEffect(() => {
    getMatchUsers();
  }, []);
  return (
    <>
      {matchUsers.length === 0 ? (
        <>
          <Header />

          <div className="alert-no-matches">
            <Alert severity="warning">
              unfortunately there are no hits for your area!
            </Alert>
          </div>
          <Footer />
        </>
      ) : (
        <>
          <ThemeProvider theme={darkTheme}>
            {showCard ? (
              <MatchCard />
            ) : (
              <>
                <Header />
                <div className="matches-container">
                  <div className="matches-search"></div>
                  <h2 className="cards-title">Matching users</h2>
                  <main className="cards">
                    {matchUsers.map((userObj) => {
                      return (
                        <div
                          style={{
                            backgroundImage: `url( ${userObj.userImage})`,
                          }}
                          key={userObj.username}
                          className="card"
                          onClick={() => {
                            setSelectedUser(
                              matchUsers.find(
                                (matchUser) =>
                                  matchUser.username === userObj.username
                              )
                            );
                            setShowCard(true);
                          }}
                        >
                          {/* <img
                          src={userObj.userImage}
                          alt="user-foto"
                          className="card-img"
                        /> */}
                          <div className="card-bio">
                            <p>{userObj.username}</p>
                            <p>{userObj.dogBreed}</p>
                          </div>
                        </div>
                      );
                    })}
                  </main>
                </div>
                <Footer />
              </>
            )}
          </ThemeProvider>
        </>
      )}
    </>
  );
};

export default MatchList;
