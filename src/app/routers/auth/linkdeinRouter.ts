import express from "express";
import passport from "passport";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { createProxyMiddleware } from "http-proxy-middleware";
import { UserType } from "src/app/models/userModel";
import dontenv from "dotenv";

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

dontenv.config();

router.get(
  `/callback${
    process.env.NODE_ENV === "development"
      ? process.env.LINKEDIN_CLIENT_SECRET
      : ""
  }`,
  passport.authenticate("linkedin", { session: false }),
  (req, res) => {
    try {
      const user = req.user;
      const token = jwt.sign(
        {
          id: (user as UserType)._id,
        } as JwtPayload,
        process.env.JWT_SECRET as Secret
      );
      res
        .cookie("jwt", token, {
          httpOnly: true,
          sameSite:
            process.env.NODE_ENV === "development"
              ? "lax"
              : process.env.NODE_ENV === "production" && "none",
          secure:
            process.env.NODE_ENV === "development"
              ? false
              : process.env.NODE_ENV === "production" && true,
        })
        .redirect("http://localhost:5999?auth=linkedin");
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ serverError: "Unexpected error occurred in the server" });
    }
  }
);

export default router;
