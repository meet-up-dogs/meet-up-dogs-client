import TextField from "@mui/material/TextField";
import SignUp from "../Signup/SignUp";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link , useNavigate } from "react-router-dom";
import React from "react";

const Login = ({ setCurrentUser }) => {
  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);

  const history = useNavigate()

  const loginHandler = async (e) => {
    e.preventDefault();
    let axiosResp;
    try {
        axiosResp = await axios.post(
        "http://localhost:4000/login",
        inputLogin,
        {
          withCredentials: true,
        }
      );
      
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
    if(axiosResp.data.logging){
      history("./userprofil")
    }else {
      console.lof("logging was not successfully")
    }
    // setInput({email:"", pwd:""})
  };
  useEffect(() => {
    const getCurrentUser = async () => {
      const resp = await axios.get("http://localhost:4000/getUser", {
        withCredentials: true,
      });
      console.log(resp.data);
      setCurrentUser(resp.data);
    };
    getCurrentUser();
  }, [isLogin]);
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
