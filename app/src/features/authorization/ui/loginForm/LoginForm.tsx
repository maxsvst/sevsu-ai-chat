"use client";

import React, { useEffect } from "react";
import styles from "./LoginForm.module.scss";

import { Input } from "@/shared/ui/molecules/input";
import { useRouter } from "next/navigation";
import { api, API_URL, ApiResponse } from "@/shared/api";
import { NextButton } from "@/shared/ui/molecules/nextButton";
import { NextIcon } from "@/shared/ui/atoms/nextIcon";
import { HeadingText } from "@/shared/ui/atoms/headingText";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormDataSchema } from "@/shared/model/loginDataSchema";
import { useAppDispatch } from "@/app/store";
import { getChats, selectChats } from "@/entities/chat/model/chatSlice";
import { loginUser } from "@/entities/user/model/userSlice";
import { useSelector } from "react-redux";

interface LoginResDto extends ApiResponse {
  backendTokens: {
    accessToken: string;
    refreshToken: string;
  };
}

interface LoginReqDto {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { chats } = useSelector(selectChats);

  useEffect(() => {
    (async () => await dispatch(getChats()).unwrap())();
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginReqDto>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(LoginFormDataSchema),
  });

  const processForm: SubmitHandler<LoginReqDto> = async (
    credentials: LoginReqDto
  ) => {
    try {
      await dispatch(loginUser(credentials)).unwrap();
      await dispatch(getChats()).unwrap();

      if (chats.length) {
        router.push(`/chatPicked/${chats[0].id}`);
      } else {
        router.push("/chat");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(processForm)}>
      <HeadingText text="Вход" />
      <div style={{ width: "100%" }}>
        <Input
          type="text"
          register={register("email")}
          placeholder="E-mail"
          isError={!!errors.email}
        />
        {errors.email && (
          <span className={styles.error}>{errors.email.message}</span>
        )}
      </div>
      <div style={{ width: "100%" }}>
        <Input
          type="password"
          register={register("password")}
          placeholder="Пароль"
          isError={!!errors.password}
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </div>
      <NextButton text="Войти" type="submit" icon={<NextIcon />} />
    </form>
  );
};
