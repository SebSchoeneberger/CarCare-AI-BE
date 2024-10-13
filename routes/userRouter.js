import { Router } from 'express';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/users.js';
import validateJoi from '../middlewares/validateJoi.js';
import { userSchema } from '../joi/schemas.js';

const userRouter = Router();

userRouter.route('/').get(getUsers)

userRouter.route('/:id').get(getUser).put(validateJoi(userSchema.PUT), updateUser).delete(deleteUser);

export default userRouter;