import { Router } from "express";

// ### Middlewares ###
import { createBlogValidation, updateBlogValidation } from "../validations/blog.validations.js";
import { validationHandler } from "../utils/validationHandler.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";

// ### Controllers ###
import { createBlog } from "../controllers/blog.controllers/createBlog.js";
import { getBlog } from "../controllers/blog.controllers/getBlog.js";
import { updateBlog } from "../controllers/blog.controllers/updateBlog.js";

const router = Router();

// ### Routes ###

// ### Routes => Secured ###

// *** Create Blog *** && *** Get Blog *** && *** Update Blog ***
router
    .route("/")
    // *** Create Blog ***
    .post(userAuth, createBlogValidation(), validationHandler, createBlog)
    // *** Get Blog ***
    .get(userAuth, getBlog)
    // *** Update Blog ***
    .put(userAuth, updateBlogValidation(), validationHandler, updateBlog);

export default router;
