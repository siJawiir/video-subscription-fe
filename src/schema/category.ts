import z from "zod";

export const categorySchema = z.object({
  username: z.string("Format username tidak valid"),
  password: z.string().min(6, "Minimal 6 karakter"),
});
