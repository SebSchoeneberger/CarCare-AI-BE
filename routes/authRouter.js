import { Router } from "express";
import { signUp, login, getProfile } from "../controllers/auth.js";
import validateJoi from '../middlewares/validateJoi.js';
import { userSchema } from '../joi/schemas.js';
import verifyToken from "../middlewares/verifyToken.js";

const authRouter = Router();

authRouter.route('/signup').post(validateJoi(userSchema.POST), signUp);
authRouter.route('/login').post(validateJoi(userSchema.LOGIN), login);
authRouter.route('/me').get(verifyToken, getProfile);

export default authRouter;