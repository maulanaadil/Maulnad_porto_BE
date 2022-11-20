import bycrypt from "bcrypt";
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
  const hashedPassword = await bycrypt.hash(password, 10);
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
