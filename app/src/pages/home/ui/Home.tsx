import { Button } from "@/shared/ui/button";
import { HealthIcon } from "@/shared/ui/healthIcon";
import { WelcomeText } from "@/shared/ui/welcomeText";
import React from "react";
import styles from "./Home.module.scss";
import { MessageIcon } from "@/shared/ui/messageIcon";
import { ReverseMessageIcon } from "@/shared/ui/reverseMessageIcon";

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
        <section className={styles.buttonsWrapper}>
          <Button text="Вход" theme={ButtonTheme.Dark} />
          <Button text="Регистрация" theme={ButtonTheme.Light} />
        </section>
      </div>
      <ReverseMessageIcon />
      <div className={styles.chats} />
    </div>
  );
};
