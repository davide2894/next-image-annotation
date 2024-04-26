import { AnnotationType } from "@/types";
import styles from "./Annotation.module.css";

interface AnnotationProps {
  annotation: AnnotationType;
}

function Annotation({ annotation }: AnnotationProps) {
  console.log({ annotationData: annotation });
  return <div className={styles.annotation}></div>;
}

export default Annotation;
