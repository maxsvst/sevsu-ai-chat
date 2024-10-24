"use client";

import React, { useState } from "react";
import styles from "./Input.module.scss";
import { ShowPassIcon } from "../showPassIcon";
import { HidePassIcon } from "../hidePassIcon/HidePassIcon";
import { register } from "module";
import { FieldValues, UseFormRegisterReturn } from "react-hook-form";

export const Input = ({
  type,
  text,
  register,
  placeholder,
}: {
  type: string;
  text?: string;
  register?: UseFormRegisterReturn<FieldValues[keyof FieldValues]>;
  placeholder: string;
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  return type === "password" ? (
    <div className={styles.inputWrapper}>
      <input
        className={styles.passInput}
        placeholder={placeholder}
        type={isPasswordHidden ? "password" : "text"}
        {...register}
        value={text}
      />
      {isPasswordHidden ? (
        <ShowPassIcon onClickHandler={setIsPasswordHidden} />
      ) : (
        <HidePassIcon onClickHandler={setIsPasswordHidden} />
      )}
    </div>
  ) : (
    <div className={styles.inputWrapper}>
      <input
        className={styles.emailInput}
        placeholder={placeholder}
        {...register}
        value={text}
        type={type}
      />
    </div>
  );
};
