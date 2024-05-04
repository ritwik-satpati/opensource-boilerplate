import { body, oneOf } from "express-validator";

// *** Validation for - User Registration ***
export const registerUserValidation = () => [
    body("name", "Name is required").notEmpty(),
    body("mobileNumber", "Mobile Number is required").isMobilePhone(),
    body("email", "Email is required").isEmail(),
    body("password", "Password is required").notEmpty(),
];

// *** Validation for - User Login ***
export const loginUserValidation = () => [
    oneOf([body("mobileNumber").isMobilePhone(), body("email").isEmail()], {
        message: "Email or Mobile number is required",
    }),
    body("password", "Password is required").notEmpty(),
];
