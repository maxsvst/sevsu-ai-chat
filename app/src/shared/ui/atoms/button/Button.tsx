import React from "react";
import Link from "next/link";

import styles from "./Button.module.scss";

export interface ButtonProps {
  text: string;
  hrefTo: string;
  theme: ButtonTheme;
}

enum ButtonTheme {
  Dark = "dark",
  Light = "light",
}

export const Button = ({ text, theme, hrefTo }: ButtonProps) => {
  const currentThemeStyle =
    theme === ButtonTheme.Dark ? styles.btn_light : styles.btn_dark;

  return (
    <Link href={hrefTo} className={`${styles.btn} ${currentThemeStyle}`}>
      {text}
    </Link>
  );
};
