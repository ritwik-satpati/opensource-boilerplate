import { Router } from "express";

// ### Middlewares ###
import { registerUserValidation, loginUserValidation } from "../validations/user.validations.js";
import { validationHandler } from "../utils/validationHandler.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";

// ### Controllers ###
import { registerUser } from "../controllers/user.controllers/registerUser.js";
import { loginUser } from "../controllers/user.controllers/loginUser.js";
import { getUser } from "../controllers/user.controllers/getUser.js";
import { logoutUser } from "../controllers/user.controllers/logoutUser.js";

const router = Router();

// ### Routes ###

// *** User Registration ***
router.route("/register").post(registerUserValidation(), validationHandler, registerUser);

// *** User Login ***
router.route("/login").post(loginUserValidation(), validationHandler, loginUser);

// ### Routes => Secured ###

// *** User Information ***
router.route("/").get(userAuth, getUser);

// *** User Logout ***
router.route("/logout").post(userAuth, logoutUser);

export default router;
