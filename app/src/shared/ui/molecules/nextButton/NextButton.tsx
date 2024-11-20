"use client";

import React, { MouseEventHandler, ReactElement } from "react";
import styles from "./NextButton.module.scss";

export interface NextButtonProps {
  text: string;
  onClickHandler?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
  icon: ReactElement;
}

export const NextButton = ({
  text,
  onClickHandler,
  type,
  icon,
}: NextButtonProps) => {
  return (
    <button
      className={styles.btnWrapper}
      onClick={onClickHandler && onClickHandler}
      type={!!type ? type : "button"}
    >
      <div style={{ width: "32px", height: "32px" }} />
      <span style={{ color: "black" }}>{text}</span>
      {icon}
    </button>
  );
};
