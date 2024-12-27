import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/app/store";
// import { Chat, Message, IUser } from "@/entities/chat/model/types";
import { api } from "@/shared/api";
import { title } from "process";

export interface Message {
  id: number;
  isAi: boolean;
  content: string;
  createdAt: string;
}

interface Chat {
  id: string;
  createdAt: string;
  title: string;
  messages: Message[];
}

interface Chats {
  chats: Chat[];
  isLoading: boolean;
}

const initialState: Chats = {
  chats: [],
  isLoading: false,
};

export const getChats = createAsyncThunk(
  "chat/getChats",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.get("/chat");
      return data;
    } catch (e) {
      return rejectWithValue("Не удалось получить данные");
    }
  }
);

export const createChat = createAsyncThunk(
  "chat/createChat",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.post("/chat");
      return { ...data, messages: [] };
    } catch (e) {
      return rejectWithValue("Не удалось получить данные");
    }
  }
);

export const createChatWithTitle = createAsyncThunk(
  "chat/createChatWithTitle",
  async (message: string, { rejectWithValue }) => {
    try {
      const data = await api.post("/chat", JSON.stringify({ title: message }));
      return { ...data, messages: [] };
    } catch (e) {
      return rejectWithValue("Не удалось получить данные");
    }
  }
);

export const deleteChat = createAsyncThunk(
  "chat/deleteChat",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/chat/${id}`);
      return id;
    } catch (e) {
      return rejectWithValue("Не удалось получить данные");
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (
    { chatId, question }: { chatId: string; question: string },
    { rejectWithValue }
  ) => {
    try {
      await api.get(`/ai/get-answer/${chatId}/${question}`);
      const messagesList = await api.get(`/chat/${chatId}/messages`);
      return { chatId, question, messagesList };
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (chatId: string, { rejectWithValue }) => {
    try {
      const messagesList = await api.get(`/chat/${chatId}/messages`);
      return { chatId, messagesList };
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const chatReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    resetChat: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getChats.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.chats = action.payload;
      }
    ),
      builder.addCase(
        createChat.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.chats.unshift(action.payload);
        }
      ),
      builder.addCase(
        createChatWithTitle.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.chats.unshift(action.payload);
        }
      ),
      builder.addCase(
        deleteChat.fulfilled,
        (state: any, action: PayloadAction<string>) => {
          state.chats = state.chats.filter(
            (chat: any) => chat.id !== action.payload
          );
        }
      ),
      builder.addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      }),
      builder.addCase(sendMessage.fulfilled, (state, action) => {
        const { chatId, messagesList } = action.payload;
        const chatIdx = state.chats.findIndex((chat) => chat.id === chatId);

        if (chatIdx !== -1) {
          state.chats[chatIdx].messages = messagesList;
          state.isLoading = false;
        } else {
          console.error(`Чат с ID ${chatId} не найден.`);
        }
      }),
      builder.addCase(fetchMessages.fulfilled, (state, action) => {
        const { chatId, messagesList } = action.payload;
        const chatIdx = state.chats.findIndex((chat) => chat.id === chatId);

        if (chatIdx !== -1) {
          state.chats[chatIdx].messages = messagesList;
        } else {
          console.error(`Чат с ID ${chatId} не найден.`);
        }
      });
  },
});

export const selectChats = (state: RootState) => state.chat;

export const { resetChat } = chatReducer.actions;

export default chatReducer.reducer;
