import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "./login.css";
import HeaderLogoPaw from "../Header/HeaderLogoPaw";

import background from "../images/happydog.jpg";
import logo from "../images/pawfree.png";

import { axiosPublic } from "../../util/axiosConfig";
import "@fontsource/shrikhand";
console.log("Hallo");
const Login = () => {
  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    let result;
    // try {
    //   axiosResp = await axiosPublic.post("/login", inputLogin, {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     mode: "cors",
    //     credentials: "include",
    //     withCredentials: true,
    //   });
    //   console.debug("axiosResp.data:suc", axiosResp);
    //   if (!axiosResp) {
    //     console.debug("axiosResp.data:suc", axiosResp.data.response);
    //   } else {
    //     console.debug("axiosResp.data:else", axiosResp);
    //   }
    // } catch (error) {
    //   console.error(error);
    //   alert("Could not log in. Console for more Information");
    //   // Info: alert is bad practise here!
    // }
    const heroku = "https://meet-up-dogs.herokuapp.com/login";
    try {
      const resp = await fetch("http://localhost:8080/login", {
        method: "POST",

        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputLogin),
      });

      result = await resp.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    // antwort als kommentar vom Server
    if (result) {
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
      <div className="body-login">
        <HeaderLogoPaw />

        <div className="background">
          <div className="loginForm">
            <form
              action="/login"
              method="post"
              onSubmit={(e) => {
                loginHandler(e);
              }}
            >
              <h2 style={{ color: "#2B2B2B", fontFamily: "Shrikhand" }}>
                Login
              </h2>
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
                style={{ color: "#f7f9ef", fontFamily: "Shrikhand" }}
                value={inputLogin.password}
                onChange={(e) =>
                  setInputLogin({ ...inputLogin, password: e.target.value })
                }
              />
              <br />
              <Button
                type="submit"
                variant="contained"
                style={{
                  color: "#f7f9ef",
                  fontFamily: "Shrikhand",
                  backgroundColor: "#2B2B2B",
                  marginTop: "1rem",
                  padding: "0.5rem",
                }}
              >
                Log In
              </Button>
              <p style={{ color: "#2b2b2b", fontFamily: "Shrikhand" }}>
                you are not a member yet?{" "}
                <Link to="/signup" style={{ fontFamily: "Shrikhand" }}>
                  SignUp
                </Link>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
