import User from "../Models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/errorResponse.js";
import { isValidObjectId } from "mongoose";

export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().populate('carsId');
  res.status(200).json({ success: true, data: users });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) throw new ErrorResponse(`Invalid Id: ${id}`, 404);

  const user = await User.findById(id).populate('carsId');
  if (!user) throw new ErrorResponse(`User with Id: ${id} not found`, 404);

  res.status(200).json({ success: true, data: user });
});

export const updateUser = asyncHandler(async (req, res, next) => { 
  const {
    params: { id },
    body: { firstName, lastName, email, password, phone, carsId }
  } = req;

  if (!isValidObjectId(id)) throw new ErrorResponse(`Invalid Id: ${id}`, 404);

  const user = await User.findByIdAndUpdate(id, { firstName, lastName, email, password, phone, carsId }, { new: true, runValidators: true });
  if (!user) throw new ErrorResponse(`User with Id: ${id} not found`, 404);

  res.status(200).json({ success: true, data: user });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) throw new ErrorResponse(`Invalid Id: ${id}`, 404);

  const user = await User.findByIdAndDelete(id);
  if (!user) throw new ErrorResponse(`User with Id: ${id} not found`, 404);

  res.status(200).json({ success: `User with Id: ${id} was deleted`});
});
