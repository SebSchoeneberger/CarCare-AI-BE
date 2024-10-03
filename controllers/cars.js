import Car from "../Models/Car.js";
import User from "../Models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { isValidObjectId } from "mongoose";

export const getCars = asyncHandler(async (req, res, next) => {
  const cars = await Car.find();
  res.status(200).json({ success: true, data: cars });
});

export const getCar = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if(!isValidObjectId(id)) throw new ErrorResponse(`Invalid Id: ${id}`, 404);

  const car = await Car.findById(id);
  if (!car) throw new ErrorResponse(`Car with id: ${id} not found`, 404);

  res.status(200).json({ success: true, data: car });
});

export const createCar = asyncHandler(async (req, res, next) => {
  const { userId, make, model, year, vin, fuel } = req.body;

  if (!userId || !make || !model || !year) throw new ErrorResponse("Please provide all required fields", 400);

  const car = await Car.create({ userId, make, model, year, vin, fuel });

  await User.findByIdAndUpdate(
    userId,
    { $push: { carsId: car._id } },
    { new: true }
  );
  
  res.status(201).json({ success: true, data: car });
});

export const updateCar = asyncHandler(async (req, res, next) => {
    const {
        params: { id },
        body: { userId, make, model, year, vin, fuel }
    } = req;
    
    if (!isValidObjectId(id)) throw new ErrorResponse(`Invalid Id: ${id}`, 404);
    
    const car = await Car.findByIdAndUpdate(id, { userId, make, model, year, vin, fuel }, { new: true, runValidators: true });
    
    if (!car) throw new ErrorResponse(`Car with id: ${id} not found`, 404);
    
    res.status(200).json({ success: true, data: car });
    });

export const deleteCar = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    
        if (!isValidObjectId(id)) throw new ErrorResponse(`Invalid Id: ${id}`, 404);
    
        const car = await Car.findByIdAndDelete(id);
    
        if (!car) throw new ErrorResponse(`Car with id: ${id} not found`, 404);
    
        res.status(200).json({ success: `Car with id: ${id} was deleted`});
    });
