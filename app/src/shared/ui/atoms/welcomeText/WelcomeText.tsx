import React from "react";
import styles from "./WelcomeText.module.scss";

export interface WelcomeTextProps {
  topText: string;
  bottomText?: string;
  textVariant: TextVariant;
}

enum TextVariant {
  Big = "big",
  Small = "small",
}

export const WelcomeText = ({
  topText,
  bottomText,
  textVariant,
}: WelcomeTextProps) => {
  const currentTextVariantStyle =
    textVariant === TextVariant.Big ? styles.text_big : styles.text_small;

  return (
    <section className={styles.weclomeTextWraper}>
      <span className={`${styles.text} ${currentTextVariantStyle}`}>
        {topText}
      </span>
      {bottomText && (
        <>
          <br />
          <span className={`${styles.text} ${currentTextVariantStyle}`}>
            {bottomText}
          </span>
        </>
      )}
    </section>
  );
};
