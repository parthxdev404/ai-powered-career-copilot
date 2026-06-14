import express from "express";
import {
  register,
  login,
  getUser,
  logOut,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema , loginSchema } from "../validators/authValidator.js";
import { googleLogin } from "../controllers/googleAuth.controller.js";
const router = express.Router();

router.post('/google' , googleLogin)
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema),login);
router.post("/logout", protect, logOut);
router.get("/user", protect , getUser);

export default router;