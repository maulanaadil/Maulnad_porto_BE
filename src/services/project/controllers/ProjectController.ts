import response from "@/helpers/response";
import httpCodes from "@/helpers/httpCodes";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { zParse } from "@/middlewares/validateResource";
import {
  CreateProjectSchema,
  UpdateProjectSchema,
} from "../schema/project.schema";

const prisma = new PrismaClient();

const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return response(res, httpCodes.Ok, "Get all projects success!", projects);
  } catch (error: any) {
    return response(res, httpCodes.InternalServerError, error.message, null);
  }
};

const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!project) {
      return response(
        res,
        httpCodes.NotFound,
        `Project with id: ${req.params.id} not found!`,
        null
      );
    }
    return response(res, httpCodes.Ok, "Get project success!", project);
  } catch (error: any) {
    return response(res, httpCodes.InternalServerError, error.message, null);
  }
};

const createProject = async (req: Request, res: Response) => {
  try {
    const imageUrl = req.file?.filename;
    const { authorId, title, description, linkWebsite, platform, stack } =
      req.body;
    await zParse(CreateProjectSchema, req);

    const project = await prisma.project.create({
      data: {
        authorId: parseInt(authorId),
        title,
        description,
        imageUrl,
        linkWebsite,
        platform,
        stack,
      },
    });
    return response(res, httpCodes.Created, "Create project success!", project);
  } catch (error: any) {
    return response(res, httpCodes.InternalServerError, error.message, null);
  }
};

const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const imageUrl = req.file?.filename;
    const { title, description, linkWebsite, platform, stack } = req.body;

    const selectedProject = await prisma.project.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!selectedProject) {
      return response(
        res,
        httpCodes.NotFound,
        `Project with id: ${id} not found!`,
        null
      );
    }

    await zParse(UpdateProjectSchema, req);
    const updateProject = await prisma.project.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        description,
        imageUrl,
        linkWebsite,
        platform,
        stack,
      },
    });
    return response(
      res,
      httpCodes.Ok,
      `Update project with id: ${id} success!`,
      updateProject
    );
  } catch (error: any) {
    return response(res, httpCodes.InternalServerError, error.message, null);
  }
};

// delete project
const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const selectedProject = await prisma.project.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!selectedProject) {
      return response(
        res,
        httpCodes.NotFound,
        `Project with id: ${id} not found!`,
        null
      );
    }

    await prisma.project.delete({
      where: {
        id: parseInt(id),
      },
    });
    return response(
      res,
      httpCodes.Ok,
      `Delete project with id: ${id} success!`,
      null
    );
  } catch (error: any) {
    return response(res, httpCodes.InternalServerError, error.message, null);
  }
};

export default {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
