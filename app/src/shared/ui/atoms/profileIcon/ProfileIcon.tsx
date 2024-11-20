import React from "react";

export const ProfileIcon = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_b_135_495)">
        <rect width="32" height="32" rx="8" fill="white" fillOpacity="0.3" />
        <path
          d="M16 6C13.2385 6 11 8.2385 11 11C11 13.7615 13.2385 16 16 16C18.7615 16 21 13.7615 21 11C21 8.2385 18.7615 6 16 6ZM10.125 18C9.5615 18 9.02108 18.2238 8.62257 18.6222C8.22407 19.0206 8.00013 19.561 8 20.1245V20.5C8 22.3775 8.971 23.7835 10.46 24.69C11.925 25.5815 13.893 26 16 26C18.107 26 20.075 25.5815 21.54 24.69C23.029 23.7835 24 22.3775 24 20.5V20.1245C23.9999 19.561 23.7759 19.0206 23.3774 18.6222C22.9789 18.2238 22.4385 18 21.875 18H10.125Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_135_495"
          x="-132.8"
          y="-132.8"
          width="297.6"
          height="297.6"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="66.4" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_135_495"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_135_495"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
