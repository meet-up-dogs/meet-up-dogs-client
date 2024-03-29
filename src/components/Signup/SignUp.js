import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { axiosPublic } from "../../util/axiosConfig";
import HeaderLogoPaw from "../Header/HeaderLogoPaw";
import "../Header/HeaderLogoPaw.css";
import "@fontsource/shrikhand";
import "./signup.css";
import Alert from "@mui/material/Alert";
// eslint-disable-next-line no-unused-vars

const SignUp = () => {
  const [inputSignUp, setInputSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const signUpHandler = async (e) => {
    // console.log(inputSignUp);
    e.preventDefault();
    let axiosResp;
    try {
      axiosResp = await axiosPublic.post("/signup", inputSignUp, {
        withCredentials: true,
      });

      console.log("==========>:", axiosResp);
      if (!axiosResp) {
        console.debug("axiosResp.data:", axiosResp);
      } else {
        console.debug("axiosResp.data:", axiosResp);
      }
    } catch (error) {
      setIsError(error.response.data.errors[0].msg);
      console.log(
        "Error while sending with axios",
        error.response.data?.errors
      );
    }

    if (axiosResp.data.success) {
      console.log("axios Resp status text", axiosResp.data.success);
      // setIsSuccess(axiosResp.data.success);
      setIsSuccess(true);
      setTimeout(() => navigate("/"), 500);
    } else {
      console.log("sign up was not successfully");
    }
  };

  const margin = { m: 0 };

  return (
    <>
      <div className="body-signup">
        <HeaderLogoPaw />

        <div className="background">
          <div className="signupForm">
            <form
              action="/login"
              method="post"
              onSubmit={(e) => {
                signUpHandler(e);
              }}
            >
              <h2 style={{ color: "#2B2B2B", fontFamily: "Shrikhand" }}>
                Sign Up
              </h2>
              {isError ? <Alert severity="error">{isError}</Alert> : null}
              {isSuccess ? (
                <Alert severity="success">signup was successful</Alert>
              ) : null}
              <TextField
                name="username"
                label="Username"
                variant="filled"
                required
                sx={margin}
                value={inputSignUp.username}
                onChange={(e) =>
                  setInputSignUp({
                    ...inputSignUp,
                    username: e.target.value.toLocaleLowerCase(),
                  })
                }
              />
              <TextField
                name="email"
                label="E-Mail"
                variant="filled"
                required
                value={inputSignUp.email}
                sx={margin}
                onChange={(e) =>
                  setInputSignUp({
                    ...inputSignUp,
                    email: e.target.value.toLocaleLowerCase(),
                  })
                }
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                variant="filled"
                required
                value={inputSignUp.password}
                sx={margin}
                onChange={(e) =>
                  setInputSignUp({ ...inputSignUp, password: e.target.value })
                }
              />
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: "#2b2b2b",
                  fontFamily: "system-ui",
                  fontWeight: "bold",
                  color: "#fff",
                  textTransform: "lowercase",
                  marginTop: "1rem",
                  padding: "0.5rem",
                }}
              >
                Sign Up
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
