import { AnnotationType } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

let annotations: AnnotationType[] = [];

// const getAnnotationToUpdate = (
//   state: WritableDraft<{ annotations: AnnotationType[] }>,
//   annotationID: number
// ) =>
//   state.annotations.find(
//     (annotation: AnnotationType) => annotation.id === annotationID
//   );

export const annotationSlice = createSlice({
  name: "annotationSlice",
  initialState: {
    annotations: annotations,
  },
  reducers: {
    toggleEditingMode: (state, action) => {
      const targetAnnotation = state.annotations.find(
        (annotation) => annotation.id === action.payload
      );
      if (targetAnnotation) {
        targetAnnotation.isEditing = !targetAnnotation.isEditing;
      }
    },
    addAnnotation: (state, action) => {
      state.annotations.push(action.payload);
    },
  },
});

export const { toggleEditingMode, addAnnotation } = annotationSlice.actions;
export default annotationSlice.reducer;
