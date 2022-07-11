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
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [fav, setFav] = useState(
    JSON.parse(localStorage.getItem("fav")) || false
  );

  const favToggle = () => {
    localStorage.setItem("fav", JSON.stringify(!fav));

    setFav(!fav);
  };
  // const handleFav = async () =>{
  //     setFav(props.currentUser.favorite)
  //     console.log(props.currentUser)
  //     console.log(props.user)
  //     console.log(fav)

  //     if(props.currentUser.favorite){
  //       try {
  //         const axiosResp = await axiosPublic.post("/currentUser", props.currentUser, {
  //           withCredentials: true,
  //         });
  //         console.log("axiosResp.data:", props.currentUser);
  //         if (!axiosResp) {
  //           console.debug("axiosResp.data:", axiosResp);
  //         } else {
  //           console.debug("axiosResp.data:", axiosResp);
  //         }
  //       } catch (error) {
  //         console.log("Error while sending with axios", error);
  //       }

  //     }
  //   }
  // const handleFav = () => {
  //   localStorage.setItem("fav", JSON.stringify(!fav))
  //   setFav(!fav)
  //   props.setCurrentUser(props.currentUser)

  // }

  const [user, setUser, loading, selectedUser, setSelectedUser] =
    useContext(MainContext);
  return (
    <>
      {isOpenChat ? (
        <Chat />
      ) : (
        <>
          <Header
            user={props.user}
            login={props.login}
            handleChange={props.handleChange}
          />
          <main className="match-card">
            <img
              src={props.currentUser.userImage}
              alt=""
              className="match-img"
            />
            <div className="match-container">
              <h2>{props.currentUser.username}</h2>
              <p>
                Description: <br />
                {props.currentUser.description}
              </p>
              <p>Gender:{props.currentUser.gender}</p>
              <div className="btns">
                <Link to="/chat">
                  <button>
                    <ChatIcon />
                  </button>
                </Link>
                {fav && (
                  <IconButton
                    onClick={() => {
                      favToggle();
                    }}
                    aria-label="delete"
                    color="primary"
                  >
                    <FavoriteBorderIcon></FavoriteBorderIcon>
                  </IconButton>
                )}
                {!fav && (
                  <IconButton
                    onClick={() => {
                      favToggle();
                    }}
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
