import "./App.css";
import React, { useRef, useEffect, useState } from "react";
// import Map from "./components/Map/Map";
import SignUp from "./components/SignUp";
import Login from "./components/Login"
import { Route, Routes } from "react-router-dom"
import { MainContextProvider } from "./context/MainContext.js";


function App() {
  // const [lng, setLng] = useState(13.408971);
  // const [lat, setLat] = useState(52.520417);
  // const [isMapVisible, setIsMapVisible] = useState(false);

  // console.log(lng, lat);

  // socket.connect

  return (
    <MainContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

        </Routes>

        {/* {isMapVisible ? <Map setLng={setLng} setLat={setLat} /> : null}
      <p>
        lng:{lng} lat:{lat}
        <button
          onClick={() => {
            setIsMapVisible(true);
          }}
        >
          open Map
        </button>
      </p> */}
      </div>
    </MainContextProvider>
  );
}

export default App;
