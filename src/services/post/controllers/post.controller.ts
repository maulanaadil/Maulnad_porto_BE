import response from "@/helpers/response";
import httpCodes from "@/helpers/httpCodes";
import { Request, Response } from "express";
import { zParse } from "@/middlewares/validateResource";
import { CreatePostSchema, UpdatePostSchema } from "../schema/posts.schema";

import * as PostService from "../services/post.service";

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostService.getPosts();

    return response(res, httpCodes.Ok, "Get all posts success!", posts);
  } catch (error: any) {
    return response(res, httpCodes.InternalServerError, error.message, null);
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await PostService.getPost(parseInt(req.params.id));

    if (!post) {
      return response(res, httpCodes.NotFound, "Post not found!", null);
    }

    return response(res, httpCodes.Ok, "Get post success!", post);
  } catch (error: any) {
    return response(res, httpCodes.InternalServerError, error.message, null);
  }
};

const createPost = async (req: Request, res: Response) => {
  try {
    await zParse(CreatePostSchema, req);
    const data = req.body;
    const image = req.file?.filename;
    const post = await PostService.createPost(data, image);

    return response(res, httpCodes.Created, "Create post success!", post);
  } catch (error: any) {
    return response(res, httpCodes.InternalServerError, error.message, null);
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const image = req.file?.filename;

    const selectedPost = await PostService.findPost(parseInt(id));

    if (!selectedPost) {
      return response(res, httpCodes.NotFound, "Post not found!", null);
    }

    await zParse(UpdatePostSchema, req);

    const updatePost = await PostService.updatePost(data, parseInt(id), image);
    return response(res, httpCodes.Ok, "Update post success!", updatePost);
  } catch (error: any) {
    return response(res, httpCodes.InternalServerError, error.message, null);
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const selectedPost = await PostService.findPost(parseInt(id));

    if (!selectedPost) {
      return response(res, httpCodes.NotFound, "Post not found!", null);
    }

    await PostService.deletePost(parseInt(id));

    return response(res, httpCodes.Ok, "Delete post success!", null);
  } catch (error: any) {
    return response(res, httpCodes.InternalServerError, error.message, null);
  }
};

export default {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
