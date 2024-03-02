"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const my_hotels_1 = require("../controllers/my-hotels");
const auth_1 = __importDefault(require("../middlewares/auth"));
const Validators_1 = require("../validators/Validators");
const router = express_1.default.Router();
router.post("/", auth_1.default, Validators_1.myBookingValidation, my_hotels_1.upload.array("imageFiles", 6), my_hotels_1.myHotels);
router.get("/", auth_1.default, my_hotels_1.viewHotels);
router.get("/:id", auth_1.default, my_hotels_1.viewHotelById);
router.put("/:hotelId", auth_1.default, my_hotels_1.upload.array("imageFiles"), my_hotels_1.updateHotelById);
exports.default = router;
