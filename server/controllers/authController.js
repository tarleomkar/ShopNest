import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendMail.js";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOtpEmail = async (email, name, otp) => {
    const message = `
Welcome to ShopNest, ${name}!
Your verification code is: ${otp}

This code will expire in 1 minute.`;

    await sendEmail(email, "Welcome to ShopNest - Your OTP for registration", message);
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    try {
        if (!name || !normalizedEmail || !password) {
            return res.status(400).json({ message: "Please provide name, email, and password." });
        }

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser && existingUser.verified) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const otp = generateOtp();
        const otpHash = await bcrypt.hash(otp, 10);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (existingUser) {
            existingUser.name = name;
            existingUser.password = hashedPassword;
            existingUser.otp = otpHash;
            existingUser.otpExpiresAt = Date.now() + 60_000;
            existingUser.verified = false;
            await existingUser.save();
            await sendOtpEmail(normalizedEmail, name, otp);

            return res.status(200).json({
                message: "Verification code resent. Please verify your account.",
                email: normalizedEmail,
            });
        }

        const user = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword,
            otp: otpHash,
            otpExpiresAt: Date.now() + 60_000,
        });

        await sendOtpEmail(normalizedEmail, user.name, otp);

        return res.status(201).json({
            message: "Account created. Please verify your email with the OTP sent to your inbox.",
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    try {
        if (!normalizedEmail || !otp) {
            return res.status(400).json({ message: "Email and OTP are required." });
        }

        const user = await User.findOne({ email: normalizedEmail }).select("+otp +otpExpiresAt");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (user.verified) {
            return res.status(400).json({ message: "Account is already verified." });
        }

        if (!user.otp || !user.otpExpiresAt) {
            return res.status(400).json({ message: "No verification code found. Please request a new one." });
        }

        if (Date.now() > user.otpExpiresAt) {
            user.otp = undefined;
            user.otpExpiresAt = null;
            await user.save();
            return res.status(410).json({ message: "OTP expired. Please request a new OTP." });
        }

        const isValidOtp = await bcrypt.compare(otp, user.otp);
        if (!isValidOtp) {
            return res.status(401).json({ message: "Invalid OTP." });
        }

        user.verified = true;
        user.otp = undefined;
        user.otpExpiresAt = null;
        await user.save();

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
            message: "Email verified successfully.",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const resendOtp = async (req, res) => {
    const { email } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    try {
        if (!normalizedEmail) {
            return res.status(400).json({ message: "Email is required." });
        }

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (user.verified) {
            return res.status(400).json({ message: "Account is already verified." });
        }

        const otp = generateOtp();
        const otpHash = await bcrypt.hash(otp, 10);
        user.otp = otpHash;
        user.otpExpiresAt = Date.now() + 60_000;
        await user.save();

        await sendOtpEmail(normalizedEmail, user.name, otp);

        return res.status(200).json({ message: "A new verification code has been sent." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    try {
        const user = await User.findOne({ email: normalizedEmail });
        if (user && (await bcrypt.compare(password, user.password))) {
            if (!user.verified) {
                return res.status(403).json({ message: "Please verify your email before logging in." });
            }

            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        }

        return res.status(401).json({ message: "Invalid credentials!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { registerUser, verifyOtp, resendOtp, loginUser, getUsers };