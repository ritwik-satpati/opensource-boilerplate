import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { cookieOptions } from "../../constants/cookieOptions.js";

// *** User Logout ***
export const logoutUser = asyncHandler(async (req, res) => {
    // Clear the user access token cookie
    res.clearCookie("userAccessToken", cookieOptions);

    // Return a successful response indicating logout
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});
