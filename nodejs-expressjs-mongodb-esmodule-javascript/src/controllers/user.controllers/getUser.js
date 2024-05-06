import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

// *** User Information ***
export const getUser = asyncHandler(async (req, res) => {
    // Retrieve user data from the request object
    const { user } = req;

    // Return a successful response with user information
    return res
        .status(200)
        .json(new ApiResponse(200, { user }, "User is fetched successfully"));
});
