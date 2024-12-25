"use client";

import { createPortal } from "react-dom";

export const WithModal = (Component: any, id: string) => (props: any) => {
  return createPortal(<Component {...props} />, document.getElementById(id)!);
};
