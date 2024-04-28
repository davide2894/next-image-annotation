import { createSlice } from "@reduxjs/toolkit";

export const canvasSlice = createSlice({
  name: "canvasSlice",
  initialState: {
    isDrawing: false,
    tool: "",
  },
  reducers: {
    enableDrawing: (state: { isDrawing: boolean }) => {
      state.isDrawing = true;
    },
    disableDrawing: (state: { isDrawing: boolean }) => {
      state.isDrawing = false;
    },
    setTool: (state, action) => {
      state.tool = action.payload;
    },
    resetToolBar: (state) => {
      state.tool = "";
      state.isDrawing = false;
    },
  },
});

export const { enableDrawing, disableDrawing, setTool, resetToolBar } =
  canvasSlice.actions;

export default canvasSlice.reducer;
