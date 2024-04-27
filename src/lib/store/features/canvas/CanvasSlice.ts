import { createSlice } from "@reduxjs/toolkit";

export const canvasSlice = createSlice({
  name: "canvasSlice",
  initialState: {
    isDrawing: false,
  },
  reducers: {
    enableDrawing: (state: { isDrawing: boolean }) => {
      state.isDrawing = true;
    },
    disableDrawing: (state: { isDrawing: boolean }) => {
      state.isDrawing = false;
    },
  },
});

export const { enableDrawing, disableDrawing } = canvasSlice.actions;
export default canvasSlice.reducer;
