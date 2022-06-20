import React from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import axios from "axios"
// eslint-disable-next-line no-unused-vars
import signUp from "../styles/signUp.css"

const SignUp = () => {



    const [input, setInput] = useState({username: "", email: "", password: "" });


    const inputHandler = (e) => {
        setInput({
            ...input, [e.target.value]: e.target.value
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const axiosResp = axios.post("/signup", input)
            if (axiosResp.data.error) {
                console.debug("axiosResp.data:", axiosResp.data.error)
            } else {
                console.debug("axiosResp.data:", axiosResp.data)
            }

        } catch (error) {
            console.log("Error while sending with axios", error)
        }
    }
    const margin = { m: 1 }

    return (
        <>
            <from action="/signup" method="post" id="signUpForm" onSubmit={(e) => { submitHandler(e) }}>
                <h2> Sign Up </h2>
                <TextField
                    name="username" label="Username" variant="standard" value={input.username}  sx={margin}
                    onChange={(e) => { inputHandler(e) }}
                />
                <TextField
                    name="email" label="E-Mail" variant="standard" value={input.email} sx={margin} 
                    
                    onChange={(e) => { inputHandler(e) }}
                />
                <TextField
                    name="password" label="Password" variant="standard" value={input.password}  sx={margin}
                    onChange={(e) => { inputHandler(e) }}
                />
                <Button type="submit" variant="contained" >
                    Sign Up
                </Button>

            </from>

        </>
    )
}


export default SignUp;