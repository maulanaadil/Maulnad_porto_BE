import { db } from "@/utils/db.server";
import { Post } from "@prisma/client";

export const getPosts = async (): Promise<Post[]> => {
  return db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPost = async (id: number): Promise<Post | null> => {
  return db.post.findUnique({
    where: {
      id,
    },
  });
};

export const createPost = async (
  data: Omit<Post, "id">,
  imageUrl: string | undefined | null
): Promise<Post> => {
  const { authorId, title, description, published, linkTo } = data;

  return db.post.create({
    data: {
      authorId,
      title,
      description,
      imageUrl,
      published: String(published) === "true" ? true : false,
      linkTo,
    },
  });
};

export const findPost = async (id: number): Promise<Post | null> => {
  return db.post.findUnique({
    where: {
      id,
    },
  });
};

export const updatePost = async (
  data: Omit<Post, "id">,
  id: number,
  imageUrl: string | undefined | null
): Promise<Post> => {
  const { title, description, published, linkTo } = data;

  return db.post.update({
    where: {
      id,
    },
    data: {
      title,
      imageUrl,
      description,
      published: String(published) === "true" ? true : false,
      linkTo,
    },
  });
};

export const deletePost = async (id: number): Promise<Post | null> => {
  return db.post.delete({
    where: {
      id,
    },
  });
};
