// import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Signup/SignUp";
import UserProfil from "./userPofil/UserProfil";
import ChatHistory from "./ChatHistory/ChatHistory";
import { Route, Routes, Navigate } from "react-router-dom";
import { MainContextProvider } from "../context/MainContext";
import Login from "./Login/Login";
import "../App.css";
import MatchesList from "./ShowMatches/MatchesList";
import MatchCard from "./ShowMatches/MatchCard";
import axios from "axios";

function App() {
  // const [lng, setLng] = useState(13.408971);
  // const [lat, setLat] = useState(52.520417);
  // const [isMapVisible, setIsMapVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // console.log(lng, lat);

  // socket.connect
  const [inputSignUp, setInputSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Matching Algorithm

  const getMatchedUsers = async () => {
    const resp = await axios.get("http://localhost:4000/getMatchedUsers", {
      withCredentials: true,
    });
    console.log(resp.data);
  };

  return (
    <div className="App">
      <button onClick={getMatchedUsers}>Match</button>
      <MainContextProvider>
        <Routes>
          <Route path="/" element={<Login />} className="Login" />
          <Route
            path="/userprofil"
            element={
              <UserProfil
                // inputSignUp={inputSignUp}
                // setInputSignUp={setInputSignUp}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route path="/redirect" element={<Navigate to="/userprofil" />} />

          <Route
            path="/signup"
            element={
              <SignUp
                inputSignUp={inputSignUp}
                setInputSignUp={setInputSignUp}
              />
            }
          />
          <Route path="/matcheslist" element={<MatchesList />} />
          <Route path="/chatHistory" element={<ChatHistory />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </MainContextProvider>
    </div>
    //   {/* {isMapVisible ? <Map setLng={setLng} setLat={setLat} /> : null}
    // <MainContextProvider>
    //   <div className="App">
    //     <Routes>
    //       <Route path="/" element={<Login />} />
    //       <Route path="/signup" element={<SignUp />} />

    //     </Routes>

    //     {/* {isMapVisible ? <Map setLng={setLng} setLat={setLat} /> : null}
    //   <p>
    //     lng:{lng} lat:{lat}
    //     <button
    //       onClick={() => {
    //         setIsMapVisible(true);
    //       }}
    //     >
    //       open Map
    //     </button>
    //   </p> */}
    //   {/* </div>
    // </MainContextProvider> */}
  );
}

export default App;
