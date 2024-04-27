import { AnnotationType } from "@/lib/types";
import { RECTANGLE } from "@/lib/constants";
import Form from "../form/Form";
import { useState } from "react";
import Modal from "../modal/Modal";
import styles from "./Annotation.module.css";
import { useAppSelector } from "@/lib/store/store";
import { hideForm } from "@/lib/store/features/form/FormSlice";
import { useDispatch } from "react-redux";
interface AnnotationProps {
  annotation: AnnotationType;
}

function Annotation({ annotation }: AnnotationProps) {
  const [label, setLabel] = useState("");
  const showForm = useAppSelector((state) => state.formReducer.show);
  const dispatch = useDispatch();
  console.log({ annotation });
  const { x, y, width, height } = annotation.shapeData;
  let annotationStyle;
  let annotationBaseStyle = {
    position: "absolute" as "absolute",
    border: "2px solid blue",
    backgroundColor: "blue",
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

  console.log({ annotationStyle });
  return (
    <>
      {showForm && (
        <Modal heading="Annotation" onClose={() => dispatch(hideForm())}>
          <Form onFormSubmit={onFormSubmit} />
        </Modal>
      )}
      <div className={styles.labelContainer}>
        <p className={styles.label}>{label && label}</p>
      </div>
      <div style={annotationStyle}></div>
    </>
  );
}

export default Annotation;
