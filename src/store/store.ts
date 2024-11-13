import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "../services/posts";
import userReducer from "./slices/userSlice";
import postDetailsSlice from "./slices/postDetailsSlice";
export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    user: userReducer,
    postDetails: postDetailsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
