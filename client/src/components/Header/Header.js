import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import "./header.css";

export default function Header(props) {
  return (
    <>
      <div className="header">
        <Box sx={{ flexGrow: 1 }}>
          <FormGroup></FormGroup>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              ></IconButton>
              <img
                src={props.user.userImage}
                alt=""
                style={{ width: "50px", height: "50px" }}
              />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {`Hello ${props.userName}`}
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={props.login}
                    onChange={props.handleChange}
                    aria-label="login switch"
                  />
                }
                label={props.login ? "Logout" : "Login"}
              />
              {props.login && (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    //   onClick={handleMenu}
                    color="inherit"
                  ></IconButton>
                  <Menu
                    id="menu-appbar"
                    //   anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    //   open={Boolean(anchorEl)}
                  >
                    <MenuItem>Profile</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </Box>
        <Box
          name="username"
          label="Username"
          variant="standard"
          sx={props.margin}
          // value={props.inputSignUp.username}
          // onChange={(e) =>
          //   props.setInputSignUp({
          //     ...props.inputSignUp,
          //     username: e.target.value,
          //   })
          // }
        />
      </div>
    </>
  );
}
