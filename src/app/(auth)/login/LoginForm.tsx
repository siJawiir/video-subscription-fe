"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ZButton } from "@/components/buttons";
import { ZTextInput } from "@/components/inputs";
import { logError, logInfo } from "@/lib/logger";
import { LoginFormData, loginSchema } from "@/schema/login";

export default function LoginForm() {
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginFormData) => {
      logInfo("LoginForm", "Proses login dimulai", data);
      const res = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
      });

      if (res?.error) throw new Error(res.error);
      return res;
    },
    onSuccess: async () => {
      toast.success("Login berhasil!");
      logInfo("LoginForm", "Login berhasil, mengarahkan ke dashboard");
      router.push("/");
    },
    onError: (err) => {
      const message =
        err instanceof Error ? err.message : "Terjadi kesalahan login";
      toast.error(message);
      logError("LoginForm", err);
    },
  });

  const onSubmit = (data: LoginFormData) => mutate(data);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <ZTextInput
        label="Username"
        type="username"
        placeholder="Masukkan username"
        error={form.formState.errors.username?.message}
        {...form.register("username")}
      />

      <ZTextInput
        label="Password"
        type="password"
        placeholder="Masukkan password"
        error={form.formState.errors.password?.message}
        {...form.register("password")}
      />

      <ZButton type="submit" className="w-full" isPending={isPending}>
        Masuk
      </ZButton>

      <ZButton
        type="button"
        className="w-full"
        variant="ghost"
        onClick={() => router.push("/register")}
      >
        Belum punya akun? Daftar Sekarang!
      </ZButton>
    </form>
  );
}
