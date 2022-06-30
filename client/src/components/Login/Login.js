import TextField from "@mui/material/TextField";
import SignUp from "../Signup/SignUp";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "./login.css";
import { axiosPublic } from "../../util/axiosConfig";

const Login = () => {
  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    let axiosResp;
    try {
      axiosResp = await axiosPublic.post("/login", inputLogin, {
        withCredentials: true,
      });
      console.debug("axiosResp.data:", axiosResp);
      if (!axiosResp) {
        console.debug("axiosResp.data:", axiosResp.data.response);
      } else {
        console.debug("axiosResp.data:", axiosResp);
      }
    } catch (error) {
      console.error(error);
      alert("Could not log in. Console for more Information");
      // Info: alert is bad practise here!
    }
    // antwort als kommentar vom Server
    if (axiosResp.data.logging) {
      history("./userprofil");
    } else {
      console.lof("logging was not successfully");
    }
    // setInput({email:"", pwd:""})
  };

  useEffect(() => {
    const logOut = async () => {
      const resp = await axiosPublic.post(
        "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(resp.data.msg);
    };
    logOut();
  }, []);

  return (
    <>
      <form
        action="/login"
        method="post"
        onSubmit={(e) => {
          loginHandler(e);
        }}
        className="loginForm"
      >
        <h2>Login</h2>
        <TextField
          name="email"
          label="E-Mail"
          variant="filled"
          value={inputLogin.email}
          onChange={(e) =>
            setInputLogin({ ...inputLogin, email: e.target.value })
          }
        />
        <br /> <br />
        <TextField
          name="password"
          label="Password"
          variant="filled"
          value={inputLogin.password}
          onChange={(e) =>
            setInputLogin({ ...inputLogin, password: e.target.value })
          }
        />
        <br />
        <Button type="submit" variant="contained">
          Log In
        </Button>
        <p>
          Are you not Already a memeber <Link to="/signup">SignUp</Link>{" "}
        </p>
      </form>
    </>
  );
};

export default Login;
