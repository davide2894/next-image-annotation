import Image from "next/image";
import styles from "./Canvas.module.css";
import { AnnotationType } from "../../lib/types";
import { useState } from "react";
import { normalizeCoordinates } from "../../lib/normalizeData";
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
      const x = evt.nativeEvent.offsetX / evt.currentTarget.clientWidth;
      const y = evt.nativeEvent.offsetY / evt.currentTarget.clientHeight;
      console.log({
        x,
        y,
        offsetX: evt.nativeEvent.offsetX,
        offsetY: evt.nativeEvent.offsetY,
      });
      setStartingPosition([x, y]);
      setIsDrawing(true);
    }
  }

  function onCanvasMouseMove(evt: React.MouseEvent<HTMLDivElement>) {
    if (isDrawing && (tool === RECTANGLE || tool === CIRCLE)) {
      const [startX, startY] = startingPosition;
      const currentX = evt.nativeEvent.offsetX / evt.currentTarget.clientWidth;
      const currentY = evt.nativeEvent.offsetY / evt.currentTarget.clientHeight;
      const [normalizedStartX, normalizedStartY] = normalizeCoordinates(
        startX,
        startY,
        IMG.WIDTH,
        IMG.HEIGHT
      );
      const [normalizedCurrentX, normalizedCurrentY] = normalizeCoordinates(
        currentX,
        currentY,
        IMG.WIDTH,
        IMG.HEIGHT
      );

      console.log({
        normalizedStartX,
        normalizedStartY,
        normalizedCurrentX,
        normalizedCurrentY,
      });

      const normalizedWidth = Math.abs(normalizedCurrentX - normalizedStartX);
      const normalizedHeight = Math.abs(normalizedCurrentY - normalizedStartY);

      if (tool === "rectangle") {
        let updatedAnnotation = {
          id: annotations.length + 1,
          shapeType: "rectangle",
          shapeData: {
            x: Math.min(normalizedStartX, normalizedCurrentX),
            y: Math.min(normalizedStartY, normalizedCurrentY),
            normalizedWidth,
            normalizedHeight,
          },
          label: "",
          editing: false,
        };
        setDrawingAnnotation(updatedAnnotation);
      } else if (tool === "circle") {
        // const centerX = (x1 + x2) / ;
        // const centerY = (y1 + y2) / 2;
        // const radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2;
        // let updatedAnnotation = {
        //   id: annotations.length + 1,
        //   shapeType: "circle",
        //   shapeData: { centerX, centerY, radius },
        //   label: "",
        //   editing: false,2
        // };
        // setDrawingAnnotation(updatedAnnotation);
      }
    }
  }

  function onCanvasMouseUp() {
    if (drawingAnnotation) {
      setAnnotations([...annotations, drawingAnnotation]);
      setDrawingAnnotation(null);
    }
    setIsDrawing(false);
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
