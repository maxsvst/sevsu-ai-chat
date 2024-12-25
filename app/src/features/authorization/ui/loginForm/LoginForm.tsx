"use client";

import React, { useEffect } from "react";

import { z } from "zod";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { loginUser, selectStatus } from "@/entities/user/model/userSlice";
import { getChats, selectChats } from "@/entities/chat/model/chatSlice";
import { useAppDispatch } from "@/app/store";

import { Input } from "@/shared/ui/molecules/input";
import { NextIcon } from "@/shared/ui/atoms/nextIcon";
import { Error } from "@/shared/ui/atoms/error/Error";
import { HeadingText } from "@/shared/ui/atoms/headingText";
import { WarningIcon } from "@/shared/ui/atoms/warningIcon";
import { NextButton } from "@/shared/ui/molecules/nextButton";
import { LoginFormDataSchema } from "@/shared/model/loginDataSchema";

import styles from "./LoginForm.module.scss";

type Inputs = z.infer<typeof LoginFormDataSchema>;

export const LoginForm = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { chats } = useSelector(selectChats);
  const status = useSelector(selectStatus);

  console.log(status);

  useEffect(() => {
    (async () => await dispatch(getChats()).unwrap())();
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(LoginFormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (credentials: Inputs) => {
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
    <div className={styles.loginFormWrapper}>
      <form className={styles.loginForm} onSubmit={handleSubmit(processForm)}>
        <HeadingText text="Вход" />
        <div style={{ width: "100%" }}>
          <Input
            type="text"
            register={register("email")}
            placeholder="E-mail"
            isError={!!errors.email}
          />
          <Error field={errors.email} />
        </div>
        <div style={{ width: "100%" }}>
          <Input
            type="password"
            register={register("password")}
            placeholder="Пароль"
            isError={!!errors.password}
          />
          <Error field={errors.password} />
        </div>
        <NextButton text="Войти" type="submit" icon={<NextIcon />} />
      </form>
      {status === "failed" && (
        <div className={styles.loginFormError}>
          <WarningIcon />
          <span>
            Проверьте введённые данные. Такого пользователя не существует
          </span>
        </div>
      )}
    </div>
  );
};
