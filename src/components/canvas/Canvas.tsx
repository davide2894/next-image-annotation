import Image from "next/image";
import styles from "./Canvas.module.css";
import { AnnotationType } from "../../lib/types";
import { useState } from "react";
import Annotation from "../annotation/Annotation";
import { RECTANGLE, CIRCLE, IMG } from "@/lib/constants";
import { useDispatch } from "react-redux";
import { showForm } from "@/lib/store/features/form/FormSlice";
import { useAppSelector } from "@/lib/store/store";
import { disableDrawing } from "@/lib/store/features/canvas/CanvasSlice";

interface CanvasProps {
  image: File;
}

type XCoordinate = number;
type YCoordinate = number;

type CoordinatePoint = [XCoordinate, YCoordinate];

function Canvas({ image }: CanvasProps) {
  // @TODO: put annotations in its own slice cause it's useful when updating single annotation based on id (copy from goalsSlice)
  const [annotations, setAnnotations] = useState<AnnotationType[]>([]);
  const [drawingAnnotation, setDrawingAnnotation] =
    useState<AnnotationType | null>(null);
  const [startingPosition, setStartingPosition] = useState<CoordinatePoint>([
    0, 0,
  ]);
  const [endPosition, setEndPosition] = useState<CoordinatePoint>([0, 0]);
  const [initialClickPosition, setInitialClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const isDrawing = useAppSelector((state) => state.canvasReducer.isDrawing);
  const tool = useAppSelector((state) => state.canvasReducer.tool);
  const dispatch = useDispatch();

  function onCanvasMouseDown(evt: React.MouseEvent<HTMLDivElement>) {
    // @TODO: omogeneizza tool value accross the app
    if (isDrawing && (tool === RECTANGLE || tool === CIRCLE)) {
      const x = evt.nativeEvent.offsetX;
      const y = evt.nativeEvent.offsetY;
      const newAnnotation = {
        id: annotations.length + 1,
        shapeType: tool === RECTANGLE ? RECTANGLE : CIRCLE,
        shapeData: {
          x: x / IMG.WIDTH,
          y: y / IMG.HEIGHT,
          width: 0.2,
          height: 0.2,
        },
        // : {
        //     centerX: x / image.width,
        //     centerY: y / image.height,
        //     radius: 0,
        //   },
        label: "",
        editing: false,
        showLabelForm: false,
        isNew: true,
      };
      setInitialClickPosition({ x, y });
      setDrawingAnnotation(newAnnotation);
    }
  }

  function onCanvasMouseMove(evt: React.MouseEvent<HTMLDivElement>) {
    if (drawingAnnotation) {
      const x = evt.nativeEvent.offsetX;
      const y = evt.nativeEvent.offsetY;
      const newShapeData = { ...drawingAnnotation.shapeData };
      if (drawingAnnotation.shapeType === "rectangle") {
        newShapeData.width = (x - initialClickPosition!.x) / IMG.WIDTH;
        newShapeData.height = (y - initialClickPosition!.y) / IMG.HEIGHT;
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
      dispatch(disableDrawing());
      dispatch(showForm());
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
