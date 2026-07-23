import express from "express";
const router = express.Router();
import {
    registerUser,
    loginUser,   
    getUsers,
} from "../controllers/authController.js";
import { admin } from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUsers); // Calling middleware functions here

export default router;