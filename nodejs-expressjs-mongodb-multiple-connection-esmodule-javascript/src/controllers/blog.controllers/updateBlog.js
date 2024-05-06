import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Blog } from "../../models/blog.model.js";

// *** Update Blog ***
export const updateBlog = asyncHandler(async (req, res) => {
    // Retrieve user data from the request object
    const { user } = req;

    // Extract all the details from the request body
    const { blogId, name, content, isPublic } = req.body;

    // ==> Validation for req.body items if you are not using express-validator for validations : Start !!!
    // ==> Validation for req.body items if you are not using express-validator for validations : End !!!

    // Find the blog with its Id
    const fetchedBlog = await Blog.findById(blogId);

    // If blog is not found
    if (!fetchedBlog) {
        throw new ApiError(404, "Blog Id is invalid!");
    }
    // Checking is blog is ownBy the user using userId
    if (fetchedBlog.ownBy.toString() !== user._id.toString()) {
        throw new ApiError(401, "Unauthorized request!");
    }

    // Update the fetched blog with new details
    fetchedBlog.name = name;
    fetchedBlog.content = content;
    fetchedBlog.isPublic = isPublic;

    // Save the updated blog to the database
    const updatedBlog = await fetchedBlog.save();

    // Set a success response with updated blog information
    return res.status(201).json(
        new ApiResponse(
            201,
            {
                blog: updatedBlog,
            },
            "Blog is updated successfully"
        )
    );
});
