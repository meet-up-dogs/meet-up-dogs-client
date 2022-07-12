import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import { TextField } from "@material-ui/core";
import Select from "@mui/material/Select";
import { axiosPublic } from "../../util/axiosConfig";
import Map from "../Map/Map";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Compress from "react-image-file-resizer";
import Toolbar from "@mui/material/Toolbar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { MainContext } from "../../context/MainContext";
import "./userProfil.css";

export default function UserProfil(props) {
  const [bottomLeft, setBottomLeft] = useState({});
  const [topRight, setTopRight] = useState({});
  const [resizedImage, setResizedImage] = useState("");
  const [user, setUser, loading, setLoading] = useContext(MainContext);

  useEffect(() => {
    setUserProfil({
      ...userProfil,
      username: user.username,
      location: {
        topRight: topRight,
        bottomLeft: bottomLeft,
      },
    });
  }, [bottomLeft, topRight]);
  const [userProfil, setUserProfil] = useState({});

  useEffect(() => {
    setUserProfil({
      username: user?.username,
      gender: user?.gender,
      language: user?.language,
      dogBreed: user?.dogBreed,
      userImage: user?.userImage,
      availability: {
        dayTime: user?.availability?.dayTime,
        weekDay: user?.availability?.weekDay,
      },
      description: user?.description,
      location: {
        bottomLeft: user?.location?.bottomLeft,
        topRight: user?.location?.topRight,
      },
      favorite: [],
    });
  }, [user]);

  const userProfilHandler = async (e) => {
    e.preventDefault();

    try {
      const axiosResp = await axiosPublic.post("/userprofil", userProfil, {
        withCredentials: true,
      });
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
    setUserProfil({
      ...userProfil,
      userImage: resizedImage,
    });
  }, [resizedImage]);

  const onFileResize = async (e) => {
    const file = e.target.files[0];

    await Compress.imageFileResizer(
      file, // the file from input
      300, // width
      300, // height
      "JPEG", // compress format WEBP, JPEG, PNG
      80, // quality
      0, // rotation
      (uri) => {
        // console.log(uri);
        // You upload logic goes here
        setResizedImage(uri);
      },
      "base64" // blob or base64 default base64
    );
  };

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      try {
        const resp = await axiosPublic.get("/currentUser", {
          withCredentials: true,
        });
        setUser(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    setLoading(false);
    getUser();
  }, []);

  return (
    <>
      {loading ? (
        <h3> Loading... </h3>
      ) : (
        <>
          <Header />
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
                aria-label="demo-radio-buttons-group-label"
                defaultValue={user.gender}
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
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>

            <FormControl>
              <InputLabel id="demo-simple-select-autowidth-label">
                Languages
              </InputLabel>
              <Select
                labelId="Languages"
                id="demo-simple-select-autowidth"
                defaultValue={user.language}
                onChange={(e) => {
                  setUserProfil({
                    ...userProfil,
                    // username: user.username,
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

            <FormControl>
              <InputLabel id="demo-simple-select-autowidth-label">
                Dog Breed
              </InputLabel>
              <Select
                labelId="DogBreed"
                id="demo-simple-select-autowidth"
                defaultValue={user.dogBreed}
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

            <FormControl>
              <InputLabel id="weekDay">Week Day</InputLabel>
              <Select
                labelId="weekDay"
                id="weekDay"
                defaultValue={user?.availability?.weekDay}
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

            <FormControl>
              <InputLabel id="timeDay">Time Of Day</InputLabel>
              <Select
                labelId="timeDay"
                id="demo-simple-select-autowidth"
                defaultValue={user?.availability?.dayTime}
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
                <MenuItem value={"noon"}>noon</MenuItem>
                <MenuItem value={"in the evening"}>in the evening</MenuItem>
                <MenuItem value={"morning"}>morning</MenuItem>
                <MenuItem value={"evening"}>evening</MenuItem>
              </Select>
            </FormControl>
            {/* <input type="file" accept="image/*"  /> */}
            <Button variant="contained" component="label">
              Select image with your dog
              <input type="file" onChange={onFileResize} hidden />
            </Button>

            <TextField
              className="text-field"
              variant="outlined"
              placeholder="Tell us about your Dog and yourself"
              multiline
              defaultValue={user.description}
              rows="6"
              rowsMax="6"
              onChange={(e) => {
                setUserProfil({ ...userProfil, description: e.target.value });
              }}
            />

            <Map
              onChange={() => {
                setUserProfil({
                  ...userProfil,
                  location: {
                    bottomLeft: [bottomLeft.lat, bottomLeft.lng],
                    topRight: [topRight.lat, topRight.lng],
                  },
                });
              }}
              setBottomLeft={setBottomLeft}
              setTopRight={setTopRight}
            />
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
            <Button type="submit" variant="contained">
              Save Profil
            </Button>
          </form>
          <Footer />
        </>
      )}
    </>
  );
}
