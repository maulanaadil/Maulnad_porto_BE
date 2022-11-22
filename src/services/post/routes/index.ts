import { Router } from "express";
import post from "../controllers/post.controller";
import uploadImage from "@/middlewares/validateUploadImage";
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { isAdmin } from "@/middlewares/isAdmin";

const router: Router = Router();

// get posts
router.get("/", [isAuthenticated, isAdmin], post.getPosts);

// get a post by id
router.get("/:id", post.getPostById);

// create posts
router.post("/", uploadImage.single("image"), post.createPost);

// update post
router.patch("/:id", uploadImage.single("image"), post.updatePost);

// delete post
router.delete("/:id", post.deletePost);

export default router;
