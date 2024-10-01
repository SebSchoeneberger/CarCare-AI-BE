import User from "../Models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { isValidObjectId } from "mongoose";

export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, data: users });
} );

export const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

    const user = await User.findById(id);  
    if(!user) throw new ErrorResponse(`User with id ${id} not found`, 404);

    res.status(200).json({ success: true, data: user });
}
);

export const createUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, phone } = req.body;

    if(!firstName || !lastName || !email || !password) throw new ErrorResponse("Please provide all required fields", 400);

  const user = await User.create({ firstName, lastName, email, password, phone });
  res.status(201).json({ success: true, data: user });
}
);

export const updateUser = asyncHandler(async (req, res, next) => { 
    const {
        params: { id },
        body: { firstName, lastName, email, password, phone }
    } = req;

    if (!isValidObjectId(id)) throw new ErrorResponse(`User with id ${id} not found`, 404);

    const user = await User.findByIdAndUpdate(id, { firstName, lastName, email, password, phone }, { new: true, runValidators: true });

    if (!user) throw new ErrorResponse(`User with id ${id} not found`, 404);

    res.status(200).json({ success: true, data: user });
}
);

export const deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    
        if (!isValidObjectId(id)) throw new ErrorResponse(`User with id ${id} not found`, 404);
    
        const user = await User.findByIdAndDelete(id);
    
        if (!user) throw new ErrorResponse(`User with id ${id} not found`, 404);
    
        res.status(200).json({ success: `Post with id of ${id} was deleted`});
    }
);
