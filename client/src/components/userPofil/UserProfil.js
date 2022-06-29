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
import Select from "@mui/material/Select";
import axios from "axios";
import Map from "../Map/Map";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Compress from "react-image-file-resizer";

import "./userProfil.css";

export default function UserProfil(props) {
  const [bottomLeft, setBottomLeft] = useState({});
  const [topRight, setTopRight] = useState({});
  const [resizedImage, setResizedImage] = useState("");
  const [userProfil, setUserProfil] = useState({
    username: "",
    gender: "",
    language: "",
    dogBreed: "",
    userImage: "",
    availability: {
      dayTime: "",
      weekDay: "",
    },
    description: "",
    location: {
      bottomLeft: [],
      topRight: [],
    },
  });

  const userProfilHandler = async (e) => {
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
    const getUser = async () => {
      const resp = await axios.get("http://localhost:4000/currentUser", {
        withCredentials: true,
      });
      props.setUser(resp.data);
      if (resp.data.gender) {
        setUserProfil(resp.data);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    setUserProfil({
      ...userProfil,
      userImage: resizedImage,
    });
  }, [resizedImage]);

  const margin = { m: 1 };
  const onFileResize = async (e) => {
    const file = e.target.files[0];

    await Compress.imageFileResizer(
      file, // the file from input
      300, // width
      300, // height
      "JPEG", // compress format WEBP, JPEG, PNG
      60, // quality
      0, // rotation
      (uri) => {
        // console.log(uri);
        // You upload logic goes here
        setResizedImage(uri);
      },
      "base64" // blob or base64 default base64
    );
  };

  return (
    <>
      <Header
        login={props.login}
        handleChange={props.handleChange}
        margin={margin}
        user={props.user}
      />
      <form
        action="/userprofil"
        method="post"
        id="userprofilForm"
        onSubmit={(e) => {
          userProfilHandler(e);
        }}
        className="userProfilForm"
      >
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={userProfil.gender}
            defaultValue={userProfil.gender}
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
            defaultValue={userProfil.language}
            onChange={(e) => {
              setUserProfil({
                ...userProfil,
                username: props.user.username,
                language: e.target.value,
              });
            }}
            autoWidth
            label="Languages"
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
        <input type="file" accept="image/*" onChange={onFileResize} />

        <textarea
          id="w3review"
          name="w3review"
          rows="4"
          cols="50"
          value={userProfil.description}
          onChange={(e) => {
            setUserProfil({ ...userProfil, description: e.target.value });
          }}
          style={{ margin: "10px 10px" }}
          placeholder="Tell us about your Dog and yourself"
        >
          Tell me about your Dog and yourself
        </textarea>

        <Map setBottomLeft={setBottomLeft} setTopRight={setTopRight} />
        <Button
          onClick={() => {
            setUserProfil({
              ...userProfil,
              location: {
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

      <Footer />
    </>
  );
}
