"use client";

import React from "react";

import { z } from "zod";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { selectUser, signupUser } from "@/entities/user/model/userSlice";
import { useAppDispatch } from "@/app/store";

import { Input } from "@/shared/ui/molecules/input";
import { NextIcon } from "@/shared/ui/atoms/nextIcon";
import { Error } from "@/shared/ui/atoms/error/Error";
import { FinishIcon } from "@/shared/ui/atoms/finishIcon";
import { HeadingText } from "@/shared/ui/atoms/headingText";
import { NextButton } from "@/shared/ui/molecules/nextButton";
import { RegistrationFormDataSchema } from "@/shared/model/registrationFormDataSchema";

import styles from "./RegistrationForm.module.scss";

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

  const processForm: SubmitHandler<Inputs> = async (data: Inputs) => {
    const { password, email, fullName, weight, height } = data;
    try {
      await dispatch(
        signupUser({
          password: password,
          email: email,
          fullName: fullName,
          weight: weight,
          height: height,
        })
      ).unwrap();

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
      fieldsToValidate = ["fullName"];
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
                register={register("fullName")}
                isError={!!errors.fullName}
              />
              <Error field={errors.fullName} />
            </div>
            <NextButton
              text="Далее"
              onClick={handleNextStep}
              icon={<NextIcon />}
              isDisabled={!!errors.fullName}
            />
          </>
        )}
        {currentStep === 2 && (
          <>
            <HeadingText text="Какие Ваши параметры?" />
            <div className={styles.registrationFormParamsWrapper}>
              <div style={{ width: "100%" }}>
                <Input
                  type="number"
                  placeholder="Вес"
                  register={register("weight")}
                  isError={!!errors.weight}
                />
                <Error field={errors.weight} />
              </div>
              <div style={{ width: "100%" }}>
                <Input
                  type="number"
                  placeholder="Рост"
                  register={register("height")}
                  isError={!!errors.height}
                />
                <Error field={errors.height} />
              </div>
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
              <Error field={errors.email} />
            </div>
            <div style={{ width: "100%" }}>
              <Input
                type="password"
                placeholder="Пароль"
                register={register("password")}
                isError={!!errors.password}
              />
              <Error field={errors.password} />
            </div>
            <div style={{ width: "100%" }}>
              <Input
                type="password"
                placeholder="Повторите пароль"
                register={register("confirmPassword")}
                isError={!!errors.confirmPassword}
              />
              <Error field={errors.confirmPassword} />
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
