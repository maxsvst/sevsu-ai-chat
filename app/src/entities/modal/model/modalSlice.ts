import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/app/store";

interface ModalState {
  isMenuVisible: boolean;
  isSettingsVisible: boolean;
  isProfileVisible: boolean;
  isQuitVisible: boolean;
}

const initialState: ModalState = {
  isMenuVisible: false,
  isSettingsVisible: false,
  isProfileVisible: false,
  isQuitVisible: false,
};

const modalReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setMenuVisibility: (state: ModalState, action: PayloadAction<boolean>) => {
      state.isMenuVisible = action.payload;
    },
    setSettingsVisibility: (
      state: ModalState,
      action: PayloadAction<boolean>
    ) => {
      state.isSettingsVisible = action.payload;
    },
    setProfileVisibility: (
      state: ModalState,
      action: PayloadAction<boolean>
    ) => {
      state.isProfileVisible = action.payload;
    },
    setQuitVisibility: (state: ModalState, action: PayloadAction<boolean>) => {
      state.isQuitVisible = action.payload;
    },
  },
});

export const selectModal = (state: RootState) => state.modal;

export const {
  setMenuVisibility,
  setSettingsVisibility,
  setProfileVisibility,
  setQuitVisibility,
} = modalReducer.actions;

export default modalReducer.reducer;
