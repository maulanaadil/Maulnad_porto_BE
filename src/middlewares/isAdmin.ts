import httpCodes from "@/helpers/httpCodes";
import response from "@/helpers/response";
import { findUserById } from "@/services/auth/services/users.service";
import { User } from "@prisma/client";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

type UserJWT = {
  userId: string;
  iat: number;
  exp: number;
};

export const isAdmin = async (req: any, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    response(res, httpCodes.Unauthorized, "Unauthorized", null);
  }

  try {
    const token = authorization?.split("Bearer ")[1];
    const user = jwt.verify(token, `${process.env.SECRET_TOKEN}`) as UserJWT;
    const findUserByid = (await findUserById(user.userId)) as User;
    if (findUserByid.role === "User") {
      return response(
        res,
        httpCodes.Forbidden,
        "You not allowed to access this resource",
        null
      );
    }
    req.payload = findUserById;
    return next();
  } catch (error) {
    response(res, httpCodes.Unauthorized, "Unauthorized adsad", null);
  }

  return response(res, httpCodes.Unauthorized, "Unauthorized FAKYOU ECA", null);
};
