import TextField from "@mui/material/TextField";
import SignUp from "../Signup/SignUp";
import Button from "@mui/material/Button";
import { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";

const Login = (props) => {
  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const axiosResp = await axios.post(
        "http://localhost:4000/login",
        inputLogin
      );
      setIsLogin(true);
      console.debug("axiosResp.data:", axiosResp);
      if (!axiosResp) {
        console.debug("axiosResp.data:", axiosResp);
      } else {
        console.debug("axiosResp.data:", axiosResp);
      }
    } catch (error) {
      console.error(error);
      alert("Could not log in. Console for more Information");
      // Info: alert is bad practise here!
    }
    // setInput({email:"", pwd:""})
  };

  return (
    <>
      <form
        action="/login"
        method="post"
        onSubmit={(e) => {
          loginHandler(e);
        }}
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
      </form>
      <p>
        Are you not Already a memeber <Link to="/signup">SignUp</Link>{" "}
      </p>
    </>
  );
};

export default Login;
