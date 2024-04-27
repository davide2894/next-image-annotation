import Image from "next/image";
import styles from "./Canvas.module.css";
import { AnnotationType } from "../../lib/types";
import { useState } from "react";
import Annotation from "../annotation/Annotation";
import { RECTANGLE, CIRCLE, IMG } from "@/lib/constants";

interface CanvasProps {
  image: File;
  tool: string;
}

type XCoordinate = number;
type YCoordinate = number;

type CoordinatePoint = [XCoordinate, YCoordinate];

function Canvas({ image, tool }: CanvasProps) {
  const [annotations, setAnnotations] = useState<AnnotationType[]>([]);
  const [drawingAnnotation, setDrawingAnnotation] =
    useState<AnnotationType | null>(null);
  const [startingPosition, setStartingPosition] = useState<CoordinatePoint>([
    0, 0,
  ]);
  const [endPosition, setEndPosition] = useState<CoordinatePoint>([0, 0]);
  const [isDrawing, setIsDrawing] = useState(false);

  function onCanvasMouseDown(evt: React.MouseEvent<HTMLDivElement>) {
    if (tool === RECTANGLE || tool === CIRCLE) {
      const rect = evt.currentTarget.getBoundingClientRect();
      const x = (evt.clientX - rect.left) / rect.width;
      const y = (evt.clientY - rect.top) / rect.height;
      const newAnnotation = {
        id: annotations.length + 1,
        shapeType: tool === RECTANGLE ? "rectangle" : "circle",
        shapeData: {
          x,
          y,
          width: 0,
          height: 0,
        },
        // tool === RECTANGLE
        //   ? { x, y, width: 0.1, height: 0 }
        //   : { centerX: x, centerY: y, radius: 0.05 },
        label: "New Annotation",
        editing: false,
      };
      setDrawingAnnotation(newAnnotation);
    }
  }

  function onCanvasMouseMove(evt: React.MouseEvent<HTMLDivElement>) {
    if (drawingAnnotation) {
      const rect = evt.currentTarget.getBoundingClientRect();
      const x = (evt.clientX - rect.left) / rect.width;
      const y = (evt.clientY - rect.top) / rect.height;
      const newShapeData = { ...drawingAnnotation.shapeData };
      if (drawingAnnotation.shapeType === "rectangle") {
        newShapeData.width = x - drawingAnnotation.shapeData.x;
        newShapeData.height = y - drawingAnnotation.shapeData.y;
      } else {
        // newShapeData.radius = Math.sqrt(
        //   Math.pow(x - drawingAnnotation.shapeData.centerX, 2) +
        //     Math.pow(y - drawingAnnotation.shapeData.centerY, 2)
        // );
      }
      const updatedAnnotation = {
        ...drawingAnnotation,
        shapeData: newShapeData,
      };
      setDrawingAnnotation(updatedAnnotation);
    }
  }

  function onCanvasMouseUp() {
    if (drawingAnnotation) {
      const updatedAnnotations = [...annotations, drawingAnnotation];
      setAnnotations(updatedAnnotations);
      setDrawingAnnotation(null);
    }
  }

  return (
    <div
      className={styles.canvas}
      onMouseDown={onCanvasMouseDown}
      onMouseUp={onCanvasMouseUp}
      onMouseMove={onCanvasMouseMove}>
      <Image
        src={URL.createObjectURL(image)}
        alt="Image to annotate"
        width={IMG.WIDTH}
        height={IMG.HEIGHT}
        className={styles.img}
      />

      {drawingAnnotation ? (
        <Annotation annotation={drawingAnnotation} />
      ) : (
        annotations.map((annotation) => {
          return <Annotation key={annotation.id} annotation={annotation} />;
        })
      )}
    </div>
  );
}

export default Canvas;
