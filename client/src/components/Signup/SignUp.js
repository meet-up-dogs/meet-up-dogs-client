import React from "react";
import { MainContext } from "../../context/MainContext";
import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import "./signup.css";

const SignUp = (props) => {
  // const [input, setInput] = useContext(MainContext)
  const [inputSignUp, setInputSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });

  // const inputHandler = (e) => {
  //     console.log(e)
  //     setInputSignUp({
  //         ...inputSignUp,[e.target.value]: e.targe.value
  //     })
  //     console.log(inputSignUp)
  // }

  const signUpHandler = async (e) => {
    console.log(inputSignUp);
    e.preventDefault();

    try {
      const axiosResp = await axios.post(
        "http://localhost:4000/signup",
        inputSignUp
      );
      console.log("axiosResp.data:", inputSignUp);
      if (!axiosResp) {
        console.debug("axiosResp.data:", axiosResp);
      } else {
        console.debug("axiosResp.data:", axiosResp);
      }
    } catch (error) {
      console.log("Error while sending with axios", error);
    }
  };
  const margin = { m: 1 };

  return (
    <>
      <form
        action="/signup"
        method="post"
        id="signUpForm"
        onSubmit={(e) => {
          signUpHandler(e);
        }}
      >
        <h2> Sign Up </h2>
        <TextField
          name="username"
          label="Username"
          variant="standard"
          sx={margin}
          value={inputSignUp.username}
          onChange={(e) =>
            setInputSignUp({ ...inputSignUp, username: e.target.value })
          }
        />
        <TextField
          name="email"
          label="E-Mail"
          variant="standard"
          value={inputSignUp.email}
          sx={margin}
          onChange={(e) =>
            setInputSignUp({ ...inputSignUp, email: e.target.value })
          }
        />
        <TextField
          name="password"
          label="Password"
          variant="standard"
          value={inputSignUp.password}
          sx={margin}
          onChange={(e) =>
            setInputSignUp({ ...inputSignUp, password: e.target.value })
          }
        />
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default SignUp;
