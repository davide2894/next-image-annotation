import Image from "next/image";
import styles from "./Canvas.module.css";
import { AnnotationType } from "../../types";
import { useState } from "react";
import { normalizeCoordinates } from "../lib/normalizeData";
import Annotation from "../annotation/Annotation";

interface CanvasProps {
  image: File;
  tool: string;
}

type XCoordinate = number;
type YCoordinate = number;

type CoordinatePoint = [XCoordinate, YCoordinate];

const RECTANGLE = "rectangle";
const CIRCLE = "circle";
const EDIT = "edit";
const IMG = {
  WIDTH: 600,
  HEIGHT: 600,
};

function Canvas({ image, tool }: CanvasProps) {
  const [annotations, setAnnotations] = useState<AnnotationType[]>([]);
  const [drawingAnnotation, setDrawingAnnotation] =
    useState<AnnotationType | null>(null);
  const [startPosition, setStartPosition] = useState<CoordinatePoint>([0, 0]);
  const [endPosition, setEndPosition] = useState<CoordinatePoint>([0, 0]);

  function onCanvasMouseDown(evt: React.MouseEvent<HTMLDivElement>) {
    if (tool === RECTANGLE || tool === CIRCLE) {
      const { offsetX, offsetY } = evt.nativeEvent;
      const normalizedCoordinatePoint = normalizeCoordinates(
        offsetX,
        offsetY,
        IMG.WIDTH,
        IMG.HEIGHT
      );
      const [x, y] = normalizedCoordinatePoint;
      let newAnnotation: AnnotationType = {};

      if (tool === "rectangle") {
        newAnnotation = {
          id: annotations.length + 1,
          shapeType: "rectangle",
          shapeData: {
            x,
            y,
            width: 0.1,
            height: 0.1,
          },
          label: "",
          editing: false,
        };
      } else if (tool === "circle") {
        const centerX = x;
        const centerY = y;
        const radius = Math.sqrt(Math.pow(0.1, 2) + Math.pow(0.1, 2)) / 2;
        newAnnotation = {
          id: annotations.length + 1,
          shapeType: "circle",
          shapeData: { centerX, centerY, radius },
          label: "",
          editing: false,
        };
      }
      setDrawingAnnotation(newAnnotation);
    }
  }

  function onCanvasMouseMove(evt: React.MouseEvent<HTMLDivElement>) {
    let updatedAnnotation: AnnotationType;

    if (drawingAnnotation && (tool === RECTANGLE || tool === CIRCLE)) {
      const { offsetX, offsetY } = evt.nativeEvent;
      const normalizedCoordinatePoint = normalizeCoordinates(
        offsetX,
        offsetY,
        IMG.WIDTH,
        IMG.HEIGHT
      );
      const [x1, y1] = startPosition;
      const [x2, y2] = normalizedCoordinatePoint;
      const width = Math.abs(x2 - x1);
      const height = Math.abs(y2 - y1);

      if (tool === "rectangle") {
        updatedAnnotation = {
          id: annotations.length + 1,
          shapeType: "rectangle",
          shapeData: {
            x: Math.min(x1, x2),
            y: Math.min(y1, y2),
            width,
            height,
          },
          label: "",
          editing: false,
        };
      } else if (tool === "circle") {
        const centerX = (x1 + x2) / 2;
        const centerY = (y1 + y2) / 2;
        const radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2;
        updatedAnnotation = {
          id: annotations.length + 1,
          shapeType: "circle",
          shapeData: { centerX, centerY, radius },
          label: "",
          editing: false,
        };
      }
      setDrawingAnnotation(updatedAnnotation);
    }
  }

  function onCanvasMouseUp() {
    if (drawingAnnotation) {
      setAnnotations([...annotations, drawingAnnotation]);
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
