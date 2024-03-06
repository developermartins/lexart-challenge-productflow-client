import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  editorContent: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    makeLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    makeLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    setEditorContent: (state, action) => {
      state.editorContent = action.payload.editorContent;
    },

    cleanEditorContent: (state) => {
      state.editorContent = null;
    },
  },
});

export const {
  makeLogin,
  makeLogout,
  setEditorContent,
  cleanEditorContent
} = authSlice.actions;

export default authSlice.reducer;
