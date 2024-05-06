import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Blog } from "../../models/blog.model.js";

// *** Get Blog ***
export const getBlog = asyncHandler(async (req, res) => {
    // Retrieve user data from the request object
    const { user } = req;

    // Extract all the details from the request body
    const { blogId } = req.body;

    // ==> Validation for req.body items if you are not using express-validator for validations : Start !!!
    // ==> Validation for req.body items if you are not using express-validator for validations : End !!!

    // Find the blog with its Id
    if (blogId) {
        const fetchedBlog = await Blog.findById(blogId);
        // If blog is not found
        if (!fetchedBlog) {
            throw new ApiError(404, "Blog Id is invalid!");
        }
        // Checking is blog is ownBy the user using userId
        if (fetchedBlog.ownBy.toString() !== user._id.toString()) {
            throw new ApiError(401, "Provided blog is not belongs to you!");
        }

        // Set a success response with fetched blog information
        return res.status(201).json(
            new ApiResponse(
                201,
                {
                    blog: fetchedBlog,
                },
                "Blog is fetched successfully"
            )
        );
    } else {
        // Find the blog with its Id
        const fetchedBlogs = await Blog.find({ ownBy: user._id });
        // If blog is not found
        if (fetchedBlogs.length === 0) {
            throw new ApiError(404, "No blog is created by you!");
        }

        // Set a success response with fetched blogs information
        return res.status(201).json(
            new ApiResponse(
                201,
                {
                    blogs: fetchedBlogs,
                },
                "All blogs created by you are fetched successfully"
            )
        );
    }
});
