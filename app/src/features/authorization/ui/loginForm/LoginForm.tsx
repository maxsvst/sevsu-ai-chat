"use client";

import React from "react";
import styles from "./LoginForm.module.scss";

import { Input } from "@/shared/ui/molecules/input";
import { useRouter } from "next/navigation";
import { api, API_URL, ApiResponse } from "@/shared/api";
import { NextButton } from "@/shared/ui/molecules/nextButton";
import { NextIcon } from "@/shared/ui/atoms/nextIcon";
import { HeadingText } from "@/shared/ui/atoms/headingText";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface LoginResDto extends ApiResponse {
  backendTokens: {
    accessToken: string;
    refreshToken: string;
  };
}

interface LoginReqDto {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    // resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<FieldValues> = async (data) => {
    const res = (await api.post(
      "/auth/login",
      JSON.stringify(data)
    )) as LoginResDto;

    // router.push("/chat");

    const res1 = await api.get("/users/all");

    if (res.backendTokens) {
      localStorage.setItem("accessToken", res.backendTokens.accessToken);
      localStorage.setItem("refreshToken", res.backendTokens.refreshToken);
      router.push("/chat");
    }

    // const res1 = await api.get("/auth/me");

    // console.log(res1.result);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(processForm)}>
      <HeadingText text="Вход" />
      <Input type="text" register={register("username")} placeholder="E-mail" />
      <Input
        type="password"
        register={register("password")}
        placeholder="Пароль"
      />
      <NextButton text="Войти" type="submit" icon={<NextIcon />} />
    </form>
  );
};
