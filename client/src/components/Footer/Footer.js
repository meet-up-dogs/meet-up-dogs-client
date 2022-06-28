import React from "react";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import Chat from '../Chat/Chat'
import UserProfil from '../userPofil/UserProfil.js'

import "./footer.css"


export const Footer = () => {






  return (
    <>
      <BottomNavigation className="footer"
      showLabels
      // value={value}
      // onChange={(event, newValue) => {
      //   setValue(newValue);
      // }} 
      >
        <BottomNavigationAction label="Match" icon={<TravelExploreIcon />} />
        <BottomNavigationAction label="Chat" icon={<ChatBubbleOutlineIcon />} element={<Chat />} />
        <BottomNavigationAction label="Profil" icon={<PersonIcon />} element={<UserProfil />} />
      </BottomNavigation>

      {/* <NavLink to="/welcome">Match</NavLink> |{' '} */}
			<NavLink className="navlink" to="/chathistory"   ></NavLink>
			<NavLink to="/userprofil">Profil</NavLink>

      <Routes>
        <Route path="/chathistory" element={<Chat />} />
        <Route path="/userprofil" element={<UserProfil />} />
      </Routes>
    </>
  );
};

export default Footer;