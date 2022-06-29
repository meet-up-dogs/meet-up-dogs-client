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
  const [currentUser, setCurrentUser] = useState({});
  const [user, setUser] = useState({});

  // socket.connect
  const [inputSignUp, setInputSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Matching Algorithm

  return (
    <div className="App">
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
                setUser={setUser}
                user={user}
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
          <Route path="/matcheslist" element={<MatchesList user={user} />} />
          <Route
            path="/chatHistory"
            element={
              <ChatHistory
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </MainContextProvider>
    </div>
  );
}

export default App;
