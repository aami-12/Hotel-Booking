import { body, check } from "express-validator";

const RegisterValidation = [
  check("firstName", "First Name is required").isString(),
  check("lastName", "Last Name is required").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
];

const LoginValidation = [
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
];

const myBookingValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("type").notEmpty().withMessage("Hotel type is required"),
  body("pricePerNight")
    .notEmpty()
    .isNumeric()
    .withMessage("Price per night is required and must be a number"),
  body("facilities")
    .notEmpty()
    .isArray()
    .withMessage("Facilities are required"),
];

export { RegisterValidation, LoginValidation, myBookingValidation };
