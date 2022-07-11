import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import PawFree from "../images/pawfree.png";
import "@fontsource/shrikhand";
import "./header.css";
import { MainContext } from "../../context/MainContext";

export default function Header() {
  const [user, setUser, loading] = useContext(MainContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (e) => {
    console.log("handleMenu", e);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="header">
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: "#2B2B2B" }}>
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <NavLink to="/about"> About us</NavLink>
                  </MenuItem>

                  <MenuItem onClick={handleClose}>Imprint</MenuItem>
                  <MenuItem onClick={handleClose}>Contact us</MenuItem>
                </Menu>

                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1 }}
                  style={{ fontFamily: "Shrikhand" }}
                >
                  {`Hello ${user.username}`}
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={login}
                      onChange={handleChange}
                      aria-label="login switch"
                    />
                  }
                  label={login ? "Logout" : "Login"}
                />
                {user.userImage ? (
                  <img
                    className="user-image"
                    src={user.userImage}
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                    // sx={{ borderRadius: '50%' }}
                  />
                ) : (
                  false
                )}
              </Toolbar>
            </AppBar>
          </Box>
          <Box name="username" label="Username" variant="standard" />
        </div>
      )}
    </>
  );
}
