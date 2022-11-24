import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import response from "@/helpers/response";
import httpCodes from "@/helpers/httpCodes";
import { zParse } from "@/helpers/validateResource";
import bcrypt from "bcrypt";

import { loginSchema, registerSchema } from "../schema/auth.schema";
import * as UsersService from "../services/users.service";
import { generateTokens } from "@/utils/jwt.server";

import { User } from "@prisma/client";
import { addRefreshTokenToWhiteList } from "../services/auth.service";

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body as User;
    await zParse(registerSchema, req);

    const existingUser = await UsersService.findUserByEmail(email);

    if (existingUser) {
      response(res, httpCodes.BadRequest, "Email already exists", null);
    }

    const user = await UsersService.createUser({
      email,
      password,
      name,
      role,
    });
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhiteList({ jti, refreshToken, userId: user.id });

    return response(res, httpCodes.Created, "User created", {
      ...user,
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    return response(res, httpCodes.InternalServerError, error.message, null);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as User;
    await zParse(loginSchema, req);

    const existingUser = await UsersService.findUserByEmail(email);

    if (!existingUser) {
      return response(res, httpCodes.Forbidden, "There's no account", null);
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return response(res, httpCodes.Forbidden, "Wring password", null);
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhiteList({
      jti,
      refreshToken,
      userId: existingUser.id,
    });
    return response(res, httpCodes.Ok, "Login successful", {
      ...existingUser,
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    return response(res, httpCodes.InternalServerError, error.message, null);
  }
};

export default {
  register,
  login,
};
