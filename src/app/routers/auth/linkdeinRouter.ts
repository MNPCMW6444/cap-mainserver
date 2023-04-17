import express from "express";
import passport from "passport";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.use(
  createProxyMiddleware({
    target: "https://www.linkedin.com",
    changeOrigin: true,
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers["Access-Control-Allow-Origin"] = "http://localhost:5999";
    },
  })
);

router.get("/", passport.authenticate("linkedin"));

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
