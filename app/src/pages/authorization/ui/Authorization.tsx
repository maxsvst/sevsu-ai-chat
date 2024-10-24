import { BackButton } from "@/shared/ui/backButton";
import React from "react";
import styles from "./Authorization.module.scss";
import { LoginForm } from "@/features/authorization";

export const Authorization = () => {
  return (
    <div className={styles.authWrapper}>
      <BackButton />
      <LoginForm />
    </div>
  );
};
