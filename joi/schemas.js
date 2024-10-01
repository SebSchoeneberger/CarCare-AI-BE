import Joi from "joi";

export const userSchema = {
    POST: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(12).required(),
    phone: Joi.string().optional(),
    createdAt: Joi.date().default(Date.now)
  }),
  PUT: Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(8).max(12).optional(),
    phone: Joi.string().optional(),
  }),
}