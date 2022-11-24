import { Router } from "express";
import post from "../controllers/post.controller";
import uploadImage from "@/middlewares/validateUploadImage";
import { isAuthenticated } from "@/middlewares/isAuthenticated";
import { isAdmin } from "@/middlewares/isAdmin";
import { isOwner } from "@/middlewares/isOwner";

const router: Router = Router();

// get posts
router.get("/", [isAuthenticated, isAdmin], post.getPosts);

// get a post by id
router.get("/:id", post.getPostById);

// create posts
router.post(
  "/",
  [isAuthenticated, uploadImage.single("image"), isAdmin],
  post.createPostByAdmin
);
router.post(
  "/:email",
  [isAuthenticated, uploadImage.single("image"), isOwner],
  post.createPost
);

// update post
router.patch(
  "/:id",
  [isAuthenticated, uploadImage.single("image"), isAdmin],
  post.updatePost
);
router.patch(
  "/:email/:id",
  [isAuthenticated, uploadImage.single("image"), isOwner],
  post.updatePost
);

// delete post
router.delete("/:id", [isAuthenticated, isAdmin], post.deletePost);
router.delete("/:email/:id", [isAuthenticated, isOwner], post.deletePost);

export default router;
