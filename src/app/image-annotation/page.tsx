"use client";
import ImageAnnotation from "@/components/imageAnnotation/ImageAnnotation";
import { store } from "@/lib/store/store";
import { Provider } from "react-redux";

function ImageAnnotationPage() {
  return (
    <Provider store={store}>
      <ImageAnnotation />
    </Provider>
  );
}

export default ImageAnnotationPage;
