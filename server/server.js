import express from "express";
import "dotenv/config"
import cors from "cors"
import connectToMongoose from "./util/connect-to-mongoose.js";
import apiroutes from "./routes/api-routes.js"
import authRoutes from "./routes/auth-routes.js"
import cookieParser from "cookie-parser";

const port = process.env.PORT || 3000;
const app = express()
app.use(express.json())
app.use(cookieParser())

app.get("/", (req,res) => {
    res.send('Hi World')
})

app.use(apiroutes)
app.use(authRoutes)


if(await connectToMongoose()) {
    app.listen(port, err => {
      if(err) console.error(err);
      console.log(`listening to Port ${port}`)
    })
  }