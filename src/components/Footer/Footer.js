import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { NavLink } from "react-router-dom";

import "./footer.css";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    backgroundColor: "#8e8e8e",
  },
});

export const Footer = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <footer className="footer">
      <BottomNavigation
        className={classes.root}
        showLabels
        value={value}
        onChange={(event, newValue) => handleChange(event, newValue)}
      >
        <BottomNavigationAction
          component={NavLink}
          label="Match"
          to="/matcheslist"
          icon={<TravelExploreIcon />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/chathistory"
          label="Chat"
          icon={<ChatBubbleOutlineIcon />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/userprofil"
          label="Profil"
          icon={<PersonIcon />}
        />
      </BottomNavigation>
      </footer>
    </>
  );
};

export default Footer;
