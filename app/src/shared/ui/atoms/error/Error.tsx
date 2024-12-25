import React from "react";

import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

import styles from "./Error.module.scss";

export const Error = ({
  field,
}: {
  field: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}) => {
  return (
    //@ts-ignore
    <>{!!field && <span className={styles.error}>{field.message}</span>}</>
  );
};
