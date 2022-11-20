import { Router } from "express";
import docs from "./docs.route";
import postsService from "../services/post/routes";
import projectsService from "../services/project/routes";

const router: Router = Router();

router.use("/posts", postsService);
router.use("/docs", docs);
router.use("/projects", projectsService);

export default router;
