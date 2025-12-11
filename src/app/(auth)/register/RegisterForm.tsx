"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ZButton } from "@/components/buttons";
import { ZTextInput } from "@/components/inputs/ZTextInput";
import { apiPostService } from "@/lib/axios";
import { RegisterFormData, registerSchema } from "@/schema/register";
import { USER_ROLES } from "@/constants/constants";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const res = await apiPostService({
        url: "/register",
        payload: {
          username: data.username,
          password: data.password,
          role: USER_ROLES.CUSTOMER, // Default role as 1 (Customer)
        },
        withCredentials: false,
      });
      if (!res.success) throw new Error(res.message);
      return data;
    },
    onSuccess: async (variables) => {
      toast.success(
        "Your account has been created! We are going to homepage right now!"
      );

      const result = await signIn("credentials", {
        redirect: false,
        username: variables.username,
        password: variables.password,
      });

      if (result?.error) {
        toast.error("Login failed, please try again with manually login.");
        router.replace("/login");
      } else {
        toast.success("Login success!");
        router.replace("/");
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed, please try again."
      );
    },
  });

  const onSubmit = (data: RegisterFormData) => mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <ZTextInput
        label="Username"
        placeholder="Type your username"
        error={errors.username?.message}
        {...register("username")}
      />

      <ZTextInput
        label="Password"
        type="password"
        placeholder="Type your password"
        error={errors.password?.message}
        {...register("password")}
      />

      <ZTextInput
        label="Confirm Password"
        type="password"
        placeholder="Retype your password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <ZButton type="submit" className="w-full" isPending={isPending}>
        Daftar
      </ZButton>

      <ZButton
        variant="ghost"
        type="button"
        className="w-full"
        onClick={() => router.push("/login")}
      >
        Already have an account? <span className="underline">Login</span>
      </ZButton>
    </form>
  );
}
