"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myBookingValidation = exports.LoginValidation = exports.RegisterValidation = void 0;
const express_validator_1 = require("express-validator");
const RegisterValidation = [
    (0, express_validator_1.check)("firstName", "First Name is required").isString(),
    (0, express_validator_1.check)("lastName", "Last Name is required").isString(),
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password with 6 or more characters required").isLength({
        min: 6,
    }),
];
exports.RegisterValidation = RegisterValidation;
const LoginValidation = [
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password with 6 or more characters required").isLength({
        min: 6,
    }),
];
exports.LoginValidation = LoginValidation;
const myBookingValidation = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("city").notEmpty().withMessage("City is required"),
    (0, express_validator_1.body)("country").notEmpty().withMessage("Country is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.body)("type").notEmpty().withMessage("Hotel type is required"),
    (0, express_validator_1.body)("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Price per night is required and must be a number"),
    (0, express_validator_1.body)("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilities are required"),
];
exports.myBookingValidation = myBookingValidation;
