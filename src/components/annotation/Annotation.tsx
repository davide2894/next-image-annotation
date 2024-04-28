import { AnnotationType } from "@/lib/types";
import { RECTANGLE, SELECT_TOOL } from "@/lib/constants";
import Form from "../form/Form";
import { useState } from "react";
import Modal from "../modal/Modal";
import styles from "./Annotation.module.css";
import { useAppSelector } from "@/lib/store/store";
import { hideForm, showForm } from "@/lib/store/features/form/formSlice";
import { useDispatch } from "react-redux";
import { toggleEditingMode } from "@/lib/store/features/annotation/annotationSlice";
import { Rnd } from "react-rnd";

interface AnnotationProps {
  annotation: AnnotationType;
}

function Annotation({ annotation }: AnnotationProps) {
  const [label, setLabel] = useState("");
  const [isHover, setIsHover] = useState(false);
  const shouldShowForm = useAppSelector((state) => state.formReducer.show);
  const tool = useAppSelector((state) => state.canvasReducer.tool);
  const dispatch = useDispatch();
  console.log({ annotation });
  const { x, y, width, height } = annotation.shapeData;
  let annotationStyle;
  let annotationBaseStyle = {
    position: "absolute" as "absolute", //TODO: refactor cause it's ugly
    border: "2px solid blue",
    backgroundColor: `${isHover ? "yellow" : "blue"}`,
    opacity: 0.2,
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

  function onFormSubmit(submittedLabel: string) {
    setLabel(submittedLabel);
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
    dispatch(toggleEditingMode(annotation.id));
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
        style={annotationStyle}>
        <div className={styles.moveHandle}>move around</div>
        <div className={styles.resizeHandle}>resize</div>
      </div>
    </>
  );

  return (
    <>
      {shouldShowForm && (
        <Modal heading="Annotation" onClose={() => dispatch(hideForm())}>
          <Form onFormSubmit={onFormSubmit} />
        </Modal>
      )}
      {annotation.isEditing ? (
        // <Draggable handle="strong">
        //   <Resizable width={200} height={200}>
        //     <div>
        //       <strong className="cursor">
        //         <div>Drag here</div>
        //       </strong>
        //       {annotationContent()}
        //     </div>
        //   </Resizable>
        // </Draggable>
        <Rnd>
          <div>
            <strong className="cursor">
              <div>Drag here</div>
            </strong>
            {annotationContent()}
          </div>
        </Rnd>
      ) : (
        // <Resizable>
        // </Resizable>
        annotationContent()
      )}
    </>
  );
}

export default Annotation;
