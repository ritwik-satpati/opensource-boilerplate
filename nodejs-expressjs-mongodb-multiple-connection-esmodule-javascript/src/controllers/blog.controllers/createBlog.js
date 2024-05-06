import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Blog } from "../../models/blog.model.js";

// *** Create Blog ***
export const createBlog = asyncHandler(async (req, res) => {
    // Retrieve user data from the request object
    const { user } = req;

    // Extract all the details from the request body
    const { name, content, isPublic } = req.body;

    // ==> Validation for req.body items if you are not using express-validator for validations : Start !!!
    // ==> Validation for req.body items if you are not using express-validator for validations : End !!!

    // Create a new blog
    const createdBlog = await Blog.create({
        ownBy: user._id,
        name,
        content,
        isPublic,
    });

    // Throwing a sample error
    if (!createdBlog) {
        throw new ApiError(
            500,
            "Something went wrong during creating the blog, try again after sometime!"
        );
    }

    // Set a success response with created blog information
    return res.status(200).json(
        new ApiResponse(
            200,
            {
                blog: createdBlog,
            },
            "Blog is created successfully"
        )
    );
});
