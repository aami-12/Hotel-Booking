import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

// @desc Login
// @route POST /api/auth/login
// @access Public
const Login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    res.status(200).json({ userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const ValidateToken = (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
};

const UserLogout = (req: Request, res: Response) => {
  const cookies = req.cookies
  if (!cookies?.auth_token) return res.sendStatus(204) //No content
  res.clearCookie('auth_token', { httpOnly: true,secure: true })
  res.json({ message: 'Cookie cleared' })
};

export { Login, ValidateToken, UserLogout };
