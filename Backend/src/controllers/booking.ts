import { Request, Response } from "express";
import Hotel from "../models/hotel";
import { HotelType } from "../sharedTypes/types";

const myBookings = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });
    console.log(hotels, "jj");

    const results = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };

      return hotelWithUserBookings;
    });

    res.status(201).send(results);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

export { myBookings };
