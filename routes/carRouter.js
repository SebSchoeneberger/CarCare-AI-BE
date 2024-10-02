import { Router } from 'express';
import { getCars, getCar, createCar, updateCar, deleteCar } from '../controllers/cars.js';
import validateJoi from '../middlewares/validateJoi.js';
import { carSchema } from '../joi/schemas.js';

const carRouter = Router();

carRouter.route('/').get(getCars).post(validateJoi(carSchema.POST), createCar);

carRouter.route('/:id').get(getCar).put(validateJoi(carSchema.PUT), updateCar).delete(deleteCar);

export default carRouter;