"use client";
import ImageAnnotation from "@/components/imageAnnotation/ImageAnnotation";
import { store } from "@/lib/store/store";
import { Provider } from "react-redux";

function FromScratchPage() {
  return (
    <Provider store={store}>
      <ImageAnnotation />
    </Provider>
  );
}

export default FromScratchPage;
