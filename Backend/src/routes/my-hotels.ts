import express, { Request, Response } from "express";
import multer from "multer";
import {
  myHotels,
  updateHotelById,
  upload,
  viewHotelById,
  viewHotels,
} from "../controllers/my-hotels";
import verifyToken from "../middlewares/auth";
import { myBookingValidation } from "../validators/Validators";
const router = express.Router();

router.post(
  "/",
  verifyToken,
  myBookingValidation,
  upload.array("imageFiles", 6),
  myHotels
);
router.get("/", verifyToken, viewHotels);
router.get("/:id", verifyToken, viewHotelById);
router.put("/:hotelId", verifyToken, upload.array("imageFiles"), updateHotelById);

export default router;
