import { object, string } from "zod";

export const CreatePostByAdminSchema = object({
  file: object({
    filename: string(),
  }),
  body: object({
    authorId: string({
      required_error: "authorId is required!",
    }),
    title: string({
      required_error: "title is required!",
    }).min(8, { message: "title must be at least 8 characters" }),
    description: string({
      required_error: "description is required!",
    }).min(16, { message: "description must be at least 16 characters" }),
    linkTo: string({
      required_error: "linkTo is required!",
    }).url({ message: "linkTo must be a valid URL" }),
    published: string({
      required_error: "published is required!",
    }),
  }),
});

export const CreatePostByOwnerScehma = object({
  file: object({
    filename: string(),
  }),
  body: object({
    title: string({
      required_error: "title is required!",
    }).min(8, { message: "title must be at least 8 characters" }),
    description: string({
      required_error: "description is required!",
    }).min(16, { message: "description must be at least 16 characters" }),
    linkTo: string({
      required_error: "linkTo is required!",
    }).url({ message: "linkTo must be a valid URL" }),
    published: string({
      required_error: "published is required!",
    }),
  }),
  payload: object({
    id: string({
      required_error: "authorId is required!",
    }),
  }),
});

export const UpdatePostSchema = object({
  file: object({
    filename: string(),
  }),
  body: object({
    title: string({
      required_error: "title is required!",
    }).min(8, { message: "title must be at least 8 characters" }),
    description: string({
      required_error: "description is required!",
    }).min(16, { message: "description must be at least 16 characters" }),
    linkTo: string({
      required_error: "linkTo is required!",
    }).url({ message: "linkTo must be a valid URL" }),
    published: string({
      required_error: "published is required!",
    }),
  }),
});
