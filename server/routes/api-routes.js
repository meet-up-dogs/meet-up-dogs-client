import express from "express";
import isAuth from "../middleware/is-auth.js";

const router = express.Router();

router.post("/json", (req, res) => {
  res.json({
    success: true,
    data: { email: req.body.email, password: req.body.pwd },
  });
});

router.get("/getUser", isAuth, (req, res) => {
  //   res.json({
  //     success: true,
  //     secretMessage: `${req.userName}, die Antwort auf die große Frage.... `,
  //   });
  console.log(req.userName);
  res.send({ logging: true, username: req.userName, userId: req.userId });
});

export default router;
