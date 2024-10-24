"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./RegistrationForm.module.scss";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldValue,
  FieldValues,
} from "react-hook-form";

import { z } from "zod";
import { Input } from "@/shared/ui/input";
import { useRouter } from "next/navigation";
import { NextButton } from "@/shared/ui/nextButton";
import { NextIcon } from "@/shared/ui/nextIcon";
import { FinishIcon } from "@/shared/ui/finishIcon";
import { HeadingText } from "@/shared/ui/headingText";
import { RegistrationFormDataSchema } from "@/shared/model/registrationFormDataSchema";
import { api } from "@/shared/api";

type Inputs = z.infer<typeof RegistrationFormDataSchema>;

type Fieldname = keyof Inputs;

export const RegistrationForm = ({
  currentStep,
  currentStepHandler,
}: {
  currentStep: number;
  currentStepHandler: (value: number) => void;
}) => {
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    // formState: { errors },
  } = useForm<Inputs>({
    // resolver: zodResolver(FormDataSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const { password, email, name } = data;
    const res = await api.post(
      "/auth/signup",
      JSON.stringify({
        email: email,
        password: password,
        username: name,
        fullName: name,
      })
    );
    console.log(res.result);
  };

  return (
    <section className={styles.registrationFormWrapper}>
      <span className={styles.step}>Шаг {currentStep}/3</span>
      <form
        className={styles.registrationForm}
        onSubmit={handleSubmit(processForm)}
      >
        {currentStep === 1 && (
          <>
            <HeadingText text="Как я могу к Вам обращаться?" />
            <Input type="text" placeholder="Имя" register={register("name")} />
            <NextButton
              text="Далее"
              onClickHandler={() => currentStepHandler(1)}
              icon={<NextIcon />}
            />
          </>
        )}
        {currentStep === 2 && (
          <>
            <HeadingText text="Какие Ваши параметры?" />
            <Input
              type="number"
              placeholder="Вес"
              register={register("weight")}
            />
            <Input
              type="number"
              placeholder="Рост"
              register={register("height")}
            />
            <NextButton
              text="Далее"
              onClickHandler={() => currentStepHandler(1)}
              icon={<NextIcon />}
            />
          </>
        )}
        {currentStep === 3 && (
          <>
            <HeadingText text="Ещё немного информации" />
            <Input
              type="email"
              placeholder="E-mail"
              register={register("email")}
            />
            <Input
              type="password"
              placeholder="Пароль"
              register={register("password")}
            />
            <Input
              type="password"
              placeholder="Повторите пароль"
              register={register("confirmPassword")}
            />
            <NextButton
              text="Завершить регистрацию"
              type="submit"
              icon={<FinishIcon />}
            />
          </>
        )}
      </form>
    </section>
  );
};
