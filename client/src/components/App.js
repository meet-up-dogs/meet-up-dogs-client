// import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Signup/SignUp";
import UserProfil from "./userPofil/UserProfil";
import { Route, Routes, Navigate } from "react-router-dom";
import { MainContextProvider } from "../context/MainContext";
import Login from "./Login/Login";
import "../App.css";
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
            path="/userprofil" element={ <UserProfil
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setUser={setUser}
                user={user}
              />
            }
          />

          <Route
            path="/signup" element={  <SignUp
                inputSignUp={inputSignUp}
                setInputSignUp={setInputSignUp}
              />
            }
          />

  
        </Routes>
      </MainContextProvider>
    </div>
    
  );
}

export default App;
