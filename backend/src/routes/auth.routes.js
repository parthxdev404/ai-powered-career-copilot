import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),

  (req, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  },
);

router.post("/register", register);
router.post("/login", login);

export default router;
