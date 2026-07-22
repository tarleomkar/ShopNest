import express from "express";
const router = express.Router();
import {
    registerUser,
    // loginUser,
    // getUser
} from "../controllers/authController.js";

router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/user", getUser);

export default router;