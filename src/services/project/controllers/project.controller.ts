import response from "@/helpers/response";
import httpCodes from "@/helpers/httpCodes";
import { Request, Response } from "express";
import { zParse } from "@/helpers/validateResource";
import {
  CreateProjectSchema,
  UpdateProjectSchema,
} from "../schema/project.schema";

import * as ProjectService from "../services/project.service";

const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectService.getProjects();
    return response(res, httpCodes.Ok, "Get all projects success!", projects);
  } catch (error: any) {
    return response(res, httpCodes.InternalServerError, error.message, null);
  }
};

const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await ProjectService.getProject(parseInt(req.params.id));

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
    const data = req.body;
    const imageUrl = req.file?.filename;
    await zParse(CreateProjectSchema, req);

    const project = await ProjectService.createProject(data, imageUrl);

    return response(res, httpCodes.Created, "Create project success!", project);
  } catch (error: any) {
    return response(res, httpCodes.InternalServerError, error.message, null);
  }
};

const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const imageUrl = req.file?.filename;

    const selectedProject = await ProjectService.findProject(parseInt(id));

    if (!selectedProject) {
      return response(
        res,
        httpCodes.NotFound,
        `Project with id: ${id} not found!`,
        null
      );
    }

    await zParse(UpdateProjectSchema, req);
    const updateProject = await ProjectService.updateProject(
      data,
      parseInt(id),
      imageUrl
    );
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
    const selectedProject = await ProjectService.findProject(parseInt(id));

    if (!selectedProject) {
      return response(
        res,
        httpCodes.NotFound,
        `Project with id: ${id} not found!`,
        null
      );
    }

    await ProjectService.deleteProject(parseInt(id));
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
