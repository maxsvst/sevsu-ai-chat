"use client";

import { createPortal } from "react-dom";

export const WithUserModal = (Component: any) => (props: any) => {
  return createPortal(
    <Component {...props} />,
    document.getElementById("settings")!
  );
};
