import React from "react";
import styles from "./Button.module.scss";

export interface ButtonProps {
  text: string;
  theme: ButtonTheme;
}

enum ButtonTheme {
  Dark = "dark",
  Light = "light",
}

export const Button = ({ text, theme }: ButtonProps) => {
  const currentThemeStyle =
    theme === ButtonTheme.Dark ? styles.btn_light : styles.btn_dark;

  return (
    <button className={`${styles.btn} ${currentThemeStyle}`}>{text}</button>
  );
};
