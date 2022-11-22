import { NextFunction, Response } from "express";
import httpCodes from "@/helpers/httpCodes";
import response from "@/helpers/response";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    response(res, httpCodes.Unauthorized, "Unauthorized", null);
  }

  try {
    const token = authorization?.split("Bearer ")[1];
    const payload = jwt.verify(
      token !== undefined ? token : "",
      `${process.env.SECRET_TOKEN}`
    );
    req.payload = payload;
    return next();
  } catch (error) {
    response(res, httpCodes.Unauthorized, "Unauthorized", null);
  }
};
