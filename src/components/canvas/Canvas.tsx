import Image from "next/image";
import styles from "./Canvas.module.css";
import Annotation from "../annotation/Annotation";
import { AnnotationType } from "../../lib/types";
import { useState } from "react";
import { RECTANGLE, CIRCLE, IMG } from "@/lib/constants";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/store/store";
import { addAnnotation } from "@/lib/store/features/annotation/annotationSlice";
import { resetToolBar } from "@/lib/store/features/canvas/canvasSlice";

interface CanvasProps {
  image: File;
}

type XCoordinate = number;
type YCoordinate = number;

type CoordinatePoint = [XCoordinate, YCoordinate];

function Canvas({ image }: CanvasProps) {
  const annotations = useAppSelector(
    (state) => state.annotationReducer.annotations
  );
  const [drawingAnnotation, setDrawingAnnotation] =
    useState<AnnotationType | null>(null);
  const [initialClickPosition, setInitialClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const isDrawing = useAppSelector((state) => state.canvasReducer.isDrawing);
  const tool = useAppSelector((state) => state.canvasReducer.tool);
  const dispatch = useDispatch();

  function onCanvasMouseDown(evt: React.MouseEvent<HTMLDivElement>) {
    evt.preventDefault();
    // @TODO: omogeneizza tool value accross the app
    if (isDrawing && (tool === RECTANGLE || tool === CIRCLE)) {
      const x = evt.nativeEvent.offsetX;
      const y = evt.nativeEvent.offsetY;
      const newAnnotation: AnnotationType = {
        id: annotations.length + 1,
        shapeType: tool === RECTANGLE ? RECTANGLE : CIRCLE,
        shapeData: {
          x: (x / IMG.WIDTH) * IMG.WIDTH,
          y: (y / IMG.HEIGHT) * IMG.HEIGHT,
          width: 0,
          height: 0,
        },
        label: "",
        isEditing: false,
        showForm: false,
      };
      setInitialClickPosition({ x, y });
      setDrawingAnnotation(newAnnotation);
    }
  }

  function onCanvasMouseMove(evt: React.MouseEvent<HTMLDivElement>) {
    evt.preventDefault();

    if (drawingAnnotation) {
      const x = evt.nativeEvent.offsetX;
      const y = evt.nativeEvent.offsetY;
      const newShapeData = { ...drawingAnnotation.shapeData };
      if (drawingAnnotation.shapeType === "rectangle") {
        newShapeData.width =
          ((x - initialClickPosition!.x) / IMG.WIDTH) * IMG.WIDTH;
        newShapeData.height =
          ((y - initialClickPosition!.y) / IMG.HEIGHT) * IMG.HEIGHT;
      } else {
        // @TODO: add circle shape annotation logic
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
      drawingAnnotation.showForm = true;
      dispatch(addAnnotation(drawingAnnotation));
      setDrawingAnnotation(null);
      dispatch(resetToolBar());
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
