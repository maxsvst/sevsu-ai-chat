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
import { Input } from "@/shared/ui/molecules/input";
import { useRouter } from "next/navigation";
import { NextButton } from "@/shared/ui/molecules/nextButton";
import { NextIcon } from "@/shared/ui/atoms/nextIcon";
import { FinishIcon } from "@/shared/ui/atoms/finishIcon";
import { HeadingText } from "@/shared/ui/atoms/headingText";
import { RegistrationFormDataSchema } from "@/shared/model/registrationFormDataSchema";

import { useAppDispatch } from "@/app/store";
import { selectUser, signupUser } from "@/entities/user/model/userSlice";
import { useSelector } from "react-redux";

type Inputs = z.infer<typeof RegistrationFormDataSchema>;

export const RegistrationForm = ({
  currentStep,
  currentStepHandler,
}: {
  currentStep: number;
  currentStepHandler: (value: number) => void;
}) => {
  const router = useRouter();
  const { id } = useSelector(selectUser);
  const dispatch = useAppDispatch();

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(RegistrationFormDataSchema),
  });

  const processForm: any = async (data: any) => {
    const { password, email, name, weight, height } = data;
    try {
      await dispatch(
        signupUser({
          password: password,
          email: email,
          fullName: name,
          weight: weight,
          height: height,
        })
      );

      if (id) {
        router.push("/authorization");
      } else {
        console.error("Ошибка при регистрации: не получен id");
      }
    } catch (e) {
      console.error("Ошибка при регистрации", e);
    }
  };

  const handleNextStep = async () => {
    let fieldsToValidate: any;
    if (currentStep === 1) {
      fieldsToValidate = ["name"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["weight", "height"];
    } else if (currentStep === 3) {
      fieldsToValidate = ["email", "password", "confirmPassword"];
    } else {
      return;
    }
    try {
      const isValid = await trigger(fieldsToValidate);
      if (isValid && currentStep !== 3) {
        currentStepHandler(1);
      }
    } catch (e) {
      console.error(e);
    }
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
            <div style={{ width: "100%" }}>
              <Input
                type="text"
                placeholder="Имя"
                register={register("name")}
                isError={!!errors.name}
              />
              {errors.name && (
                <span className={styles.error}>{errors.name.message}</span>
              )}
            </div>
            <NextButton
              text="Далее"
              onClick={handleNextStep}
              icon={<NextIcon />}
              isDisabled={!!errors.name}
            />
          </>
        )}
        {currentStep === 2 && (
          <>
            <HeadingText text="Какие Ваши параметры?" />
            <div style={{ width: "100%" }}>
              <Input
                type="number"
                placeholder="Вес"
                register={register("weight")}
                isError={!!errors.weight}
              />
              {errors.weight && (
                <span className={styles.error}>{errors.weight.message}</span>
              )}
            </div>
            <div style={{ width: "100%" }}>
              <Input
                type="number"
                placeholder="Рост"
                register={register("height")}
                isError={!!errors.height}
              />
              {errors.height && (
                <span className={styles.error}>{errors.height.message}</span>
              )}
            </div>
            <NextButton
              text="Далее"
              onClick={handleNextStep}
              icon={<NextIcon />}
              isDisabled={!!errors.weight || !!errors.height}
            />
          </>
        )}
        {currentStep === 3 && (
          <>
            <HeadingText text="Ещё немного информации" />
            <div style={{ width: "100%" }}>
              <Input
                type="email"
                placeholder="E-mail"
                register={register("email")}
                isError={!!errors.email}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}
            </div>
            <div style={{ width: "100%" }}>
              <Input
                type="password"
                placeholder="Пароль"
                register={register("password")}
                isError={!!errors.password}
              />
              {errors.password && (
                <span className={styles.error}>{errors.password.message}</span>
              )}
            </div>
            <div style={{ width: "100%" }}>
              <Input
                type="password"
                placeholder="Повторите пароль"
                register={register("confirmPassword")}
                isError={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <span className={styles.error}>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <NextButton
              text="Завершить регистрацию"
              type="submit"
              onClick={handleNextStep}
              icon={<FinishIcon />}
              isDisabled={!!errors.password || !!errors.confirmPassword}
            />
          </>
        )}
      </form>
    </section>
  );
};
