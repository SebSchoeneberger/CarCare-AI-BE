import { Router } from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/users.js';
import validateJoi from '../middlewares/validateJoi.js';
import { userSchema } from '../joi/schemas.js';

const userRouter = Router();

userRouter.route('/').get(getUsers).post(validateJoi(userSchema.POST), createUser);

userRouter.route('/:id').get(getUser).put(validateJoi(userSchema.PUT), updateUser).delete(deleteUser);

export default userRouter;