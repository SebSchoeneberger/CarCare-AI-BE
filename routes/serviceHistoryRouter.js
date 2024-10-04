import { Router } from 'express';
import { getServiceHistories, getServiceHistory, createServiceHistory, updateServiceHistory, deleteServiceHistory } from '../controllers/serviceHistory.js';
import  validateJoi  from '../middlewares/validateJoi.js';
import { serviceHistorySchema } from '../joi/schemas.js';

const serviceHistoryRouter = Router();

serviceHistoryRouter.route('/').get(getServiceHistories).post(validateJoi(serviceHistorySchema.POST), createServiceHistory);

serviceHistoryRouter.route('/:id').get(getServiceHistory).put(validateJoi(serviceHistorySchema.PUT), updateServiceHistory).delete(deleteServiceHistory);

export default serviceHistoryRouter;