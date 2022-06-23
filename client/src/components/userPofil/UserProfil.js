import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
// import { DatePicker, DateRange } from "@material-ui/lab"
import Select from "@mui/material/Select";
import axios from "axios";
import Map from "../Map/Map";
import Header from "../Header/Header";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

// import {useToggle} from "../hooks/useToggle"

export default function UserProfil(props) {
  let loginVariable = true;
  const [login, setLogin] = useState(loginVariable);
  // const [anchorEl, setAnchorEl] = React.useState(null);

  const [bottomLeft, setBottomLeft] = useState({});
  const [topRight, setTopRight] = useState({});
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
      dayTime: "",
      weekDay: "",
    },
    quader: {
      bottomLeft: [],
      topRight: [],
    },
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    loginVariable = event.target.checked;
    setLogin(loginVariable);
    if (!loginVariable) {
      console.log("navigate");
      navigate("/");
    }
  };

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const userProfilHandler = async (e) => {
    console.log(userProfil);
    e.preventDefault();

    try {
      const axiosResp = await axios.post(
        "http://localhost:4000/userprofil",
        userProfil
      );
      console.log("axiosResp.data:", userProfil);
      if (!axiosResp) {
        console.debug("axiosResp.data:", axiosResp);
      } else {
        console.debug("axiosResp.data:", axiosResp);
      }
    } catch (error) {
      console.log("Error while sending with axios", error);
    }
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const resp = await axios.get("http://localhost:4000/getUser", {
        withCredentials: true,
      });
      console.log(resp.data);
      props.setCurrentUser(resp.data);
    };
    getCurrentUser();
  }, []);
  //
  // const putUserName = async () => {
  //   const res = await axios.put("http://localhost:4000",{
  //     id: props.inputSignUp.ObjectId,
  //     username: props.inputSignUp.username
  //   })
  // }

  const margin = { m: 1 };
  console.log("bottomLeft", bottomLeft);

  return (
    <>
      <Header
        login={login}
        handleChange={handleChange}
        margin={margin}
        userName={props.currentUser.username}
      />
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
            defaultValue=""
            name="radio-buttons-group"
            onChange={(e) =>
              setUserProfil({
                ...userProfil,
                gender: e.target.value,
              })
            }
            required
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 1 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Languages
          </InputLabel>
          <Select
            labelId="Languages"
            id="demo-simple-select-autowidth"
            value={userProfil.language}
            onChange={(e) => {
              setUserProfil({ ...userProfil, language: e.target.value });
            }}
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
          <InputLabel id="demo-simple-select-autowidth-label">
            Dog Breed
          </InputLabel>
          <Select
            labelId="DogBreed"
            id="demo-simple-select-autowidth"
            value={userProfil.dogBreed}
            onChange={(e) => {
              setUserProfil({ ...userProfil, dogBreed: e.target.value });
            }}
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
            onChange={(e) => {
              setUserProfil({
                ...userProfil,
                availability: { weekDay: e.target.value },
              });
            }}
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
            onChange={(e) => {
              setUserProfil({
                ...userProfil,
                availability: {
                  ...userProfil.availability,
                  dayTime: e.target.value,
                },
              });
            }}
            autoWidth
            label="Time Slot"
          >
            <MenuItem value={"Morgens"}>Morgens</MenuItem>
            <MenuItem value={"Mittags"}>Mittags</MenuItem>
            <MenuItem value={"Abends"}>Abends</MenuItem>
          </Select>
        </FormControl>

        <Map setBottomLeft={setBottomLeft} setTopRight={setTopRight} />
        <Button
          onClick={() => {
            setUserProfil({
              ...userProfil,
              quader: {
                bottomLeft: [bottomLeft.lat, bottomLeft.lng],
                topRight: [topRight.lat, topRight.lng],
              },
            });
          }}
        >
          Save quader
        </Button>

        <Outlet />
        <Button sx={margin} type="submit" variant="contained">
          Save
        </Button>
      </form>
    </>
  );
}
