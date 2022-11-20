import { db } from "@/utils/db.server";

type Post = {
  id: number;
  authorId?: number | string | null;
  title: string;
  description: string;
  imageUrl?: string | undefined | null;
  published: boolean;
  linkTo: string;
};

export const getAllPost = async (): Promise<Post[]> => {
  return db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPostById = async (id: number): Promise<Post | null> => {
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
  const { title, description, published, linkTo } = data;
  const authorId = String(data.authorId || null);

  return db.post.create({
    data: {
      authorId: parseInt(authorId),
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
) => {
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
