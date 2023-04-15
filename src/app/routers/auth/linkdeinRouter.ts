import express from "express";
import passport from "passport";

const router = express.Router();

// LinkedIn authentication route
router.get("/", passport.authenticate("linkedin"));

// LinkedIn callback route
router.get("/callback", passport.authenticate("linkedin"), (req, res) => {
  // Handle successful authentication and redirect the user
});

export default router;
