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
};

export const carSchema = {
  POST: Joi.object({
    userId: Joi.string().required(),
    make: Joi.string().required(),
    model: Joi.string().required(),
    year: Joi.number().integer().min(1886).max(new Date().getFullYear()).required(),
    vin: Joi.string().length(17).optional(),
    fuel: Joi.string().optional(),
    createdAt: Joi.date().default(Date.now)
  }),
  PUT: Joi.object({
    userId: Joi.string().optional(),
    make: Joi.string().optional(),
    model: Joi.string().optional(),
    year: Joi.number().integer().min(1886).max(new Date().getFullYear()).optional(),
    vin: Joi.string().length(17).optional(),
    fuel: Joi.string().optional(),
  }),
};

export const chatLogSchema = {
  POST: Joi.object({
    userId: Joi.string().required(),
    messages: Joi.array().items(
      Joi.object({
        type: Joi.string().valid("user", "bot").required(),
        message: Joi.string().min(1).required(),
      })
    ).required()
  }),
  PUT: Joi.object({
    userId: Joi.string().optional(),
    messages: Joi.array().items(
      Joi.object({
        type: Joi.string().valid("user", "bot").optional(),
        message: Joi.string().min(1).optional(),
      })
    ).optional()
  })
};