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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./matchCard.css";
import Chat from "../Chat/Chat";
import { MainContext } from "../../context/MainContext";
import Button from "@mui/material/Button";

const MatchCard = (props) => {
  // const [fav, setFav] = useState(true);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [fav, setFav] = useState(
    JSON.parse(localStorage.getItem("fav")) || false
  );

  const favToggle = () => {
    localStorage.setItem("fav", JSON.stringify(!fav));

    setFav(!fav);
  };

  const styles = {
    Button: {
      backgroundColor: "#4f850d",
      fontFamily: "system-ui",
      fontWeight: "bold",
      color: "#fff",
      textTransform: "lowercase",
      padding: "0.5rem",
      marginTop: "2rem",
    },
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

  const [user, setUser, loading, setLoading, selectedUser, setSelectedUser] =
    useContext(MainContext);
  return (
    <>
      {isOpenChat ? (
        <Chat />
      ) : (
        <>
          <Header />
          <main className="match-card">
            <div
              className="match-img"
              style={{
                backgroundImage: `url( ${selectedUser.userImage})`,
              }}
            >
              <div
                className="back"
                onClick={() => {
                  document.location.reload();
                }}
              >
                <ArrowBackIcon />
              </div>
              <div className="fav">
                {fav && (
                  <IconButton
                    onClick={() => {
                      favToggle();
                    }}
                    aria-label="delete"
                    style={{ color: "white" }}
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
                    style={{ color: "white" }}
                  >
                    <FavoriteIcon></FavoriteIcon>
                  </IconButton>
                )}
              </div>
            </div>
            <div className="match-container">
              <h2>Hi I'm {selectedUser.username}</h2>
              <h4>Description:</h4>
              <p className="desc">{selectedUser.description}</p>

              <div className="match-details">
                <div>
                  <p>{selectedUser.gender}</p>
                  <span>Gender</span>
                </div>
                <div>
                  <p>{selectedUser.language}</p>
                  <span>Language</span>
                </div>

                <div>
                  <p>{selectedUser.availability.weekDay} </p>
                  <span>Availability</span>
                </div>
              </div>
              <Button
                fullWidth
                style={styles.Button}
                className="save-btn"
                onClick={() => setIsOpenChat(true)}
              >
                Start Chat <ChatIcon />
              </Button>
            </div>
          </main>

          <Footer />
        </>
      )}
    </>
  );
};

export default MatchCard;
