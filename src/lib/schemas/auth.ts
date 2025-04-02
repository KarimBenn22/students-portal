import z from "zod";

const username = z
  .string({ required_error: "Username is required" })
  .min(3, "Username must be at least 3 characters long")
  .max(20, "Username must be at most 20 characters long")
  .trim();

const displayName = z
  .string({ required_error: "Display name is required" })
  .min(3, "Display name must be at least 3 characters long")
  .max(70, "Display name must be at most 70 characters long")
  .trim();

const role = z.enum(["student", "teacher"]);

const password = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(71, "Password must be at most 71 characters long")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    "Password must include at least one uppercase letter, one lowercase letter, and one number"
  );

export const registerSchema = z
  .object({
    username,
    displayName,
    role,
    password,
    confirmPassword: z.string({
      required_error: "Password confirmation is required",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  username,
  password: z.string({ required_error: "Password is required" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
