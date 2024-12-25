import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { chatReducer } from "@/entities/chat";
import { userReducer } from "@/entities/user";
import { modalReducer } from "@/entities/modal";

const setupStore = () =>
  configureStore({
    reducer: {
      chat: chatReducer,
      user: userReducer,
      modal: modalReducer,
    },
  });

const store = setupStore();

export const useAppDispatch = () => useDispatch<AppDispatch>();

type RootState = ReturnType<typeof store.getState>;
type AppStore = ReturnType<typeof setupStore>;
type AppDispatch = AppStore["dispatch"];

export { store, type RootState, type AppDispatch };
