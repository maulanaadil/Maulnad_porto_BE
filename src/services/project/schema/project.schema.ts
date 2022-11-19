import { nativeEnum, object, string, z } from "zod";

export const CreateProjectSchema = object({
  file: object({
    filename: string(),
  }),
  body: object({
    authorId: string({
      required_error: "authorId is required!",
    }),
    title: string({
      required_error: "title project is required!",
    }).min(8, { message: "title project must be at least 8 characters" }),
    description: string({
      required_error: "description project is required!",
    }).min(16, {
      message: "description project must be at least 16 characters",
    }),
    linkWebsite: string({
      required_error: "linkWebsite is required!",
    }).url({ message: "linkWebsite must be a valid URL" }),
    platform: z.enum(["Web", "Design", "Mobile"]),
    stack: string({
      required_error: "stack is required!",
    }).min(8, { message: "stack must be at least 8 characters" }),
  }),
});

export const UpdateProjectSchema = object({
  file: object({
    filename: string(),
  }),
  body: object({
    title: string({
      required_error: "title project is required!",
    }).min(8, { message: "title project must be at least 8 characters" }),
    description: string({
      required_error: "description project is required!",
    }).min(16, {
      message: "description project must be at least 16 characters",
    }),
    linkWebsite: string({
      required_error: "linkWebsite is required!",
    }).url({ message: "linkWebsite must be a valid URL" }),
    platform: z.enum(["Web", "Design", "Mobile"]),
    stack: string({
      required_error: "stack is required!",
    }).min(8, { message: "stack must be at least 8 characters" }),
  }),
});
