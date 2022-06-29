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
  let loginVariable = true;
  const [login, setLogin] = useState(loginVariable);
  const [currentUser, setCurrentUser] = useState({});
  const [user, setUser] = useState({});
  const [inputSignUp, setInputSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    loginVariable = event.target.checked;
    setLogin(loginVariable);
  };

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
          <Route
            path="/matcheslist"
            element={
              <MatchesList
                user={user}
                setUser={setUser}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                login={login}
                handleChange={handleChange}
              />
            }
          />
          <Route
            path="/chatHistory"
            element={
              <ChatHistory
                user={user}
                setUser={setUser}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                login={login}
                handleChange={handleChange}
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
