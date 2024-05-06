// Import necessary libraries
import { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Primary_MongoDb_Connection from "../db/primary.mongodb.js";

// Define the User schema
const userSchema = new Schema(
    {
        // Name of the user
        name: {
            type: String,
            required: true,
            trim: true,
        },
        // Email address of the user (unique).
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        // Mobile number (unique)
        mobileNumber: {
            type: String,
            unique: true,
            trim: true,
        },
        // Gender of the user (optional)
        gender: {
            type: String,
            enum: ["Male", "Female"],
        },
        // Hashed password for authentication
        password: {
            type: String,
            required: [true, "Password is required!"],
            select: false,
        },
    },
    {
        // Automatic timestamps for creation and updates
        timestamps: true,
    }
);

// Pre-save middleware to hash the password before saving it to the database.
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to check if the provided password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Method to generate an access token for authentication
userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.USER_ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.USER_ACCESS_TOKEN_EXPIRY,
        }
    );
};

// Export the User model
export const User = Primary_MongoDb_Connection.model("User", userSchema);
