import ServiceHistory from "../Models/ServiceHistory.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { isValidObjectId } from "mongoose";
import Car from "../Models/Car.js";

export const getServiceHistories = asyncHandler(async (req, res, next) => {
    const serviceHistories = await ServiceHistory.find();
    res.status(200).json({ success: true, data: serviceHistories });
    });

export const getServiceHistory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) throw new ErrorResponse(`Invalid Id: ${id}`, 404);

    const serviceHistory = await ServiceHistory.findById(id);
    if (!serviceHistory) throw new ErrorResponse(`ServiceHistory with Id: ${id} not found`, 404);
    res.status(200).json({ success: true, data: serviceHistory });
    });

export const createServiceHistory = asyncHandler(async (req, res, next) => {
    const { carId, serviceDate, mileage, serviceType, garage, cost, notes } = req.body;
    
    if (!carId || !serviceDate || !mileage || !serviceType) throw new ErrorResponse("Please provide all required fields", 400);
    
    const serviceHistory = await ServiceHistory.create({ carId, serviceDate, mileage, serviceType, garage, cost, notes });
    
    await Car.findByIdAndUpdate(
        carId,
        { $push: { serviceHistoryId: serviceHistory._id } },
        { new: true }
    );
    
    res.status(201).json({ success: true, data: serviceHistory });
    });


export const updateServiceHistory = asyncHandler(async (req, res, next) => {
    const {
        params: { id },
        body: { carId, serviceDate, mileage, serviceType, garage, cost, notes }
    } = req;
    
    if (!isValidObjectId(id)) throw new ErrorResponse(`Invalid Id: ${id}`, 404);
    
    const serviceHistory = await ServiceHistory.findByIdAndUpdate(id, { carId, serviceDate, mileage, serviceType, garage, cost, notes }, { new: true });
    
    if (!serviceHistory) throw new ErrorResponse(`ServiceHistory with Id: ${id} not found`, 404);
    
    res.status(200).json({ success: true, data: serviceHistory });
    });


export const deleteServiceHistory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    
        if (!isValidObjectId(id)) throw new ErrorResponse(`Invalid Id: ${id}`, 404);
    
        const service = await ServiceHistory.findByIdAndDelete(id);
        if (!service) throw new ErrorResponse(`ServiceHistory with Id: ${id} not found`, 404);
        
        res.status(200).json({ success: `ServiceHistory with Id: ${id} was deleted`});
        });

