"use client";
import ImageUploader from "@/components/imageUploader/ImageUploader";
import Toolbar from "@/components/toolbar/Toolbar";
import { IMG } from "@/lib/constants";
import { Annotorious, ImageAnnotator } from "@annotorious/react";
import "@annotorious/react/annotorious-react.css";
import Image from "next/image";
import { useState } from "react";

function WithLibrariesPage() {
  const [image, setImage] = useState<File | null>(null);
  const [tool, setTool] = useState("");

  function onToolButtonClick(toolString: string) {
    setTool(toolString);
  }

  function handleImageUpload(evt: React.ChangeEvent<HTMLInputElement>) {
    const file = evt.target.files?.[0];
    if (file) {
      setImage(file);
    }
  }
  return (
    <div>
      {image ? (
        <>
          <Annotorious>
            <ImageAnnotator
              drawingMode="drag"
              drawingEnabled={tool ? true : false}>
              <Image
                src={URL.createObjectURL(image)}
                alt="Image to annotate"
                width={IMG.WIDTH}
                height={IMG.HEIGHT}
              />
            </ImageAnnotator>
          </Annotorious>
          <Toolbar onToolButtonClick={onToolButtonClick} />
        </>
      ) : (
        <ImageUploader handleImageUpload={handleImageUpload} />
      )}
    </div>
  );
}
export default WithLibrariesPage;
