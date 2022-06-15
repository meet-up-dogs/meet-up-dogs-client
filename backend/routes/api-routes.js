import express from "express";
import isAuth from "../middleware/is-auth.js"


const router = express.Router();


router.post("/json", (req, res) => {
    res.json({success: true, data: {email: req.body.email, password: req.body.pwd}})
})


router("/getSecretMsg", isAuth,(req, res) => {
    res.json({success: true, secretMessage: `${req.username}, die Antwort auf die große Frage.... `})
})


export default router;