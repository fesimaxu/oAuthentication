import z from "zod";

export const validateUserSignUp = z.object({
  body: z
    .object({
      name: z
        .string({
          required_error: "Name is required",
        })
        .nonempty({
          message: "Name is required",
        }),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Invalid email")
        .nonempty({
          message: "Email is required",
        }),
      gender: z.string({
        required_error: "gender is required",
      }),
      password: z
        .string({ required_error: "Password is required" })
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
      passwordConfirm: z.string({
        required_error: "Please confirm your password",
      }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      path: ["passwordConfirm"],
      message: "Passwords do not match",
    }),
});

export const validateUserLogin = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email or password"),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Invalid email or password"),
  }),
});

export type CreateUserInput = z.TypeOf<typeof validateUserSignUp>["body"];
export type LoginUserInput = z.TypeOf<typeof validateUserLogin>["body"];
