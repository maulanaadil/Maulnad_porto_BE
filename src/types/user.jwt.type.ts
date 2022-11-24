import type { User } from "@prisma/client";
import type { Request } from "express";

export type UserJWT = {
  userId: string;
  iat: number;
  exp: number;
};

export type RequestWithPayload = Request & {
  payload?: User | Object | any;
};
