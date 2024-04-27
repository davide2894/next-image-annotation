export type AnnotationType = {
  id: number;
  shapeType: string;
  label: string;
  editing: boolean;
  shapeData: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    centerX?: number;
    centerY?: number;
    radius?: number;
  };
};

//TODO: to use after refactor
export interface AnnotationBase {
  id: number;
  shapeType: string;
  label: string;
  editing: boolean;
}

export interface RectangleAnnotation extends AnnotationBase {
  shapeData: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface CircleAnnotation extends AnnotationBase {
  shapeData: {
    centerX: number;
    centerY: number;
    radius: number;
  };
}
