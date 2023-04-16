import express from "express";
import passport from "passport";
import jwt, { JwtPayload } from "jsonwebtoken";

const router = express.Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get(
  "/",
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5999");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  },
  passport.authenticate("linkedin")
);

router.get(
  "/callback",
  passport.authenticate("linkedin", { session: false }),
  (req, res) => {
    const user = req.user;
    console.log(user);
    const token = jwt.sign(
      {
        id: user,
      } as JwtPayload,
      "your_jwt_secret"
    );
    res.cookie("jwt", token, { httpOnly: true, secure: true });
    res.redirect("/"); // Modify this line to redirect to your desired endpoint
  }
);

export default router;
