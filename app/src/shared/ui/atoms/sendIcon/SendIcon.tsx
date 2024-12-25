import React from "react";

import style from "./SendIcon.module.scss";

export const SendIcon = ({ onClickHandler }: any) => {
  return (
    <button className={style.buttonWrapper} onClick={() => onClickHandler()}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="16" fill="#131313" />
        <path
          d="M21.3602 9.54864C22.0376 9.31197 22.6882 9.96264 22.4516 10.64L18.5016 21.9266C18.2449 22.6586 17.2249 22.7 16.9102 21.9913L15.0042 17.7033L17.6869 15.02C17.7752 14.9252 17.8233 14.7998 17.821 14.6703C17.8187 14.5408 17.7663 14.4172 17.6746 14.3256C17.583 14.2339 17.4594 14.1815 17.3299 14.1792C17.2004 14.1769 17.075 14.225 16.9802 14.3133L14.2969 16.996L10.0089 15.09C9.30023 14.7746 9.34223 13.7553 10.0736 13.4986L21.3602 9.54864Z"
          fill="white"
        />
      </svg>
    </button>
  );
};
