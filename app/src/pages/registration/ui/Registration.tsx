"use client";

import React, { useState } from "react";

import styles from "./Registration.module.scss";

import { RegistrationForm } from "@/features/registration";
import { BackButton } from "@/shared/ui/atoms/backButton";

export const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const currentStepHandler = (value: number) => {
    setCurrentStep((prevValue) => prevValue + value);
  };

  return (
    <div className={styles.registrationWrapper}>
      <BackButton
        currentStep={currentStep}
        currentStepHandler={currentStepHandler}
      />
      <RegistrationForm
        currentStep={currentStep}
        currentStepHandler={currentStepHandler}
      />
    </div>
  );
};
