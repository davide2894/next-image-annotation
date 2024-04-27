"use client";
import { useState } from "react";
import Canvas from "../canvas/Canvas";
import Toolbar from "../toolbar/Toolbar";
import styles from "./ImageAnnotation.module.css";
import ImageUploadInput from "../imageUploadInput/ImageUploadInput";

function ImageAnnotation() {
  const [image, setImage] = useState<File | null>(null);
  const [tool, setTool] = useState("");

  function handleImageUpload(evt: React.ChangeEvent<HTMLInputElement>) {
    const file = evt.target.files?.[0];
    if (file) {
      setImage(file);
    }
  }

  function onToolButtonClick(toolString: string) {
    setTool(toolString);
  }

  return (
    <div className={styles.imageAnnotation}>
      {image ? (
        <>
          <Canvas image={image} tool={tool} />
          <Toolbar onToolButtonClick={onToolButtonClick} />
        </>
      ) : (
        <ImageUploadInput handleImageUpload={handleImageUpload} />
      )}
    </div>
  );
}

export default ImageAnnotation;
