"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const booking_1 = require("../controllers/booking");
const router = express_1.default.Router();
router.get('/', auth_1.default, booking_1.myBookings);
exports.default = router;
