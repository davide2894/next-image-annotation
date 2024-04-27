import { AnnotationType } from "@/lib/types";
import { RECTANGLE } from "@/lib/constants";
interface AnnotationProps {
  annotation: AnnotationType;
}

function Annotation({ annotation }: AnnotationProps) {
  console.log({ annotation });
  const { x, y, width, height } = annotation.shapeData;
  let annotationStyle;
  let annotationBaseStyle = {
    position: "absolute" as "absolute",
    border: "2px solid blue",
    backgroundColor: "blue",
    opacity: 0.5,
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

  console.log({ annotationStyle });
  return <div style={annotationStyle}></div>;
}

export default Annotation;
