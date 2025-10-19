// routes/auth.js
import express from "express";
import { registerUser } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerUser);

export default router;

// controllers/authController.js
import prisma from "../lib/prisma.js";
import { sendOTP } from "../utils/otp.js";

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, phone, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await sendOTP(phone, otpCode);

    const user = await prisma.user.create({
      data: { fullName, email, phone, password, role, otpCode },
    });

    res.status(201).json({ message: "User registered, verify OTP", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
