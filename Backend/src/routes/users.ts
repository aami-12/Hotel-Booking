import express, { Request, Response } from "express";
import { RegisterValidation } from "../validators/Validators";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { Register, myProfile } from "../controllers/users";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.post("/register", RegisterValidation, Register); 
router.get("/me", verifyToken, myProfile); 

export default router;
