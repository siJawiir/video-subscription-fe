import z from "zod";

export const registerSchema = z
  .object({
    password: z.string().min(6, "Minimal 6 karakter"),
    confirmPassword: z.string().min(6, "Minimal 6 karakter"),
    username: z.string().min(3, "Minimal 3 karakter"),
    // role: z.number().min(1, "Pilih peran pengguna"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
