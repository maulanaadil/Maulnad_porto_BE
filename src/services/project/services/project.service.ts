import { db } from "@/utils/db.server";
import { Project } from "@prisma/client";

export const getProjects = async (): Promise<Project[]> => {
  return db.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProject = async (id: number): Promise<Project | null> => {
  return db.project.findUnique({
    where: {
      id,
    },
  });
};

export const createProject = async (
  data: Omit<Project, "id">,
  imageUrl: string | undefined | null
): Promise<Project> => {
  const { authorId, title, description, platform, linkWebsite, stack } = data;

  return db.project.create({
    data: {
      authorId,
      title,
      description,
      imageUrl,
      platform,
      linkWebsite,
      stack,
    },
  });
};

export const findProject = async (id: number): Promise<Project | null> => {
  return db.project.findUnique({
    where: {
      id,
    },
  });
};

export const updateProject = async (
  data: Omit<Project, "id">,
  id: number,
  imageUrl: string | undefined | null
): Promise<Project> => {
  const { title, description, platform, linkWebsite, stack } = data;
  return db.project.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      imageUrl,
      platform,
      linkWebsite,
      stack,
    },
  });
};

export const deleteProject = (id: number): Promise<Project> => {
  return db.project.delete({
    where: {
      id,
    },
  });
};
