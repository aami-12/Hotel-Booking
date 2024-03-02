"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const ConnectDb_1 = __importDefault(require("./config/ConnectDb"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = require("./middlewares/logger");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const corsOption_1 = __importDefault(require("./config/corsOption"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cloudinary_1 = require("cloudinary");
const root_1 = __importDefault(require("./routes/root"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const my_hotels_1 = __importDefault(require("./routes/my-hotels"));
const hotels_1 = __importDefault(require("./routes/hotels"));
const my_bookings_1 = __importDefault(require("./routes/my-bookings"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
(0, ConnectDb_1.default)();
app.use(logger_1.logger);
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOption_1.default));
app.use("/", express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/", root_1.default);
app.use("/api/users", users_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/my-hotels", my_hotels_1.default);
app.use("/api/hotels", hotels_1.default);
app.use("/api/my-bookings", my_bookings_1.default);
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path_1.default.join(__dirname, "views", "404.html"));
    }
    else if (req.accepts("json")) {
        res.json({ message: "404 Not Found" });
    }
    else {
        res.type("txt").send("404 Not Found");
    }
});
app.use(errorHandler_1.default);
mongoose_1.default.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});
mongoose_1.default.connection.on("error", (err) => {
    console.log(err);
    (0, logger_1.logEvents)(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log");
});
