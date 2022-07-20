import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { axiosPublic } from "../../util/axiosConfig";
import Button from "@mui/material/Button";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MessageIcon from "@mui/icons-material/Message";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import "@fontsource/shrikhand";
import "./header.css";
import { MainContext } from "../../context/MainContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    color: "white",
  },
});

export default function Header({ conversation }) {
  const [
    user,
    setUser,
    loading,
    setLoading,
    selectedUser,
    setSelectedUser,
    notifications,
    setNotifications,
  ] = useContext(MainContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (e) => {
    console.log("handleMenu", e);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //notification
  const [anchorNotification, setAnchorNotification] = React.useState(null);
  const open = Boolean(anchorNotification);
  const handleClickNotification = (event) => {
    setAnchorNotification(event.currentTarget);
  };
  const handleCloseNotification = () => {
    setAnchorNotification(null);
    setNotifications([]);
    clearNotifications();
  };
  const handleCloseNotificationNavi = () => {
    setAnchorNotification(null);
    setNotifications([]);
    clearNotifications();

    navigate("/chatHistory");
  };
  //^notification
  const clearNotifications = async () => {
    const resp = await axiosPublic.post("/clearNotifications", {
      username: user.username,
    });
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
      <ThemeProvider theme={darkTheme}>
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

                    <MenuItem onClick={handleClose}>
                      <NavLink to="/imprint"> Imprint</NavLink>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                      <NavLink to="/contact">Contact Us</NavLink>
                    </MenuItem>
                  </Menu>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                    style={{ fontFamily: "Shrikhand" }}
                  >
                    {user.username}
                  </Typography>

                  <div>
                    <Button
                      style={{
                        color: "#fff",
                      }}
                      className="notification"
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClickNotification}
                    >
                      <NotificationsNoneIcon />
                      <span className="noti">
                        {notifications?.length > 0
                          ? notifications?.length
                          : null}
                      </span>
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorNotification}
                      open={open}
                      onClose={handleCloseNotification}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {notifications?.map((notification) => (
                        <p
                          className="notification-item"
                          onClick={handleCloseNotificationNavi}
                        >
                          <span className="noti-active"></span> New
                          <MailOutlineIcon /> from {notification}
                        </p>
                      ))}
                    </Menu>
                  </div>
                  <FormControlLabel
                    control={
                      <Switch
                        style={{
                          color: "#9CDE4E",
                        }}
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
      </ThemeProvider>
    </>
  );
}
