import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FormControl from "@mui/material/FormControl"
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio'
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
// import { DatePicker, DateRange } from "@material-ui/lab"
import Select from '@mui/material/Select';
import axios from "axios"
import Map from "../Map/Map"
// import {useToggle} from "../hooks/useToggle"

export default function UserProfil(props) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [isEdit , setIsEdit] = useToggle(false)
  // const [value, setValue] = useState < DateRange < Date >> ([null, null])
  
  const [value, setValue] = React.useState(null);

  const [userProfil, setUserProfil] = useState({
    username: "",
    gender: "",
    language: "",
    dogBreed: "",
    photoDog: "",
    availability: {
      dayTime:"",
      weekDay:""
    }
  })

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userProfilHandler = async (e) => {
    console.log(userProfil);
    e.preventDefault();

    try {
      const axiosResp = await axios.post(
        "http://localhost:4000/userprofil",
        userProfil
      );
      console.log("axiosResp.data:",userProfil);
      if (!axiosResp) {
        console.debug("axiosResp.data:", axiosResp);
      } else {
        console.debug("axiosResp.data:", axiosResp);
      }
    } catch (error) {
      console.log("Error while sending with axios", error);
    }
  };



  // const putUserName = async () => {
  //   const res = await axios.put("http://localhost:4000",{
  //     id: props.inputSignUp.ObjectId,
  //     username: props.inputSignUp.username
  //   })
  // }


  const margin = { m: 1 }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={auth}
                onChange={handleChange}
                aria-label="login switch"
              />
            }
            label={auth ? 'Logout' : 'Login'}
          />
        </FormGroup>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {`Hello ${props.inputSignUp.username}`}
            </Typography>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        name="username" label="Username" variant="standard" sx={margin}
        value={props.inputSignUp.username}
        onChange={(e) => props.setInputSignUp({ ...props.inputSignUp, username: e.target.value })}
      />
      <Box component="span">{`${props.inputSignUp.username}`}</Box>
      
      <form  
      action="/userprofil"
      method="post"
      id="userprofilForm"
      onSubmit={(e) => {
        userProfilHandler(e);
      }}
      >
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 1 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Languages</InputLabel>
        <Select
          labelId="Languages"
          id="demo-simple-select-autowidth"
          value={userProfil.language}
          onChange={(e) => { setUserProfil({ ...userProfil, language: e.target.value })}}
          autoWidth
          label="Langueges"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"En"}>English</MenuItem>
          <MenuItem value={"Ge"}>German</MenuItem>
          <MenuItem value={"Tr"}>Turkey</MenuItem>
        </Select>
      </FormControl>




      <FormControl sx={{ m: 1, minWidth: 1 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Dog Breed</InputLabel>
        <Select
          labelId="DogBreed"
          id="demo-simple-select-autowidth"
          value={userProfil.dogBreed}
          onChange={(e) =>{ setUserProfil({ ...userProfil, dogBreed: e.target.value })}}
          autoWidth
          label="Dog Breed"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Akita"}>Akita</MenuItem>
          <MenuItem value={"Chinook"}>Chinook</MenuItem>
          <MenuItem value={"Drever"}>Drever</MenuItem>
        </Select>
      </FormControl>
    

      <FormControl sx={{ m: 1, minWidth: 1 }}>
        <InputLabel id="weekDay">Week Day</InputLabel>
        <Select
          labelId="weekDay"
          id="weekDay"
          value={userProfil.availability.weekDay}
          onChange={(e) => { setUserProfil(
            { ...userProfil, 
            availability: {weekDay : e.target.value} 
          }
          )}}
          autoWidth
          label="Time Slot"
        >
          
          <MenuItem value={"Monday"}>Monday</MenuItem>
          <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
          <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
          <MenuItem value={"Thursday"}>Thursday</MenuItem>
          <MenuItem value={"Friday"}>Friday</MenuItem>
          <MenuItem value={"Saturday"}>Saturday</MenuItem>
          <MenuItem value={"Sunday"}>Sunday</MenuItem>
        </Select>
      </FormControl>
      

       <FormControl sx={{ m: 1, minWidth: 1 }}>
        <InputLabel id="timeDay">Time Of Day</InputLabel>
        <Select
          labelId="timeDay"
          id="demo-simple-select-autowidth"
          value={userProfil.availability.dayTime}
          onChange={(e) => { setUserProfil(
            { ...userProfil,
            availability: { dayTime : e.target.value} 
          }
          )}}
          autoWidth
          label="Time Slot"
        >
          
          <MenuItem value={"Morgens"}>Morgens</MenuItem>
          <MenuItem value={"Mittags"}>Mittags</MenuItem>
          <MenuItem value={"Abends"}>Abends</MenuItem>
          
        </Select>
      </FormControl> 

      {/* <Map/> */}
      <Outlet />

      <Button sx={margin} type="submit" variant="contained">
          Save
        </Button>
                </form>
    </>
  );
}
