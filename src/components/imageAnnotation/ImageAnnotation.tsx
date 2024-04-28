"use client";
import { useState } from "react";
import Canvas from "../canvas/Canvas";
import styles from "./ImageAnnotation.module.css";
import ImageUploadInput from "../imageUploadInput/ImageUploadInput";
import { useDispatch } from "react-redux";
import { enableDrawing } from "@/lib/store/features/canvas/canvasSlice";
import Toolbar from "../toolbar/Toolbar";

function ImageAnnotation() {
  const [image, setImage] = useState<File | null>(null);
  const [tool, setTool] = useState("");
  const dispatch = useDispatch();

  function handleImageUpload(evt: React.ChangeEvent<HTMLInputElement>) {
    const file = evt.target.files?.[0];
    if (file) {
      setImage(file);
    }
  }

  function onToolButtonClick(toolString: string) {
    setTool(toolString);
    dispatch(enableDrawing());
  }

  return (
    <div className={styles.imageAnnotation}>
      {image ? (
        <>
          <Canvas image={image} />
          <Toolbar />
        </>
      ) : (
        <ImageUploadInput handleImageUpload={handleImageUpload} />
      )}
    </div>
  );
}

export default ImageAnnotation;
