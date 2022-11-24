import { Router } from "express";
import project from "../controllers/project.controller";
import uploadImage from "@/middlewares/validateUploadImage";
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { isAdmin } from "@/middlewares/isAdmin";
import { isOwner } from "@/middlewares/isOwner";

const router: Router = Router();

// get projects
router.get("/", [isAuthenticated, isAdmin], project.getProjects);

// get a project by id
router.get("/:id", project.getProjectById);

// create project
router.post(
  "/",
  [isAuthenticated, uploadImage.single("image"), isAdmin],
  project.createProjectByAdmin
);

router.post(
  "/:email",
  [isAuthenticated, uploadImage.single("image"), isOwner],
  project.createProject
);

// update project
router.patch(
  "/:id",
  [isAuthenticated, uploadImage.single("image"), isAdmin],
  project.updateProject
);
router.patch(
  "/:email/:id",
  [isAuthenticated, uploadImage.single("image"), isOwner],
  project.updateProject
);

// delete project
router.delete("/:id", [isAuthenticated, isAdmin], project.deleteProject);
router.delete("/:email/:id", [isAuthenticated, isOwner], project.deleteProject);

export default router;
