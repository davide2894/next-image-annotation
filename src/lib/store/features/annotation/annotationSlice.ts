import { AnnotationType } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

let annotations: AnnotationType[] = [];

const getAnnotationToUpdate = (
  state: { annotations: AnnotationType[] },
  annotationID: number
) =>
  state.annotations.find(
    (annotation: AnnotationType) => annotation.id === annotationID
  );

export const annotationSlice = createSlice({
  name: "annotationSlice",
  initialState: {
    annotations: annotations,
  },
  reducers: {
    enableEditingMode: (state, action) => {
      const targetAnnotation = getAnnotationToUpdate(state, action.payload);
      if (targetAnnotation) {
        targetAnnotation.isEditing = true;
      }
    },
    disableEditingMode: (state, action) => {
      const targetAnnotation = getAnnotationToUpdate(state, action.payload);
      if (targetAnnotation) {
        targetAnnotation.isEditing = false;
      }
    },
    addAnnotation: (state, action) => {
      state.annotations.push(action.payload);
    },
  },
});

export const { enableEditingMode, disableEditingMode, addAnnotation } =
  annotationSlice.actions;
export default annotationSlice.reducer;
