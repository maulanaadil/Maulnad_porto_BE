import { NextFunction, Response } from "express";
import httpCodes from "@/helpers/httpCodes";
import response from "@/helpers/response";
import jwt from "jsonwebtoken";
import { findUserById } from "@/services/auth/services/users.service";
import type { RequestWithPayload, UserJWT } from "@/types/user.jwt.type";

export const isAuthenticated = async (
  req: RequestWithPayload,
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
    ) as UserJWT;
    const findUser = await findUserById(payload.userId);
    req.payload = findUser;
    return next();
  } catch (error) {
    response(res, httpCodes.BadRequest, "Error on authorization", null);
  }
};
