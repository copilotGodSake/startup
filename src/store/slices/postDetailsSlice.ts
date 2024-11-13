import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Post } from "../../types/Post";

type PostDetailsState = {
  post: Post | null;
  comments: any[];
  isLoading: boolean;
  error: string | null;
};

const initialState: PostDetailsState = {
  post: null,
  comments: [],
  isLoading: false,
  error: null,
};

export const fetchPostDetails = createAsyncThunk(
  "postDetails/fetchPostDetails",
  async (postId: string) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    const post = await response.json();
    return post;
  }
);
export const fetchComments = createAsyncThunk(
  "postDetails/fetchComments",
  async (postId: string) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const comments = await response.json();
    return comments;
  }
);

const postDetailsSlice = createSlice({
  name: "postDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPostDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch post details";
      })
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch comments";
      });
  },
});

export default postDetailsSlice.reducer;
