import User from "../Models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { isValidObjectId } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

export const signUp = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, phone, carsId } = req.body;

  const found = await User.findOne({ email});
  if (found) throw new ErrorResponse("Email already Registered", 400);

  if (!firstName || !lastName || !email || !password) throw new ErrorResponse("Please provide all required fields", 400);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ firstName, lastName, email, password: hashedPassword , phone, carsId });

//   Token
    const payload = {
        user: {
        id: user._id,
        email: user.email,
        },
    };

    const token = jwt.sign(payload, secretKey, { expiresIn });


    res.status(201).json({success: true,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        },
        token
      });
});

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) throw new ErrorResponse("Please provide all required fields", 400);
    
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new ErrorResponse("Invalid Credentials", 401);

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new ErrorResponse("Invalid Credentials", 401);

    const payload = {
        user: {
        id: user._id,
        email: user.email,
        },
    };

    const token = jwt.sign(payload, secretKey, { expiresIn });

    res.status(200).json({ success: true,
        user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
    token });
});