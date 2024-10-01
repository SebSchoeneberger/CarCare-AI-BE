import ErrorResponse from "../utils/ErrorResponse.js";

const validateJoi = schema => (req, res, next) => {
    const { error } = schema.validate(req.body);
    return error ? next(new ErrorResponse(error.message, 400)) : next();
};

export default validateJoi;