import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.js";

const secretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];

        if (!token) throw new ErrorResponse("Token not found", 401);

        const payload = jwt.verify(token, secretKey);
        if (!payload) throw new ErrorResponse("Invalid token", 401);

        req.userId = payload.user.id;

        next();
    } catch (error) {
        return next(new ErrorResponse("Not authorized to access this route", 401));
      }
};  

export default verifyToken;