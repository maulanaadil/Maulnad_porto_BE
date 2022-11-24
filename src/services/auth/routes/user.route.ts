import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { isOwner } from "@/middlewares/isOwner";
import { Router } from "express";

import user from "../controllers/user.controller";
import projects from "../controllers/user.controller";

const router: Router = Router();

router.get("/posts/:email", user.getPostsByUserEmail);

router.get("/projects/:email", projects.getProjectsByUserEmail);

export default router;
