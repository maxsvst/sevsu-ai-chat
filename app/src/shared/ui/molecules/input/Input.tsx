"use client";

import React, { useState } from "react";

import { FieldValues, UseFormRegisterReturn } from "react-hook-form";

import { ShowPassIcon } from "../../atoms/showPassIcon";
import { HidePassIcon } from "../../atoms/hidePassIcon/HidePassIcon";

import styles from "./Input.module.scss";

export const Input = ({
  type,
  text,
  register,
  placeholder,
  isError,
  onChangeHandler,
}: {
  type: string;
  text?: string | number;
  register?: UseFormRegisterReturn<FieldValues[keyof FieldValues]>;
  placeholder: string;
  isError?: boolean;
  onChangeHandler?: any;
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(false);

  return type === "password" ? (
    <div className={isError ? styles.inputWrapperError : styles.inputWrapper}>
      <input
        className={styles.passInput}
        placeholder={placeholder}
        type={isPasswordHidden ? "text" : "password"}
        {...register}
        value={text}
        onChange={onChangeHandler}
      />
      {isPasswordHidden ? (
        <HidePassIcon onClickHandler={setIsPasswordHidden} />
      ) : (
        <ShowPassIcon onClickHandler={setIsPasswordHidden} />
      )}
    </div>
  ) : (
    <div className={isError ? styles.inputWrapperError : styles.inputWrapper}>
      <input
        className={styles.emailInput}
        placeholder={placeholder}
        {...register}
        value={text}
        type={type}
        onChange={onChangeHandler}
      />
    </div>
  );
};
