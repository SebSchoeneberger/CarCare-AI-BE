import { Router } from "express";
import { signUp, login } from "../controllers/auth.js";
import validateJoi from '../middlewares/validateJoi.js';
import { userSchema } from '../joi/schemas.js';

const authRouter = Router();

authRouter.route('/signup').post(validateJoi(userSchema.POST), signUp);
authRouter.route('/login').post(validateJoi(userSchema.LOGIN), login);

export default authRouter;