import httpCodes from "@/helpers/httpCodes";
import response from "@/helpers/response";
import { Response, Request } from "express";

import * as UserService from "../services/users.service";

const getPostsByUserEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const getPostsUserByEmail = await UserService.getPostsByUserEmail(email);

    return response(
      res,
      httpCodes.Ok,
      "Get all posts success!",
      getPostsUserByEmail
    );
  } catch (error: any) {
    response(res, httpCodes.InternalServerError, error.message, null);
  }
};

export default {
  getPostsByUserEmail,
};
