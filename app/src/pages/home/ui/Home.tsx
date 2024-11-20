import React from "react";

import styles from "./Home.module.scss";

import { Button } from "@/shared/ui/atoms/button";
import { HealthIcon } from "@/shared/ui/atoms/healthIcon";
import { WelcomeText } from "@/shared/ui/atoms/welcomeText";
import { MessageIcon } from "@/shared/ui/atoms/messageIcon";
import { ReverseMessageIcon } from "@/shared/ui/atoms/reverseMessageIcon";

enum ButtonTheme {
  Dark = "dark",
  Light = "light",
}

enum TextVariant {
  Big = "big",
  Small = "small",
}

export const Home = () => {
  return (
    <div className={styles.homeGlobalWrapper}>
      <MessageIcon />
      <div className={styles.homeContentWrapper}>
        <section className={styles.iconTextWrapper}>
          <HealthIcon />
          <WelcomeText
            topText="Привет, человек!"
            bottomText="Я твой персональный ИИ фитнес-тренер"
            textVariant={TextVariant.Big}
          />
          <WelcomeText
            topText="Бесплатно создавай план питания, ежедневные тренировки, получай советы для здорового образа жизни за несколько минут с помощью искусственного интеллекта."
            textVariant={TextVariant.Small}
          />
        </section>
        <nav className={styles.buttonsWrapper}>
          <Button
            hrefTo="/authorization"
            text="Вход"
            theme={ButtonTheme.Dark}
          />
          <Button
            hrefTo="/registration"
            text="Регистрация"
            theme={ButtonTheme.Light}
          />
        </nav>
      </div>
      <ReverseMessageIcon />
      <section className={styles.chats} />
    </div>
  );
};
