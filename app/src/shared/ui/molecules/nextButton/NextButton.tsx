"use client";

import React, { MouseEventHandler, ReactElement } from "react";

import styles from "./NextButton.module.scss";

export interface NextButtonProps {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
  icon: ReactElement;
  isDisabled?: boolean;
}

export const NextButton = ({
  text,
  onClick,
  type,
  icon,
  isDisabled,
}: NextButtonProps) => {
  return (
    <button
      className={isDisabled ? styles.btnWrapperDisabled : styles.btnWrapper}
      onClick={onClick}
      type={!!type ? type : "button"}
    >
      <div style={{ width: "32px", height: "32px" }} />
      <span style={{ color: "black" }}>{text}</span>
      {icon}
    </button>
  );
};
