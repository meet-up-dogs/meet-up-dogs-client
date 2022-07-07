import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosPublic } from "../../util/axiosConfig";
import React from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import "./matchCard.css";
import Chat from "../Chat/Chat";
import { MainContext } from "../../context/MainContext";

const MatchCard = (props) => {
  const [fav, setFav] = useState(true);
  const [isOpenChat, setIsOpenChat] = useState(false);

  const [user, setUser, loading, selectedUser, setSelectedUser] =
    useContext(MainContext);
  return (
    <>
      {isOpenChat ? (
        <Chat />
      ) : (
        <>
          <Header />
          <main className="match-card">
            <img src={selectedUser.userImage} alt="" className="match-img" />
            <div className="match-container">
              <h2>{selectedUser.username}</h2>
              <p>
                Description: <br />
                {selectedUser.description}
              </p>
              <p>Gender:{selectedUser.gender}</p>
              <div className="btns">
                <button
                  onClick={() => {
                    setIsOpenChat(true);
                  }}
                >
                  <ChatIcon />
                </button>

                {fav && (
                  <IconButton
                    onClick={() => {}}
                    aria-label="delete"
                    color="primary"
                  >
                    <FavoriteBorderIcon></FavoriteBorderIcon>
                  </IconButton>
                )}
                {!fav && (
                  <IconButton
                    onClick={() => {}}
                    aria-label="delete"
                    color="primary"
                  >
                    <FavoriteIcon></FavoriteIcon>
                  </IconButton>
                )}
              </div>
            </div>
          </main>

          <Footer />
        </>
      )}
    </>
  );
};

export default MatchCard;
