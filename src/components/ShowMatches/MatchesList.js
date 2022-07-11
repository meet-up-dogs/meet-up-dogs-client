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
      {showCard ? (
        <MatchCard />
      ) : (
        <>
          <Header />

          <div className="cards">
            {matchUsers.map((userObj) => {
              return (
                <div key={userObj.username}>
                  <main>
                    <div
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
                      <div className="container">
                        <img
                          src={userObj.userImage}
                          alt="user-foto"
                          className="card-img"
                        />
                        <div className="bio">
                          <li>{userObj.username}</li>
                          <li>DogBreed:{userObj.dogBreed}</li>
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
              );
            })}
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default MatchList;
