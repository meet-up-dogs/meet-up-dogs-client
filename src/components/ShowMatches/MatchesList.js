import { useEffect, useState, useContext } from "react";
import React from "react";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer";
import "./matchList.css";
import { axiosPublic } from "../../util/axiosConfig";
import MatchCard from "../ShowMatches/MatchCard";
import { MainContext } from "../../context/MainContext";
import Alert from "@mui/material/Alert";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SyncLoader from "react-spinners/SyncLoader";
import TextField from "@mui/material/TextField";
import PetsIcon from "@mui/icons-material/Pets";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    color: "white",
  },
});

const override = {
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
  margin: "20rem auto",
  borderColor: "black",
};

const MatchList = (props) => {
  const [user, setUser, loading, setLoading, selectedUser, setSelectedUser] =
    useContext(MainContext);
  const [matchUsers, setMatchUsers] = useState([]);
  const [showCard, setShowCard] = useState(false);

  const getMatchUsers = async () => {
    const resp = await axiosPublic.get("/getMatchedUsers", {
      withCredentials: true,
    });
    setMatchUsers(resp.data);
  };

  useEffect(() => {
    setLoading(true);
    getMatchUsers();
    setTimeout(() => setLoading(false), 200);
  }, []);

  return (
    <>
      {loading ? (
        <SyncLoader loading={loading} cssOverride={override} size={15} />
      ) : (
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
                      {/* <div className="matches-search">
                    <TextField
                      label="Find User"
                      variant="filled"
                      color="success"
                      focused
                      fullWidth
                    />
                  </div> */}
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
                                <p>
                                  <PersonOutlineIcon />
                                  {userObj.username}
                                </p>
                                <p>
                                  <PetsIcon />
                                  {userObj.dogBreed}
                                </p>
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
      )}
    </>
  );
};

export default MatchList;
