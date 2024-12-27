import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/app/store";
// import { Chat, Message, IUser } from "@/entities/chat/model/types";
import { api, ApiResponse } from "@/shared/api";

interface LoginResDto extends ApiResponse {
  backendTokens: {
    accessToken: string;
    refreshToken: string;
  };
}
interface LoginReqDto {
  email: string;
  password: string;
}

type User = {
  id: string | null;
  fullName: string | null;
  email: string | null;
  weight: number | null;
  height: number | null;
};

interface AuthState {
  user: User;
  accessToken: string | null;
  refreshToken: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | any;
}

const initialState: AuthState = {
  user: {
    id: null,
    fullName: null,
    email: null,
    height: null,
    weight: null,
  },
  accessToken: null,
  refreshToken: null,
  status: "idle",
  error: null,
};

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (credentials: any, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/auth/signup", JSON.stringify(credentials));
      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: any, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", JSON.stringify(credentials));
      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getuser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/me");
      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const editUser = createAsyncThunk(
  "auth/editUser",
  async (credentials: any, { rejectWithValue }) => {
    try {
      const res = await api.patch(
        "/auth/edit-profile",
        JSON.stringify(credentials)
      );
      return res;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    resetUser: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.accessToken = action.payload.backendTokens.accessToken;
      state.refreshToken = action.payload.backendTokens.refreshToken;
      localStorage.setItem("accessToken", state.accessToken!);
      localStorage.setItem("refreshToken", state.refreshToken!);
    }),
      builder.addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      }),
      builder.addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
      }),
      builder.addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const selectUser = (state: RootState) => state.user.user;
export const selectStatus = (state: RootState) => state.user.status;

export const { logout, resetUser } = userReducer.actions;

export default userReducer.reducer;
