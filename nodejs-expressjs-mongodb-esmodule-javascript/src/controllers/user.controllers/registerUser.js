import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { User } from "../../models/user.model.js";

// *** User Registration ***
export const registerUser = asyncHandler(async (req, res) => {
    // Extract user information from request body
    const { name, mobileNumber, email, password, gender } = req.body;

    // ==> Can use this if you are not using express-validator for validations : Start !!!
    // // Validate that all fields are provided
    // if (
    //     [name, mobileNumber, email, password].some(
    //         (field) => !field || field?.trim() === ""
    //     )
    // ) {
    //     throw new ApiError(400, "All fields are required!");
    // }
    // // Validate email format (example using regular expressions)
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //     throw new ApiError(400, "Invalid email format!");
    // }
    // ==> Can use this if you are not using express-validator for validations : End !!!

    // Check for existing user with various identifiers
    const existedUser = await User.findOne({
        $or: [{ email: email }, { mobileNumber: mobileNumber }],
    });
    if (existedUser) {
        throw new ApiError(409, "User with mobile number or email already exist!");
    }

    // Create a new user
    const createdUser = await User.create({
        name,
        mobileNumber,
        email: email.toLowerCase(), // Convert email to lowercase for case-insensitive matching
        password,
        gender: gender || undefined,
    });

    // Remove the password field from the user object before sending response
    createdUser.password = undefined;

    // Return a successful response with the created user information
    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                { user: createdUser },
                "User is registed successfully"
            )
        );
});
