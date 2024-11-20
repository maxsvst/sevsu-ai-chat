import React from "react";
import styles from "./HeadingText.module.scss";

export interface HeadingTextProps {
  text: string;
}

export const HeadingText = ({ text }: HeadingTextProps) => {
  return <h2 className={styles.heading}>{text}</h2>;
};
