import { ChangeEvent } from "react";
import styles from "./ImageUploader.module.css";

interface ImageUploaderProps {
  handleImageUpload: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function ImageUploader({ handleImageUpload }: ImageUploaderProps) {
  return (
    <div className={styles.imageUploader}>
      <p className={styles.p}>Upload an image to start annotation</p>
      <input type="file" accept="image" onChange={handleImageUpload} />
    </div>
  );
}

export default ImageUploader;
