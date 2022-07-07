// import "./App.css";
import React, { useContext, useEffect, useState } from "react";
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
import { axiosPublic } from "../util/axiosConfig";
import Chat from "./Chat/Chat";
import About from "./About/About";

function App() {
  // Variable and State to logged out Current user and delete token

  // useEffect(() => {
  //   const getUser = async () => {
  //     const resp = await axiosPublic.get("/currentUser", {
  //       withCredentials: true,
  //     });

  //     setUser(resp.data);
  //     console.log(resp.data);
  //     console.log("as");
  //   };
  //   getUser();
  //   getMatchedUsers();
  // }, []);

  // useEffect(() => {
  //   if (user.username && currentMatchedUser.username) {
  //     roomIdHandle();
  //     console.log("user: ", user.username);
  //     console.log("currentMatchedUser.username: ", currentMatchedUser.username);
  //   }
  // }, [currentMatchedUser, user]);

  //Room Id after started Chat in MatchesCard
  // const [roomId, setRoomId] = useState("");

  // function roomIdHandle() {
  //   // console.log("user.username: ", user.username);
  //   // console.log("currentMatchedUser.username: ", currentMatchedUser.username);
  //   const room = [
  //     user.username.toLocaleLowerCase(),
  //     currentMatchedUser.username.toLocaleLowerCase(),
  //   ]
  //     .sort()
  //     .join("-");
  //   setRoomId(room);
  //   return room;
  // }

  return (
    <div className="App">
      <MainContextProvider>
        <Routes>
          <Route path="/" element={<Login />} className="Login" />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userprofil" element={<UserProfil />} />

          <Route path="/about" element={<About />} />

          <Route path="/redirect" element={<Navigate to="/userprofil" />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/matcheslist" element={<MatchesList />} />
          <Route path="/chatHistory" element={<ChatHistory />} />
          {/* <Route path="/matchcard" element={<MatchCard />} /> */}
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </MainContextProvider>
    </div>
  );
}

export default App;
