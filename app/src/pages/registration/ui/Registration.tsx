"use client";

import { RegistrationForm } from "@/features/registration";
import { BackButton } from "@/shared/ui/backButton";
import React, { useState } from "react";
import styles from "./Registration.module.scss";

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
