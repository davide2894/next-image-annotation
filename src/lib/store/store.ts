import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./features/canvas/canvasSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import annotationReducer from "./features/annotation/annotationSlice";

const logger = (store: any) => (next: any) => (action: any) => {
  console.log("middleware --> dispatching", action);
  console.log(action.payload);
  let result = next(action);
  console.log("middleware --> next state", store.getState());
  return result;
};

export const store = configureStore({
  reducer: {
    canvasReducer,
    annotationReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
