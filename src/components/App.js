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
import MatchCard from "./ShowMatches/MatchCard";
import { axiosPublic } from "../util/axiosConfig";
import Chat from "./Chat/Chat";

function App() {
  // Current User state. Get logged user from MongoDB
  const [user, setUser] = useState({});
  const [matchUsers, setMatchUsers] = useState([]);
  const [currentMatchedUser, setCurrentMatchedUser] = useState({});

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
      const resp = await axiosPublic.get("/currentUser", {
        withCredentials: true,
      });

      setUser(resp.data);
      console.log(resp.data);
      console.log("as");
    };
    getUser();
    getMatchedUsers();
  }, []);


  const getMatchedUsers = async () => {
    const resp = await axiosPublic.get("/getMatchedUsers", {
      withCredentials: true,
    });
    await setMatchUsers(resp.data);
    console.log("matchUser", resp.data);
  };

  useEffect(() => {
    if (user.username && currentMatchedUser.username) {
      roomIdHandle();
      console.log("user: ", user.username);
      console.log("currentMatchedUser.username: ", currentMatchedUser.username);
    }
  }, [currentMatchedUser, user]);

  //Room Id after started Chat in MatchesCard
  const [roomId, setRoomId] = useState("");

  function roomIdHandle() {
    // console.log("user.username: ", user.username);
    // console.log("currentMatchedUser.username: ", currentMatchedUser.username);
    const room = [
      user.username.toLocaleLowerCase(),
      currentMatchedUser.username.toLocaleLowerCase(),
    ]
      .sort()
      .join("-");
    setRoomId(room);
    return room;
  }
 
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
                matchUsers={matchUsers}
                setMatchUsers={setMatchUsers}
                setCurrentMatchedUser={setCurrentMatchedUser}
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
                currentUser={currentMatchedUser}
                setCurrentMatchedUser={setCurrentMatchedUser}
                setUser={setUser}
                matchUsers={matchUsers}
                setMatchUsers={setMatchUsers}
                
              />
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chat" element={<Chat roomId={roomId} />} />
        </Routes>
      </MainContextProvider>
    </div>
  );
}

export default App;
