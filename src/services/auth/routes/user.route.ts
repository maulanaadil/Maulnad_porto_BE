import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { isOwner } from "@/middlewares/isOwner";
import { Router } from "express";

import user from "../controllers/user.controller";

const router: Router = Router();

router.get(
  "/posts/:email",
  [isAuthenticated, isOwner],
  user.getPostsByUserEmail
);

export default router;
