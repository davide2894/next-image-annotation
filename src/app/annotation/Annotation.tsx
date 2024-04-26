import { AnnotationType } from "@/types";

interface AnnotationProps {
  annotation: AnnotationType;
}

function Annotation({ annotation }: AnnotationProps) {
  console.log({ annotation });
  return <div>Annotation</div>;
}

export default Annotation;
