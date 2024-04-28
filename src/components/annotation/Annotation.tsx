import { AnnotationType } from "@/lib/types";
import { RECTANGLE, SELECT_TOOL } from "@/lib/constants";
import Form from "../form/Form";
import { useState } from "react";
import Modal from "../modal/Modal";
import styles from "./Annotation.module.css";
import { useAppSelector } from "@/lib/store/store";
import { useDispatch } from "react-redux";
import {
  enableEditingMode,
  hideAnnotationForm,
  showAnnotationForm,
  updateAnnotationPosition,
  updateAnnotionDimension,
  updatedAnnotationLabel,
} from "@/lib/store/features/annotation/annotationSlice";
import { Rnd } from "react-rnd";
import safeIntFromPxString from "@/lib/safeIntFromPxString";

interface AnnotationProps {
  annotation: AnnotationType;
}

function Annotation({ annotation }: AnnotationProps) {
  const [isHover, setIsHover] = useState(false);
  const { x, y, width, height } = annotation.shapeData;
  const tool = useAppSelector((state) => state.canvasReducer.tool);
  const dispatch = useDispatch();

  function onFormSubmit(updatedLabel: string) {
    dispatch(updatedAnnotationLabel({ updatedLabel, id: annotation.id }));
    dispatch(hideAnnotationForm(annotation.id));
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
        width: safeIntFromPxString(ref.style.width),
        height: safeIntFromPxString(ref.style.height),
        id: annotation.id,
      })
    );
  }

  return (
    <>
      {annotation.showForm && (
        <Modal
          heading="Annotation"
          onClose={() => dispatch(hideAnnotationForm(annotation.id))}>
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
        <div className={styles.labelContainer}>
          <p className={styles.label}>{annotation.label}</p>
          <button onClick={() => dispatch(showAnnotationForm(annotation.id))}>
            Edit label
          </button>
        </div>
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onMouseClick}
          className={`${styles.annotationContainer} ${
            isHover ? styles.annotationHover : ""
          }`}></div>
      </Rnd>
    </>
  );
}

export default Annotation;
