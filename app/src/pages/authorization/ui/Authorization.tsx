import React from "react";

import styles from "./Authorization.module.scss";

import { LoginForm } from "@/features/authorization";
import { BackButton } from "@/shared/ui/atoms/backButton";

export const Authorization = () => {
  return (
    <div className={styles.authWrapper}>
      <BackButton />
      <LoginForm />
    </div>
  );
};
