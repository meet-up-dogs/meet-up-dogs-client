import React, { useEffect, CSSProperties } from "react";
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
import { MainContext } from "../../context/MainContext";
import "./userProfil.css";
import SyncLoader from "react-spinners/SyncLoader";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const override = {
  display: "flex",
  justifyContent: "center",
  alignItem: "center",
  margin: "20rem auto",
  borderColor: "black",
};



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function UserProfil(props) {
  const [bottomLeft, setBottomLeft] = useState({});
  const [topRight, setTopRight] = useState({});
  const [resizedImage, setResizedImage] = useState("");
  const [user, setUser, loading, setLoading] = useContext(MainContext);
  let [color, setColor] = useState("#000");

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
      setTimeout(() => {
        setLoading(false);
      }, 50);
      // setLoading(false);
    };

    getUser();
  }, []);

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
    favorite: [],
  });

  useEffect(() => {
    setUserProfil({
      ...userProfil,
      username: user.username,
      location: {
        bottomLeft: [bottomLeft.lat, bottomLeft.lng],
        topRight: [topRight.lat, topRight.lng],
      },
    });

    console.log("location change");
  }, [bottomLeft, topRight]);

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
    console.log("use user change");
  }, [user, loading]);

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
  const [uploadText, setUploadText] = useState("Select image with your dog");

  const handleUpload = (e) => {
    // if (e.target.file !== undefined) {
    setUploadText(e.target.files[0].name);
    // } else {
    // setUploadText("Select image with your dog");
    // } // console.log("e.target.files[0]: ", e.target.files[0]);
  };

  return (
    <>
      {loading ? (
        <SyncLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={15}
        />
      ) : (
        <>
        <ThemeProvider theme={darkTheme}>
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
              <FormLabel id="demo-radio-buttons-group-label" style={{color: "darkgreen"}}>Gender</FormLabel>
              <RadioGroup
                className="gender"
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
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <FormControlLabel
                  className="gender-item"
                  value="female"
                  control={<Radio style={{color: "darkgreen"}}/>}
                  label="Female"
                />
                <FormControlLabel
                  className="gender-item"
                  value="male"
                  control={<Radio style={{color: "darkgreen"}}/>}
                  label="Male"
                />
                <FormControlLabel
                  className="gender-item"
                  value="other"
                  control={<Radio style={{color: "darkgreen"}}/>}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>

            <FormControl  className="lg">
              <InputLabel id="demo-simple-select-autowidth-label"  style={{color: "darkgreen" }}>
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
                className="lg"
              >
              
                <MenuItem value={"En"} >English</MenuItem>
                <MenuItem value={"Ge"}>German</MenuItem>
                <MenuItem value={"Tr"}>Turkey</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="demo-simple-select-autowidth-label" style={{color: "darkgreen" }}>
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
  
                <MenuItem value={"Akita"}>Akita</MenuItem>
                <MenuItem value={"Chinook"}>Chinook</MenuItem>
                <MenuItem value={"Drever"}>Drever</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id="weekDay" style={{color: "darkgreen" }}>Week Day</InputLabel>
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
              <InputLabel id="timeDay" style={{color: "darkgreen" }}>Time Of Day</InputLabel>
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
                <MenuItem value={"noon"}>Noon</MenuItem>
                <MenuItem value={"in the evening"}>in the Evening</MenuItem>
                <MenuItem value={"morning"}>Morning</MenuItem>
                <MenuItem value={"evening"}>Evening</MenuItem>
              </Select>
            </FormControl>
            {/* <input type="file" accept="image/*"  /> */}
            <Button
              variant="contained"
              component="label"
              onChange={handleUpload}
              style={{
                backgroundColor: "darkgreen",
              }}
            >
              {uploadText}
              <input type="file" onChange={onFileResize} hidden />
            </Button>
            {/* <input accept="image/*" type="file" /> */}

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

            <Map setBottomLeft={setBottomLeft} setTopRight={setTopRight} />

            <Outlet />
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: "darkgreen",
              }}
            >
              Save Profil
            </Button>
          </form>
          <Footer />
          </ThemeProvider>
        </>
      )}
    </>
  );
}
