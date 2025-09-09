import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import exp from "constants";
import authrouter from './Routes/auth.routers.js'
import urlrouter from "./Routes/url.routers.js";
const app = express();

//middleWare
app.use(cors());
app.use(express.json());

//DataBase Connection and Server Starting

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database Connected");

    app.listen(3000, () => {
      console.log("Server is Running at 3000");
    });
  })
  .catch((e) => {
    console.log("Error in Connecting to Database");
  });

//router for Auth
app.use("/api/auth",authrouter);
//router for URL Generate
app.use("/api/urlshortner",urlrouter)
//app.use("/api/url");
