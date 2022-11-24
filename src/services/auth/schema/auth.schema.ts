import { object, string, z } from "zod";

export const registerSchema = object({
  body: object({
    name: string({
      required_error: "name is required!",
    }).min(3, { message: "name must be at least 3 characters" }),
    email: string({
      required_error: "email is required!",
    }).email({ message: "email must be a valid email" }),
    password: string({
      required_error: "password is required!",
    }).min(8, { message: "password must be at least 8 characters" }),
    role: z.enum(["User", "Admin"]).optional(),
  }),
});

export const loginSchema = object({
  body: object({
    email: string({
      required_error: "email is required!",
    }).email({ message: "email must be a valid email" }),
    password: string({
      required_error: "password is required!",
    }).min(8, { message: "password must be at least 8 characters" }),
  }),
});
