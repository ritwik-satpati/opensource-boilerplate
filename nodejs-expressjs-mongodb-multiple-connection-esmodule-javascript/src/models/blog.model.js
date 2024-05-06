// Import necessary libraries
import mongoose, { Schema } from "mongoose";
import Secondary_MongoDb_Connection from "../db/secondary.mongodb.js";
import { User } from "./user.model.js";

// Define the Blog schema
const blogSchema = new Schema(
    {
        // Owner of the blog
        ownBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true,
        },
        // Name of the blog
        name: {
            type: String,
            required: true,
            trim: true,
        },
        // Content of the blog
        content: {
            type: String,
            required: true,
        },
        // Blog is public or not (default is true)
        isPublic: {
            type: Boolean,
            default: true,
        },
    },
    {
        // Automatic timestamps for creation and updates
        timestamps: true,
    }
);

// Export the Blog model
export const Blog = Secondary_MongoDb_Connection.model("Blog", blogSchema);
