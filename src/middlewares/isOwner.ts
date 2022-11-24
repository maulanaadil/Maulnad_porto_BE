import httpCodes from "@/helpers/httpCodes";
import response from "@/helpers/response";
import { RequestWithPayload } from "@/types/user.jwt.type";
import { NextFunction, Response } from "express";

export const isOwner = async (
  req: RequestWithPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.params;
    const { payload } = req;
    if (email !== payload.email) {
      return response(
        res,
        httpCodes.Forbidden,
        "You not allowed to access this resource",
        null
      );
    }
    next();
  } catch (error) {
    response(
      res,
      httpCodes.BadRequest,
      "Error your not the owner of the contents",
      null
    );
  }
};
