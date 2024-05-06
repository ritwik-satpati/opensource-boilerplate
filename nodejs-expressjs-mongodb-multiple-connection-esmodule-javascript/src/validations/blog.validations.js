import { body, oneOf } from "express-validator";

// *** Validation for - Create Blog ***
export const createBlogValidation = () => [
    body("name", "Blog name is required").notEmpty(),
    body("content", "Blog contain is required").notEmpty(),
    // body("isPublic", "isPublic is required").notEmpty().isBoolean().withMessage("isPublic Must be Boolean Value"),
];

// *** Validation for - Update Blog ***
export const updateBlogValidation = () => [
    body("blogId", "Blog Id is required").notEmpty(),
    body("name", "Blog name is required").notEmpty(),
    body("content", "Blog contain is required").notEmpty(),
    body("isPublic", "isPublic is required").notEmpty().isBoolean().withMessage("isPublic Must be Boolean Value"),
];
