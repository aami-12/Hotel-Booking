"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Validators_1 = require("../validators/Validators");
const auth_1 = require("../controllers/auth");
const auth_2 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.post("/login", Validators_1.LoginValidation, auth_1.Login);
router.get("/validate-token", auth_2.default, auth_1.ValidateToken);
router.post("/logout", auth_1.UserLogout);
exports.default = router;
