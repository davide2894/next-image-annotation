import { AnnotationType } from "@/lib/types";
import { RECTANGLE, SELECT_TOOL } from "@/lib/constants";
import Form from "../form/Form";
import { useState } from "react";
import Modal from "../modal/Modal";
import styles from "./Annotation.module.css";
import { useAppSelector } from "@/lib/store/store";
import { hideForm, showForm } from "@/lib/store/features/form/formSlice";
import { useDispatch } from "react-redux";
import {
  enableEditingMode,
  updateAnnotationPosition,
  updateAnnotionDimension,
  updatedAnnotationLabel,
} from "@/lib/store/features/annotation/annotationSlice";
import { Rnd } from "react-rnd";

interface AnnotationProps {
  annotation: AnnotationType;
}

function Annotation({ annotation }: AnnotationProps) {
  const [label, setLabel] = useState("");
  const [isHover, setIsHover] = useState(false);
  const { x, y, width, height } = annotation.shapeData;
  const shouldShowForm = useAppSelector((state) => state.formReducer.show);
  const tool = useAppSelector((state) => state.canvasReducer.tool);
  const dispatch = useDispatch();
  console.log({ annotation });
  let annotationStyle;
  let annotationBaseStyle = {
    position: "absolute" as "absolute", //TODO: refactor cause it's ugly
  };

  if (annotation.shapeType === RECTANGLE) {
    annotationStyle = {
      ...annotationBaseStyle,
      top: `${(x ? x : 0) * 100}%`,
      left: `${(y ? y : 0) * 100}%`,
      width: `${(width ? Math.abs(width) : 0) * 100}%`,
      height: `${(height ? Math.abs(height) : 0) * 100}%`,
    };
  } else {
    annotationStyle = {
      // ...annotationBaseStyle,
      // left: `${((startPosition[0] + endPosition[0]) / 2) * 100}%`,
      // top: `${((startPosition[1] + endPosition[1]) / 2) * 100}%`,
      // width: `${
      //   Math.sqrt(
      //     Math.pow(endPosition[0] - startPosition[0], 2) +
      //       Math.pow(endPosition[1] - startPosition[1], 2)
      //   ) * 100
      // }%`,
      // height: `${
      //   Math.sqrt(
      //     Math.pow(endPosition[0] - startPosition[0], 2) +
      //       Math.pow(endPosition[1] - startPosition[1], 2)
      //   ) * 100
      // }%`,
      borderRadius: "50%",
      border: "2px solid red",
      transformOrigin: "center",
      transform: "translate(-50%, -50%)",
    };
  }

  function onFormSubmit(updatedLabel: string) {
    dispatch(updatedAnnotationLabel({ updatedLabel, id: annotation.id }));
    dispatch(hideForm());
  }

  function onMouseEnter() {
    if (tool === SELECT_TOOL) {
      setIsHover(true);
    }
  }

  function onMouseLeave() {
    if (tool === SELECT_TOOL) {
      setIsHover(false);
    }
  }

  function onMouseClick() {
    console.log("editing");
    dispatch(enableEditingMode(annotation.id));
  }

  const annotationContent = () => (
    <>
      <div className={styles.labelContainer}>
        <p className={styles.label}>{label && label}</p>
        <button onClick={() => dispatch(showForm())}>Edit label</button>
      </div>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onMouseClick}
        className={`${styles.annotationContainer} ${
          isHover ? styles.annotationHover : ""
        }`}></div>
    </>
  );

  function renderEditableAnnotation() {
    return (
      <>
        <div className={styles.labelContainer}>
          <p className={styles.label}>{label && label}</p>
          <button onClick={() => dispatch(showForm())}>Edit label</button>
        </div>
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onMouseClick}
          className={`${styles.annotationContainer} ${
            isHover ? styles.annotationHover : ""
          }`}></div>
      </>
    );
  }

  function onDragStop(e: any, d: any) {
    console.log({ e, d });
    dispatch(
      updateAnnotationPosition({ x: d.lastX, y: d.lastY, id: annotation.id })
    );
  }

  function onResizeStop(
    e: any,
    direction: any,
    ref: { style: { width: any; height: any } },
    delta: any,
    position: any
  ) {
    console.log({ e, direction, ref, delta, position });
    dispatch(
      updateAnnotionDimension({
        width: ref.style.width + delta.width,
        height: ref.style.height + delta.height,
        id: annotation.id,
      })
    );
  }

  return (
    <>
      {shouldShowForm && (
        <Modal heading="Annotation" onClose={() => dispatch(hideForm())}>
          <Form onFormSubmit={onFormSubmit} />
        </Modal>
      )}
      <Rnd
        enableResizing={tool === SELECT_TOOL && annotation.isEditing}
        disableDragging={tool !== SELECT_TOOL && !annotation.isEditing}
        onDragStop={onDragStop}
        onResize={onResizeStop}
        position={{
          x,
          y,
        }}
        size={{
          width,
          height,
        }}>
        {renderEditableAnnotation()}
      </Rnd>
    </>
  );
}

export default Annotation;
