import express from "express";
const router = express.Router();

import { register, login, updateUser } from "../controllers/authControllers.js";
import auth from "../middleware/auth.js";

import { rateLimit } from "express-rate-limit";
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 17,
  message:
    "Too many requests from this IP address, please try again after 15 minutes",
});

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/updateUser").patch(auth, updateUser);

export default router;
