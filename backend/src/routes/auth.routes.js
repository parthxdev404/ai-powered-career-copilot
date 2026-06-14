import express from "express";
import {
  register,
  login,
  getUser,
  logOut,
} from "../controllers/auth.controller.js";
import passport from "passport";
import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema , loginSchema } from "../validators/authValidator.js";
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

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema),login);
router.post("/logout", protect, logOut);
router.get("/user", protect , getUser);

export default router;