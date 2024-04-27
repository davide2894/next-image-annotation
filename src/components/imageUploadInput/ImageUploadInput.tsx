import { ChangeEvent } from "react";

interface ImageUploadInputProps {
  handleImageUpload: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function ImageUploadInput({ handleImageUpload }: ImageUploadInputProps) {
  return (
    <>
      <p>Upload an image to start annotation</p>
      <input type="file" accept="image" onChange={handleImageUpload} />
    </>
  );
}

export default ImageUploadInput;
