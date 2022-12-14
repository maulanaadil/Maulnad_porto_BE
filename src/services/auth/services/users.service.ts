import Password from "@/helpers/hashPassword";
import { db } from "@/utils/db.server";
import { User } from "@prisma/client";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const createUser = async ({
  email,
  password,
  name,
  role,
}: Omit<User, "id">): Promise<User> => {
  const hashedPassword = await Password.hashPassword(password);
  const user = await db.user.create({
    data: {
      email,
      name,
      role,
      password: hashedPassword,
    },
  });
  return user;
};

export const findUserById = async (id: string): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      id,
    },
  });
};

export const getPostsByUserEmail = async (
  email: string
): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      email,
    },
    include: {
      posts: true,
    },
  });
};

export const getProjectsByUserEmail = async (
  email: string
): Promise<User | null> => {
  return db.user.findUnique({
    where: {
      email,
    },
    include: {
      projects: true,
    },
  });
};
