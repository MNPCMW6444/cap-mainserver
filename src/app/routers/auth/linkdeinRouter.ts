import express from "express";
import passport from "passport";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router();

router.use(
  "/oauth",
  createProxyMiddleware({
    target: "https://www.linkedin.com",
    changeOrigin: true,
    followRedirects: true, // Add this line to follow redirects
    pathRewrite: {
      "^/oauth": "/oauth",
    },
    onProxyReq: (proxyReq, req, res) => {
      // Set CORS headers on the proxy request
      proxyReq.setHeader(
        "Access-Control-Allow-Origin",
        "http://localhost:5999"
      );
      proxyReq.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      proxyReq.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers["Access-Control-Allow-Origin"] = "http://localhost:5999";
      proxyRes.headers["Access-Control-Allow-Methods"] =
        "GET, POST, PUT, DELETE, OPTIONS";
      proxyRes.headers["Access-Control-Allow-Headers"] =
        "Origin, X-Requested-With, Content-Type, Accept";
    },
  })
);

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    process.env.NODE_ENV === "development"
      ? "http://localhost:5999"
      : "https://app.caphub-funding.com"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    return res.status(200).json({});
  }

  next();
});

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
