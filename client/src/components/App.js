// import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Signup/SignUp";
import UserProfil from "./userPofil/UserProfil";
import ChatHistory from "./ChatHistory/ChatHistory";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { MainContextProvider } from "../context/MainContext";
import Login from "./Login/Login";
import "../App.css";
import MatchesList from "./ShowMatches/MatchesList";
import MatchCard from "./ShowMatches/MatchCard"
import axios from "axios";

function App() {
  // Current User state. Get logged user from MongoDB
  const [user, setUser] = useState({});

  // Variable and State to logged out Current user and delete token
  let loginVariable = true;
  const [login, setLogin] = useState(loginVariable);
  const navigate = useNavigate();
  const handleChange = (event) => {
    loginVariable = !event.target.checked;
    setLogin(loginVariable);
    console.log(loginVariable);
    if (loginVariable) {
      navigate("/");
    }
  };
  useEffect(() => {
    const getUser = async () => {
      const resp = await axios.get("http://localhost:4000/currentUser", {
        withCredentials: true,
      });
      setUser(resp.data);
      console.log("as");
    };
    getUser();
  }, []);
  return (
    <div className="App">
      <MainContextProvider>
        <Routes>
          <Route path="/" element={<Login />} className="Login" />
          <Route
            path="/userprofil"
            element={
              <UserProfil
                handleChange={handleChange}
                login={login}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route path="/redirect" element={<Navigate to="/userprofil" />} />

          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/matcheslist"
            element={
              <MatchesList
                user={user}
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
                login={login}
                handleChange={handleChange}
              />
            }
          />
          <Route
            path="/matchcard"
            element={
              <MatchCard
                user={user}
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
