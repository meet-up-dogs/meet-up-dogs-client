import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "./login.css";
import HeaderLogoPaw from '../Header/HeaderLogoPaw'
import { axiosPublic } from "../../util/axiosConfig";
import "@fontsource/shrikhand";


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
    <div className="body-login">
      < HeaderLogoPaw />

      <div className="background">

        <div className="loginForm">
          <form
            action="/login"
            method="post"
            onSubmit={(e) => {
              loginHandler(e);
            }}

          >
            <h2 style={{ color: '#2B2B2B', fontFamily: "Shrikhand" }}>Login</h2>
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
              style={{ color: '#f7f9ef', fontFamily: "Shrikhand" }}
              value={inputLogin.password}
              onChange={(e) =>
                setInputLogin({ ...inputLogin, password: e.target.value })
              }
            />
            <br />
            <Button type="submit" variant="contained" style={{
              color: '#f7f9ef',
              fontFamily: "Shrikhand",
              backgroundColor: '#2B2B2B',
              marginTop: "1rem",
              padding: "0.5rem"
            }} >
              Log In
            </Button>
            <p style={{ color: '#2b2b2b', fontFamily: "Shrikhand" }}>
              you are not a member yet? <Link to="/signup"
                style={{ fontFamily: "Shrikhand" }}
              >SignUp
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
