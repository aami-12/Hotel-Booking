"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotels_1 = require("../controllers/hotels");
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.get("/", hotels_1.fetchHomeHotels);
router.get("/search", hotels_1.fetchHotels);
router.get("/:id", [(0, express_validator_1.param)("id").notEmpty().withMessage("Hotel ID is required")], hotels_1.fetchHotelById);
router.post("/:hotelId/bookings/payment-intent", auth_1.default, hotels_1.StripePayment);
router.post("/:hotelId/bookings", auth_1.default, hotels_1.SaveBookingDetails);
exports.default = router;
