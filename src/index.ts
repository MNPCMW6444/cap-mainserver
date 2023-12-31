import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./app/routers/authRouter";
import apiRouter from "./app/routers/apiRouter";
import websiteRouter from "./app/routers/websiteRouter";
import passport from "passport";
import "./app/util/auth/passport";

dotenv.config();

const app = express();
const port = process.env.PORT || 6555;
app.use(cookieParser());

app.use(passport.initialize());

let mainDbStatus = false;

const connectToDBs = () => {
  try {
    mongoose.connect("" + process.env.SAFE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    mainDbStatus = true;
  } catch (e) {
    console.error(e);
    mainDbStatus = false;
  }
  if (!mainDbStatus) setTimeout(connectToDBs, 180000);
  else console.log("connected to safe-mongo");
};

connectToDBs();

app.use(express.json());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? ["http://localhost:5999"]
        : [
            "https://caphub.ai",
            "https://www.caphub-group.com",
            "https://caphub-group.com",
            "https://caphub-oc.netlify.com",
          ],
    credentials: true,
  })
);

app.listen(port, () => console.log(`Server started on port: ${port}`));

app.get("/areyoualive", (_, res) => {
  res.json({ answer: "yes" });
});

app.use("/api", apiRouter);
app.use("/website", websiteRouter);
app.use("/auth", authRouter);
