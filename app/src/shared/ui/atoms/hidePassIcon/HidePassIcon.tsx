import React, { Dispatch, SetStateAction } from "react";
import styles from "./HidePassIcon.module.scss";

export const HidePassIcon = ({
  onClickHandler,
}: {
  onClickHandler: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <svg
      className={styles.icon}
      onClick={() => onClickHandler(false)}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.25 21.5C20.1515 21.5001 20.0539 21.4808 19.9629 21.4431C19.8719 21.4053 19.7893 21.3499 19.7198 21.2801L3.21983 4.78013C3.08512 4.63833 3.01112 4.44952 3.01363 4.25395C3.01613 4.05838 3.09494 3.87152 3.23324 3.73322C3.37154 3.59492 3.55839 3.51612 3.75396 3.51361C3.94954 3.51111 4.13835 3.5851 4.28014 3.71982L20.7801 20.2198C20.885 20.3247 20.9563 20.4583 20.9852 20.6037C21.0142 20.7492 20.9993 20.8999 20.9426 21.0369C20.8858 21.1739 20.7898 21.291 20.6665 21.3735C20.5432 21.4559 20.3983 21.4999 20.25 21.5ZM11.9841 18.5C10.0392 18.5 8.16374 17.9243 6.40968 16.789C4.81265 15.7578 3.37499 14.2808 2.25186 12.5234V12.5197C3.18655 11.1804 4.2103 10.0479 5.30999 9.13482C5.31994 9.1265 5.32805 9.11621 5.33382 9.1046C5.33959 9.09298 5.34289 9.0803 5.3435 9.06735C5.34412 9.0544 5.34204 9.04146 5.3374 9.02935C5.33276 9.01724 5.32566 9.00623 5.31655 8.997L4.3828 8.06466C4.36621 8.04793 4.34392 8.03806 4.32039 8.03702C4.29685 8.03598 4.27378 8.04384 4.25577 8.05903C3.08765 9.04341 2.00343 10.2509 1.01765 11.6647C0.848044 11.9081 0.754638 12.1964 0.749297 12.4931C0.743955 12.7897 0.826918 13.0812 0.987645 13.3306C2.22561 15.2679 3.8189 16.8997 5.59452 18.0486C7.59374 19.3437 9.7453 20 11.9841 20C13.1925 19.9962 14.3923 19.7971 15.5372 19.4103C15.5523 19.4052 15.5658 19.3963 15.5765 19.3845C15.5872 19.3726 15.5948 19.3583 15.5984 19.3427C15.602 19.3272 15.6016 19.311 15.5972 19.2957C15.5928 19.2803 15.5846 19.2664 15.5733 19.2551L14.5617 18.2436C14.5384 18.2208 14.5096 18.2046 14.4781 18.1964C14.4467 18.1881 14.4136 18.1883 14.3822 18.1967C13.5988 18.3984 12.793 18.5003 11.9841 18.5ZM23.0081 11.6843C21.7678 9.76622 20.1586 8.13685 18.3548 6.972C16.3594 5.682 14.1562 4.99997 11.9841 4.99997C10.7884 5.00206 9.60171 5.20537 8.47358 5.60138C8.45855 5.60661 8.4451 5.61558 8.43449 5.62745C8.42389 5.63931 8.41648 5.65368 8.41296 5.6692C8.40944 5.68472 8.40994 5.70089 8.41439 5.71616C8.41885 5.73144 8.42712 5.74534 8.43843 5.75653L9.44858 6.76669C9.4721 6.78981 9.5013 6.80631 9.53323 6.81454C9.56516 6.82277 9.5987 6.82244 9.63046 6.81357C10.3978 6.60598 11.1891 6.50054 11.9841 6.49997C13.8914 6.49997 15.7612 7.08263 17.5411 8.23435C19.1681 9.28435 20.6226 10.76 21.7486 12.5C21.7494 12.501 21.7499 12.5024 21.7499 12.5037C21.7499 12.5051 21.7494 12.5064 21.7486 12.5075C20.9313 13.7942 19.9171 14.9446 18.743 15.9167C18.7329 15.925 18.7247 15.9353 18.7188 15.9469C18.713 15.9585 18.7096 15.9713 18.7089 15.9843C18.7083 15.9973 18.7103 16.0103 18.715 16.0225C18.7196 16.0346 18.7268 16.0457 18.7359 16.055L19.6687 16.9873C19.6852 17.004 19.7074 17.0139 19.7308 17.015C19.7543 17.0161 19.7773 17.0084 19.7953 16.9934C21.0487 15.938 22.1337 14.6975 23.0128 13.3147C23.1682 13.071 23.2503 12.7878 23.2495 12.4988C23.2487 12.2098 23.1649 11.9271 23.0081 11.6843Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.0175 11.6645C4.0675 7.29251 8.02216 5 11.984 5C16.637 5 20.6452 8.03129 23.01 11.6836L23.0111 11.6853C23.1676 11.9285 23.2508 12.2115 23.2508 12.5007C23.2508 12.7893 23.1679 13.0718 23.012 13.3146C20.6493 17.014 16.667 20 11.984 20C7.2512 20 3.34571 17.0203 0.988794 13.3317C0.828649 13.083 0.745588 12.7925 0.750082 12.4968C0.754587 12.2002 0.846884 11.9117 1.01531 11.6676L1.01749 11.6645L1.0175 11.6645ZM2.24991 12.5196L2.252 12.5228L2.25199 12.5228C4.42892 15.9304 7.91804 18.5 11.984 18.5C16.0044 18.5 19.5688 15.9195 21.7483 12.5065L21.7498 12.5043C21.7504 12.5032 21.7508 12.502 21.7508 12.5007C21.7508 12.4995 21.7505 12.4983 21.7498 12.4973C19.562 9.11913 15.9685 6.5 11.984 6.5C8.63986 6.5 5.10016 8.43555 2.24991 12.5196Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 9.5C11.8565 9.5 11.7157 9.51002 11.5783 9.52931C10.2595 9.71439 9.21439 10.7595 9.02931 12.0783C9.01002 12.2157 9 12.3565 9 12.5C9 14.1569 10.3431 15.5 12 15.5C12.1435 15.5 12.2843 15.49 12.4217 15.4707C13.7405 15.2856 14.7856 14.2405 14.9707 12.9217C14.99 12.7843 15 12.6435 15 12.5C15 10.8431 13.6569 9.5 12 9.5ZM11.3699 8.04387C11.5761 8.01492 11.7865 8 12 8C14.4853 8 16.5 10.0147 16.5 12.5C16.5 12.7135 16.4851 12.9239 16.4561 13.1301C16.178 15.1118 14.6118 16.678 12.6301 16.9561C12.4239 16.9851 12.2135 17 12 17C9.51472 17 7.5 14.9853 7.5 12.5C7.5 12.2865 7.51492 12.0761 7.54387 11.8699C7.82198 9.88816 9.38816 8.32198 11.3699 8.04387Z"
        fill="white"
      />
    </svg>
  );
};
