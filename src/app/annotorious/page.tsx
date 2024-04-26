"use client";
import { Annotorious, ImageAnnotator } from "@annotorious/react";
import "@annotorious/react/annotorious-react.css";
import { useState } from "react";

function AnnotoriousPage() {
  const [image, setImage] = useState<File | null>(null);

  function handleImageUpload(evt: React.ChangeEvent<HTMLInputElement>) {
    const file = evt.target.files?.[0];
    if (file) {
      setImage(file);
    }
  }
  return (
    <Annotorious>
      <ImageAnnotator>
        <img
          src="https://ca-times.brightspotcdn.com/dims4/default/b8f0f5a/2147483647/strip/true/crop/6720x4480+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F88%2Fd6%2F4dae1be041d78a2dec325fd81692%2Fla-photos-1staff-793492-me-return-of-traffic-01-cmc.jpg"
          alt="Example"
        />
      </ImageAnnotator>
    </Annotorious>
  );
}
export default AnnotoriousPage;
