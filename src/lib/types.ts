export type AnnotationType = {
  id: number;
  shapeType: string;
  label: string;
  isEditing: boolean;
  isNew: boolean;
  shapeData: {
    x: number;
    y: number;
    width: number;
    height: number;
    centerX?: number;
    centerY?: number;
    radius?: number;
  };
};

//@TODO: refactor: use this type for tool in all of the app
export type Tool = "rectangle" | "circle" | "select";

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
