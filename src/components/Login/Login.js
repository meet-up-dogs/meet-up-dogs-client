import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
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

const [alertOn, setAlertOn] =useState({
  status: false,
  error: ""
})

  const history = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    let result;
    let axiosResp;
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
      // Info: alert is bad practise here!
    // }
    try {
      const resp = await fetch("http://localhost:8080/login", {
        // const resp = await fetch("https://meet-up-dog.herokuapp.com/login", {
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
    // jetzt bug - wird immer geroutet - use insteanceof operator
    console.log(result instanceof Error)
    console.log(result.error)
    if (result.error) {
      console.log("logging was not successfully");
      setAlertOn({status: true, error: result.error})
    } else {
      history("./userprofil");
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

              {alertOn.status &&
              <Alert onClose={() => {setAlertOn({status: false})}}  severity="error" >{alertOn.error} </Alert>
              } 



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
