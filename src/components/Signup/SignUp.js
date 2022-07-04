import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { axiosPublic } from "../../util/axiosConfig";
import HeaderLogoPaw from '../Header/HeaderLogoPaw';
import '../Header/HeaderLogoPaw.css'
import "@fontsource/shrikhand";
import "./signup.css";

// eslint-disable-next-line no-unused-vars

const SignUp = () => {
  const [inputSignUp, setInputSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    console.log(inputSignUp);
    e.preventDefault();
    let axiosResp;
    try {
      axiosResp = await axiosPublic.post("/signup", inputSignUp, {
        withCredentials: true,
      });
      console.log("axiosResp.data:", inputSignUp);
      if (!axiosResp) {
        console.debug("axiosResp.data:", axiosResp);
      } else {
        console.debug("axiosResp.data:", axiosResp);
      }
    } catch (error) {
      console.log("Error while sending with axios", error);
    }
    if (axiosResp.data) {
      navigate("/");
    } else {
      console.log("sign up was not successfully");
    }
  };
  const margin = { m: 0 };

  return (
    <>
    <div className="body-signup">
      <HeaderLogoPaw />
      <form
        action="/signup"
        method="post"
        id="signUpForm"
        onSubmit={(e) => {
          signUpHandler(e);
        }}
      >
        <h2 style={{ color: '#2B2B2B', fontFamily: "Shrikhand" }}> Sign Up </h2>
        <TextField
          name="username"
          label="Username"
          variant="filled"
          sx={margin}
          value={inputSignUp.username}
          onChange={(e) =>
            setInputSignUp({ ...inputSignUp, username: e.target.value })
          }
        />
        <TextField
          name="email"
          label="E-Mail"
          variant="filled"
          value={inputSignUp.email}
          sx={margin}
          onChange={(e) =>
            setInputSignUp({ ...inputSignUp, email: e.target.value })
          }
        />
        <TextField
          name="password"
          label="Password"
          variant="filled"
          value={inputSignUp.password}
          sx={margin}
          onChange={(e) =>
            setInputSignUp({ ...inputSignUp, password: e.target.value })
          }
        />
        <Button type="submit" variant="contained" style={{
          color: '#f7f9ef',
          fontFamily: "Shrikhand",
          backgroundColor: '#2B2B2B',
          marginTop: "1rem",
          padding: "0.5rem"
        }}>
          Sign Up
        </Button>
      </form>
      </div>
    </>
  );
};

export default SignUp;
