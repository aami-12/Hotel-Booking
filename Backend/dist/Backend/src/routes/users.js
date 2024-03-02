"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Validators_1 = require("../validators/Validators");
const users_1 = require("../controllers/users");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.post("/register", Validators_1.RegisterValidation, users_1.Register);
router.get("/me", auth_1.default, users_1.myProfile);
exports.default = router;
