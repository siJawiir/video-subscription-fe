import z from "zod";

export const loginSchema = z.object({
  username: z.string("Format username tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
