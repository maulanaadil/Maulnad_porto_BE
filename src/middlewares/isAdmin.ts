import httpCodes from "@/helpers/httpCodes";
import response from "@/helpers/response";
import { RequestWithPayload } from "@/types/user.jwt.type";
import { User } from "@prisma/client";
import { NextFunction, Response } from "express";

export const isAdmin = async (
  req: RequestWithPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.payload as User;
    if (role === "User") {
      return response(
        res,
        httpCodes.Forbidden,
        "You not allowed to access this resource",
        null
      );
    }
    return next();
  } catch (error) {
    response(res, httpCodes.Unauthorized, "Unauthorized", null);
  }

  return response(res, httpCodes.Unauthorized, "Unauthorized", null);
};
