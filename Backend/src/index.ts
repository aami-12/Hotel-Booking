import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./config/ConnectDb";
import cors from "cors";
import { logEvents, logger } from "./middlewares/logger";
import errorHandler from "./middlewares/errorHandler";
import corsOptions from "./config/corsOption";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import rootFile from "./routes/root";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myHotelRoutes from "./routes/my-hotels";
import HotelRoutes from "./routes/hotels";
import BookingRoutes from "./routes/my-bookings";
import path from "path";

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB();
app.use(logger);
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", rootFile);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", HotelRoutes);
app.use("/api/my-bookings", BookingRoutes);

app.all("*", (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
