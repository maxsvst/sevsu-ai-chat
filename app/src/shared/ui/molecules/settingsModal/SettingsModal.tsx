"use client";

import React, { useEffect } from "react";

import { z } from "zod";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { editUser, getUser, selectUser } from "@/entities/user/model/userSlice";
import { setSettingsVisibility } from "@/entities/modal/model/modalSlice";
import { useAppDispatch } from "@/app/store";

import { Input } from "../input";
import { WithModal } from "@/entities/user/ui";
import { Error } from "../../atoms/error/Error";
import { CloseIcon } from "../../atoms/closeIcon";
import { EditProfileFormDataSchema } from "@/shared/model/editProfileDataSchema";

import styles from "./SettingsModal.module.scss";

type Inputs = z.infer<typeof EditProfileFormDataSchema>;
type PartialInputs = Partial<Inputs>;

const SettingsModal = () => {
  const dispatch = useAppDispatch();
  const { fullName, email, weight, height } = useSelector(selectUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    // resolver: zodResolver(EditProfileFormDataSchema.optional()),
  });

  // console.log(fullName, email, weight, height);

  useEffect(() => {
    (async () => await dispatch(getUser()).unwrap())();
  }, []);

  // console.log("errors", errors);

  const processForm: SubmitHandler<Inputs> = async (data: Inputs) => {
    const { fullName, email, weight, height, password } = data;
    const payload: PartialInputs = {};

    if (!!fullName?.trim()) {
      payload.fullName = fullName;
    }
    if (!!email?.trim()) {
      payload.email = email;
    }
    if (!!weight) {
      payload.weight = weight;
    }
    if (!!height) {
      payload.height = height;
    }
    if (!!password) {
      payload.password = password;
    }

    await dispatch(editUser(payload)).unwrap();
    dispatch(setSettingsVisibility(false));
  };

  return (
    <form
      className={styles.settingsModalWrapper}
      onSubmit={handleSubmit(processForm)}
    >
      <CloseIcon clickHandler={() => dispatch(setSettingsVisibility(false))} />
      <div className={styles.settingsModalTitle}>Настройки</div>
      <div className={styles.settingsModalForm}>
        <div style={{ width: "100%" }}>
          <Input
            type="text"
            placeholder={fullName || "Имя"}
            register={register("fullName")}
            isError={!!errors.fullName}
          />
          <Error field={errors.fullName} />
        </div>
        <div style={{ width: "100%" }}>
          <Input
            type="text"
            placeholder={email || "E-mail"}
            register={register("email")}
            isError={!!errors.email}
          />
          <Error field={errors.email} />
        </div>
        <hr className={styles.settingsModalDivider} />
        <div style={{ width: "100%" }}>
          <Input
            type="number"
            placeholder={String(height) || "Рост"}
            register={register("height")}
            isError={!!errors.height}
          />
          <Error field={errors.height} />
        </div>
        <div style={{ width: "100%" }}>
          <Input
            type="number"
            placeholder={String(weight) || "Вес"}
            register={register("weight")}
            isError={!!errors.weight}
          />
          <Error field={errors.weight} />
        </div>
        <hr className={styles.settingsModalDivider} />
        <div style={{ width: "100%" }}>
          <Input
            type="password"
            placeholder="Новый пароль"
            register={register("password")}
            isError={!!errors.password}
          />
          <Error field={errors.password} />
        </div>
      </div>
      <button className={styles.settingsModalSaveBtn} type="submit">
        Сохранить
      </button>
    </form>
  );
};

export default WithModal(SettingsModal, "settings");
