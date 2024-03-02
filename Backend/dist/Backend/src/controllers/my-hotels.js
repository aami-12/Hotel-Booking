"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHotelById = exports.viewHotelById = exports.viewHotels = exports.myHotels = exports.upload = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const hotel_1 = __importDefault(require("../models/hotel"));
const multer_1 = __importDefault(require("multer"));
const logger_1 = require("../middlewares/logger");
function uploadImages(imageFiles) {
    return __awaiter(this, void 0, void 0, function* () {
        const uploadPromises = imageFiles.map((image) => __awaiter(this, void 0, void 0, function* () {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = yield cloudinary_1.default.v2.uploader.upload(dataURI);
            return res.url;
        }));
        const imageUrls = yield Promise.all(uploadPromises);
        return imageUrls;
    });
}
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});
const myHotels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageFiles = req.files;
        const newHotel = req.body;
        const imageUrls = yield uploadImages(imageFiles);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;
        const hotel = new hotel_1.default(newHotel);
        yield hotel.save();
        res.status(201).send(hotel);
    }
    catch (e) {
        (0, logger_1.logEvents)(`${req.method}\t${req.url}\t${req.headers.origin}`, 'myHotels.log');
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.myHotels = myHotels;
const viewHotels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotels = yield hotel_1.default.find({ userId: req.userId });
        res.status(200).send(hotels);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.viewHotels = viewHotels;
const viewHotelById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id.toString();
    try {
        const hotel = yield hotel_1.default.findOne({
            _id: id,
            userId: req.userId,
        });
        res.json(hotel);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching hotels" });
    }
});
exports.viewHotelById = viewHotelById;
const updateHotelById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedHotel = req.body;
        updatedHotel.lastUpdated = new Date();
        const hotel = yield hotel_1.default.findOneAndUpdate({
            _id: req.params.hotelId,
            userId: req.userId,
        }, updatedHotel, { new: true });
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        const files = req.files;
        const updatedImageUrls = yield uploadImages(files);
        hotel.imageUrls = [
            ...updatedImageUrls,
            ...(updatedHotel.imageUrls || []),
        ];
        yield hotel.save();
        res.status(201).json(hotel);
    }
    catch (error) {
        res.status(500).json({ message: "Something went throw" });
    }
});
exports.updateHotelById = updateHotelById;
