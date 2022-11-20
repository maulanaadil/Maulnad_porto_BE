import { db } from "@/utils/db.server";

type Project = {
  id: number;
  authorId?: number | string | null;
  title: string;
  description: string;
  imageUrl?: string | undefined | null;
  platform: "Web" | "Mobile" | "Design";
  linkWebsite: string;
  stack: string;
};

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
  const { title, description, platform, linkWebsite, stack } = data;
  const authorId = String(data.authorId || null);

  return db.project.create({
    data: {
      authorId: parseInt(authorId),
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
  const authorId = String(data.authorId || null);
  return db.project.update({
    where: {
      id,
    },
    data: {
      authorId: parseInt(authorId),
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
