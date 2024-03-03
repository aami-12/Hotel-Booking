import express from "express";
import User from "../models/user";
import { LoginValidation } from "../validators/Validators";
import { Login, UserLogout, ValidateToken } from "../controllers/auth";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.post("/login", LoginValidation, Login);
router.get("/validate-token",() => {console.log("hello")}, verifyToken, ValidateToken);  
router.post("/logout", UserLogout);  

export default router