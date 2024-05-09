import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

const validationHandler = (req, _, next) => {
    const validationErrors = validationResult(req)?.errors;

    if (validationErrors.length != 0) {
        const errorMessage = validationErrors[0]?.msg;

        throw new ApiError(400, errorMessage);
    }

    return next();
};

export { validationHandler };
