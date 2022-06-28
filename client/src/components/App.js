// import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Signup/SignUp";
import UserProfil from "./userPofil/UserProfil";
import ChatHistory from "./ChatHistory/ChatHistory";
import { Route, Routes, Navigate } from "react-router-dom";
import { MainContextProvider } from "../context/MainContext";
import Login from "./Login/Login";
import axios from "axios";
import "../App.css";

function App() {
  // const [lng, setLng] = useState(13.408971);
  // const [lat, setLat] = useState(52.520417);
  // const [isMapVisible, setIsMapVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [user, setUser] = useState({});

  // console.log(lng, lat);

  // socket.connect
  console.log(currentUser.username);
  const [inputSignUp, setInputSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });

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
