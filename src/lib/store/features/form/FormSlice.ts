import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "formSlice",
  initialState: {
    show: false,
  },
  reducers: {
    showForm: (state: { show: boolean }) => {
      state.show = true;
    },
    hideForm: (state: { show: boolean }) => {
      state.show = false;
    },
  },
});

export const { showForm, hideForm } = formSlice.actions;
export default formSlice.reducer;
