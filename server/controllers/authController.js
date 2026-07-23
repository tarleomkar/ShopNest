import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendMail.js";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword });
        if (user) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const message = `
            Welcome to ShopNest, ${name}!
            Your verification code is: ${otp}`;

            await sendEmail(email, "Welcome to ShopNest - Your OTP for registration", message);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: "Invalid user data!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                roken: generateToken(user._id),
            })
        } else {
            res.status(401).json({ message: "Invalid credentials!"})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password"); // Exclude password from the response using mongoose select method
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUsers,
};