import { Router } from "express";
import project from "../controllers/ProjectController";
import uploadImage from "@/middlewares/validateUploadImage";

const router: Router = Router();

// get projects
router.get("/", project.getProjects);

// get a project by id
router.get("/:id", project.getProjectById);

// create project
router.post("/", uploadImage.single("image"), project.createProject);

// update project
router.patch("/:id", uploadImage.single("image"), project.updateProject);

// delete project
router.delete("/:id", project.deleteProject);

export default router;
