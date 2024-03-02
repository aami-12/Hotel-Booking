import express from "express";
import {
    SaveBookingDetails,
  StripePayment,
  fetchHomeHotels,
  fetchHotelById,
  fetchHotels,
} from "../controllers/hotels";
import { param } from "express-validator";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.get("/", fetchHomeHotels);
router.get("/search", fetchHotels);
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  fetchHotelById
);
router.post("/:hotelId/bookings/payment-intent", verifyToken, StripePayment);

router.post("/:hotelId/bookings", verifyToken, SaveBookingDetails);

export default router;
