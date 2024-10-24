"use client";

import React from "react";
import Link from "next/link";

import styles from "./BackButton.module.scss";
import { ArrowIcon } from "../arrowIcon";
import { Value } from "sass";

export interface BackButtonProps {
  currentStep?: number;
  currentStepHandler?: (value: number) => void;
}

export const BackButton = ({
  currentStep = 1,
  currentStepHandler,
}: BackButtonProps) => {
  const onClickHandler = (step: number) => {
    step !== 1 && currentStepHandler && currentStepHandler(-1);
  };

  return (
    <div>
      <Link
        href={currentStep === 1 ? "/" : ""}
        onClick={() => onClickHandler(currentStep)}
        className={styles.nextBtn}
      >
        <ArrowIcon />
        <button className={styles.btn}>Назад</button>
      </Link>
    </div>
  );
};
