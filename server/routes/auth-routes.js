import express from "express";
import { postLogin,  postSignUp } from "../controllers/auth-controller.js";
import { loginSchema } from "../schema/login-schema.js";
import { signUpSchema } from "../schema/signUp-schema.js";



const router = express.Router()


router.post("/signup", postSignUp , signUpSchema)
router.post("/login", postLogin , loginSchema)
router.post("/refreshToken")
router.post("/logout")


export default router;